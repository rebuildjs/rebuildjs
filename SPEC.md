# rebuildjs Server Adapter Specification

## 1. Overview

rebuildjs is the core build orchestration layer. relysjs (Elysia) and rhonojs (Hono) are framework adapters that share near-identical server logic but differ in framework types and a few integration points.

This spec defines the interface contract for extracting shared server logic into rebuildjs, making relysjs and rhonojs thin wrappers.

### Package Roles

| Package | Role | Framework Dep | Current Version |
|---------|------|---------------|-----------------|
| rebuildjs | Core build + framework-agnostic server logic | none (remove elysia) | 0.70.47 |
| relysjs | Elysia adapter — thin wrapper | elysia | 1.21.75 |
| rhonojs | Hono adapter — thin wrapper | hono | 0.1.1 |

**Problem:** rebuildjs currently has `elysia` as a direct dependency (in `package.json`). This is wrong — rebuildjs should be framework-agnostic.

## 2. Subpath Export Structure

### Current rebuildjs exports

```
rebuildjs            — root
rebuildjs/browser    — browser runtime
rebuildjs/types      — shared types
rebuildjs/server     — server: ctx, build, metafile, asset, middleware
```

### New rebuildjs exports (after refactor)

```
rebuildjs/server              — existing core (ctx, build, metafile, asset, middleware)
rebuildjs/server/app          — framework-agnostic app lifecycle (parameterized)
rebuildjs/server/route        — html_route_, request_ctx__ensure, html_response__new
rebuildjs/server/compression  — shared type (compression_middleware_config_T)
rebuildjs/server/static       — static_middleware_ (parameterized)
rebuildjs/server/export       — static_export_, static_export__file_path_
rebuildjs/server/export/cloudflare — cloudflare_export_, worker_entry__generate_, wrangler_toml__generate_
```

### Adapter re-exports (relysjs, rhonojs stay unchanged to consumers)

```
relysjs/server                   — re-exports rebuildjs/server + adapter-bound functions
relysjs/server/export            — re-exports rebuildjs/server/export (with adapter bound)
relysjs/server/export/cloudflare — re-exports rebuildjs/server/export/cloudflare
```

## 3. Adapter Interface Contract

### 3.1 Framework Adapter Type

Each adapter provides a descriptor that parameterizes the shared logic:

```typescript
type framework_adapter_T<App> = {
  /** Create a new empty app instance */
  app__new: () => App

  /** Property name used to tag an attached app (e.g., '_relysjs', '_rhonojs') */
  app__tag: string

  /** Apply a middleware or sub-app to the parent app */
  app__use: (app: App, middleware: unknown) => void

  /** Start the app listening on a port */
  app__listen: (app: App, port: number) => void

  /** Stop a running app (for static export cleanup) */
  app__stop: (app: App) => Promise<void> | void

  /** Read request_ctx from the framework's per-request context object */
  request_ctx__get: (framework_context: unknown) => request_ctx_T | undefined

  /** Store request_ctx on the framework's per-request context object */
  request_ctx__set: (framework_context: unknown, request_ctx: request_ctx_T) => void

  /** Set the framework context signal on a request_ctx */
  framework_context__set: (request_ctx: request_ctx_T, framework_context: unknown) => void

  /** Cancel variable name for reactive cancellation (e.g., 'relysjs_cancel$') */
  cancel_ref_name: string

  /** Build plugin name (e.g., 'relysjs_plugin', 'rhonojs_plugin') */
  plugin_name: string

  /** ns_id for the link reactive (e.g., 'relysjs__link$', 'rhonojs__link$') */
  link_ns_id: string
}
```

### 3.2 Elysia Adapter

```typescript
const elysia_adapter: framework_adapter_T<Elysia> = {
  app__new: () => new Elysia(),
  app__tag: '_relysjs',
  app__use: (app, middleware) => app.use(middleware),
  app__listen: (app, port) => app.listen(port),
  app__stop: (app) => app.server ? app.stop() : Promise.resolve(),

  // Elysia stores request_ctx directly on the context object
  request_ctx__get: (context) => context.request_ctx,
  request_ctx__set: (context, ctx) => { context.request_ctx = ctx },
  framework_context__set: (request_ctx, context) => elysia_context__set(request_ctx, context),

  cancel_ref_name: 'relysjs_cancel$',
  plugin_name: 'relysjs_plugin',
  link_ns_id: 'relysjs__link$',
}
```

### 3.3 Hono Adapter

```typescript
const hono_adapter: framework_adapter_T<Hono> = {
  app__new: () => new Hono(),
  app__tag: '_rhonojs',
  app__use: (app, middleware) => {
    // Hono sub-apps mount via route(), plain middleware via use()
    if (middleware instanceof Hono) {
      app.route('/', middleware)
    } else {
      app.use(middleware)
    }
  },
  app__listen: (app, port) => Bun.serve({ port, fetch: app.fetch }),
  app__stop: () => { /* Bun.serve cleanup handled by process exit */ },

  // Hono uses c.get/c.set for per-request storage
  request_ctx__get: (c) => c.get('request_ctx'),
  request_ctx__set: (c, ctx) => c.set('request_ctx', ctx),
  framework_context__set: (request_ctx, c) => hono_context__set(request_ctx, c),

  cancel_ref_name: 'rhonojs_cancel$',
  plugin_name: 'rhonojs_plugin',
  link_ns_id: 'rhonojs__link$',
}
```

## 4. Shared Functions — Detailed Analysis

### 4.1 Functions That Are 100% Identical (move directly)

These have zero framework dependency. Copy verbatim into rebuildjs.

#### `html_response__new(html_OR_stream, response_init?): Response`

Creates a `Response` with `Content-Type: text/html;charset=UTF-8`. Handles both string and ReadableStream inputs.

```typescript
function html_response__new(
  html_OR_stream: string | ReadableStream,
  response_init?: ResponseInit
): Response
```

**Note:** relysjs imports `TextEncoderStream` from `ctx-core/stream` (Bun polyfill). rhonojs uses the global. The rebuildjs version should use the global `TextEncoderStream`.

#### `static_export__file_path_(route, out_dir, content_type?): string`

Maps a route path to an output file path. Pure function, no framework dependency.

#### `cloudflare_export_(config): Promise<cloudflare_export_result_T>`

Runs `static_export_`, generates worker entry, bundles with esbuild, writes `wrangler.toml`. **Byte-for-byte identical** in both adapters.

#### `worker_entry__generate_(dynamic_routes): string`

Generates a Cloudflare Worker entry source file. Pure string generation.

#### `wrangler_toml__generate_(overrides, out_dir?): string`

Generates `wrangler.toml` content. Pure string generation.

#### App signals (6 signal definitions)

These signal definitions in `server/app/` are structurally identical:

```typescript
const [app$_, app_, app__set] = ns_id_be_sig_triple_('app', 'app', () => undefined)
const [server_entry__relative_path$_, server_entry__relative_path_] = ns_id_be_memo_pair_(...)
const [server_entry__output__relative_path$_, server_entry__output__relative_path_] = ns_id_be_memo_pair_(...)
const [server_entry__output__path$_, server_entry__output__path_] = ns_id_be_memo_pair_(...)
const [server_entry__output__link__path$_, server_entry__output__link__path_] = ns_id_be_memo_pair_(...)
```

The only type difference is `Elysia | undefined` vs `Hono | undefined` in `app$_`. This is erased at runtime (JavaScript). Move to rebuildjs with a generic `App` type.

### 4.2 Functions That Differ Only in Framework Constructor (parameterize)

#### `app__attach(app?: App): Promise<App>`

**Differences:**

| Line | Elysia | Hono |
|------|--------|------|
| Default app | `new Elysia()` | `new Hono()` |
| Tag | `app._relysjs = 1` | `app._rhonojs = 1` |
| Apply middleware | `app.use(middleware)` | `middleware instanceof Hono ? app.route('/') : app.use()` |
| Cancel ref | `relysjs_cancel$` | `rhonojs_cancel$` |

All other logic (metafile waiting, file existence checks, promise cancellation, middleware_ctx iteration) is identical. Parameterize via `adapter.app__new`, `adapter.app__tag`, `adapter.app__use`.

#### `app__start(app?: App): Promise<App>`

**Differences:**

| Aspect | Elysia | Hono |
|--------|--------|------|
| Tag check | `app._relysjs` | `app._rhonojs` |
| Listen | `app.listen(port)` | `Bun.serve({ port, fetch: app.fetch })` |

Parameterize via `adapter.app__tag`, `adapter.app__listen`.

#### `static_middleware_(config?): Promise<App>`

**Differences:**

| Aspect | Elysia | Hono |
|--------|--------|------|
| Create app | `new Elysia()` | `new Hono()` |
| Handler sig | `app.get(path, () => Response)` | `app.get(path, c => Response)` |

The handler callback ignores the framework context (`c` is unused in Hono). The file scanning, content-type resolution, and Response construction are identical. Parameterize via `adapter.app__new`.

#### `static_export_(config): Promise<static_export_result_T>`

**Differences:**

| Aspect | Elysia | Hono |
|--------|--------|------|
| Cleanup in finally | `app.stop()` | no-op |
| Unused var | none | `let server` (dead code) |

All route discovery, fetching, file writing, manifest management is identical. Parameterize via `adapter.app__stop`.

#### `html_route_(middleware_ctx, page_, response_init?): handler`

**Differences:**

| Aspect | Elysia | Hono |
|--------|--------|------|
| Handler param type | `{ request, store }` | `Context` |
| Return type | `(context) => Promise<Response>` | `(c) => Response` |

Core logic is identical: `request_ctx__ensure` then `html_response__new(page_({ ctx }))`. Parameterize by passing the adapter's `request_ctx__ensure`.

#### `request_ctx__ensure(middleware_ctx, framework_context): request_ctx_T`

**Differences:**

| Aspect | Elysia | Hono |
|--------|--------|------|
| Get existing ctx | `context.request_ctx` | `c.get('request_ctx')` |
| Store new ctx | `context.request_ctx = ctx` | `c.set('request_ctx', ctx)` |
| Set framework signal | `elysia_context__set(...)` | `hono_context__set(...)` |

Parameterize via `adapter.request_ctx__get`, `adapter.request_ctx__set`, `adapter.framework_context__set`.

### 4.3 Functions That Differ Substantially (stay in adapter)

#### `compression_middleware_(config?)`

- **Elysia:** 90-line custom implementation. `Elysia.onAfterHandle` hook, `bun:zlib` sync APIs, `compressible` package, custom `CompressionStream` polyfill, `toBuffer` helper. Returns an `Elysia` plugin instance. Config includes `zlib_compression_options` and `encoding`.
- **Hono:** 4 lines. Delegates to `hono/compress`. Returns a `MiddlewareHandler`.

These share only the config type name. The shared type in rebuildjs should be the minimal intersection:

```typescript
// rebuildjs/server/compression
export type compression_middleware_config_T = {
  type?: 'gzip' | 'deflate'
}
```

Elysia extends this locally with `zlib_compression_options` and `encoding`.

#### Build plugin hot-reload logic (`relysjs_plugin_` / `rhonojs_plugin_`)

The `onEnd` handler and file-linking logic is structurally similar but the hot-reload approach differs significantly:

- **Elysia:** Stall-proxy pattern. Creates a temporary `Elysia` that holds requests while the new app loads, then switches over. Stops the old server explicitly.
- **Hono:** Direct replace. `Bun.serve` replaces the previous server automatically. No stall proxy needed.

The surrounding file-link logic and ready-state management follow the same pattern and could be extracted into a factory, but the hot-reload core should stay adapter-specific.

### 4.4 Framework-Specific Modules (stay in adapter entirely)

#### Elysia context signals (`relysjs/server/elysiajs`)

```typescript
elysia_context$_, elysia_context_, elysia_context__set  // sig_T<elysia_context_T>
request$_, request_                                      // derived from elysia_context_.request
request_url$_, request_url_                              // derived from request_
store$_, store_                                          // derived from elysia_context_.store

type elysia_context_T = {
  request: Request
  request_ctx?: request_ctx_T
  store: { [x: string]: unknown }
}
```

#### Hono context signals (`rhonojs/server/hono`)

```typescript
hono_context$_, hono_context_, hono_context__set  // sig_T<Context | undefined>
request$_, request_                                // derived from hono_context_.req.raw
request_url$_, request_url_                        // derived from request_
// No store equivalent
```

## 5. Build Pipeline — Adapter Portion

### Adapter build signals (identical pattern, different names)

| relysjs | rhonojs | Pattern |
|---------|---------|---------|
| `relysjs__build_id$_` | `rhonojs__build_id$_` | `sig_T<string>` on 'app' ns |
| `relysjs__ready$_` | `rhonojs__ready$_` | `memo: build_id && rebuildjs__ready && build_id === adapter__build_id` |
| `relysjs__ready__wait` | `rhonojs__ready__wait` | `rmemo__wait(ready$_, ready => ready, timeout)` |

### Adapter build functions (identical pattern)

```typescript
// relysjs                          // rhonojs
relysjs_browser__build(config?)     rhonojs_browser__build(config?)
relysjs_server__build(config?)      rhonojs_server__build(config?)
relysjs_plugin_(config?)            rhonojs_plugin_(config?)
```

`_browser__build` strips the adapter config key and delegates to `rebuildjs_browser__build`.
`_server__build` strips the adapter config key, adds the adapter plugin + server entry point, delegates to `rebuildjs_server__build`.

These could be generated by a factory function in rebuildjs:

```typescript
// rebuildjs/server/build (new)
function adapter_build_fns_<PluginConfig>(
  adapter_name: string,
  plugin_config_key: string
): {
  browser__build: (config?) => Promise<BuildContext>
  server__build: (config?) => Promise<BuildContext>
}
```

## 6. Shared Types (move to rebuildjs)

```typescript
// rebuildjs/server/compression
export type compression_middleware_config_T = {
  type?: 'gzip' | 'deflate'
}

// rebuildjs/server/static
export type static_middleware__config_T = {
  headers_?: (url_path: string, content_type: string, path: string) => Record<string, string>
}

// rebuildjs/server/export
export type static_export_config_T<App = unknown> = {
  routes?: string[]
  site_url: string
  out_dir?: string
  base_url?: string
  server_import?: string
  app?: App
  sitemap?: boolean
  extra_routes?: string[]
  url_rewrite?: boolean
  incremental?: boolean
  manifest?: boolean
  clean?: boolean
  on_export?: (route: string, file: string) => void
}

export type static_export_result_T = {
  exported: string[]
  errors: string[]
}

// rebuildjs/server/export/cloudflare
export type cloudflare_export_config_T<App = unknown> =
  & static_export_config_T<App>
  & {
    dynamic_routes?: route_handler_T[]
    worker_out?: string
    wrangler?: Partial<wrangler_config_T>
  }

export type cloudflare_export_result_T =
  & static_export_result_T
  & {
    worker_entry_path?: string
    wrangler_path: string
  }

export type route_handler_T = {
  pattern: string
  handler: string
}

export type wrangler_config_T = {
  name: string
  compatibility_date: string
  vars?: Record<string, string>
  routes?: { pattern: string; zone_name?: string }[]
}
```

## 7. Context Hierarchy

```
app_ctx: ctx_T<'app'>                    — singleton, global app state
  +-- middleware_ctx: ctx_T<'middleware' | 'app'>  — per server entry point
        +-- request_ctx: ctx_T<'' | 'request' | 'middleware' | 'app'>  — per HTTP request
```

- `app_ctx` holds: port, cwd, is_prod, paths, metafiles, build state
- `middleware_ctx` holds: server output path, browser assets, CSS bundles
- `request_ctx` holds: aggregated assets, framework context signal

Each level inherits signals from its parent.

## 8. Migration Guide

### Phase 1: Move pure functions (no breaking changes)

Move these directly into rebuildjs — they have zero framework dependency:

1. `html_response__new` -> `rebuildjs/server/route`
2. `static_export__file_path_` -> `rebuildjs/server/export`
3. `cloudflare_export_` -> `rebuildjs/server/export/cloudflare`
4. `worker_entry__generate_` -> `rebuildjs/server/export/cloudflare`
5. `wrangler_toml__generate_` -> `rebuildjs/server/export/cloudflare`
6. All shared types from Section 6

### Phase 2: Extract parameterized functions

Create adapter-parameterized versions in rebuildjs. Each takes `adapter: framework_adapter_T<App>` as first argument:

1. `app__attach(adapter, app?)` -> `rebuildjs/server/app`
2. `app__start(adapter, app?)` -> `rebuildjs/server/app`
3. `static_middleware_(adapter, config?)` -> `rebuildjs/server/static`
4. `static_export_(adapter, config)` -> `rebuildjs/server/export`
5. `html_route_(adapter, middleware_ctx, page_, response_init?)` -> `rebuildjs/server/route`
6. `request_ctx__ensure(adapter, middleware_ctx, context)` -> `rebuildjs/server/route`
7. App signal definitions (generic `App` type) -> `rebuildjs/server/app`

### Phase 3: Build pipeline factories

Create factories for the adapter build pattern:

1. `adapter_build_id_triple_` — generates `{name}__build_id$_`, `{name}__build_id_`, `{name}__build_id__set`
2. `adapter_ready_pair_` — generates `{name}__ready$_`, `{name}__ready_`
3. `adapter_ready__wait_` — generates `{name}__ready__wait`
4. `adapter_browser__build_` — generates `{name}_browser__build`
5. `adapter_server__build_` — generates `{name}_server__build`

### Phase 4: Update adapter packages

relysjs becomes a thin wrapper:

```typescript
// relysjs/server/app/index.js
import { app__attach as _app__attach, app__start as _app__start } from 'rebuildjs/server/app'
import { elysia_adapter } from './adapter.js'

export const app__attach = (app?) => _app__attach(elysia_adapter, app)
export const app__start = (app?) => _app__start(elysia_adapter, app)
// Signal re-exports stay the same (moved to rebuildjs, re-exported here)
export { app$_, app_, app__set } from 'rebuildjs/server/app'
```

Consumer code (`import { app__start } from 'relysjs/server'`) continues to work unchanged.

### Phase 5: Remove elysia from rebuildjs deps

Remove `elysia` from `rebuildjs/package.json` `dependencies`. The Elysia dependency belongs only in relysjs.

## 9. Naming Conventions

Per ctx-core NAMING.md:

| Suffix/Prefix | Meaning | Example |
|---------------|---------|---------|
| `_` suffix | factory/getter function | `app_`, `html_route_` |
| `$_` suffix | reactive signal factory | `app$_`, `build_id$_` |
| `__` separator | namespace/dimension | `app__attach`, `request_ctx__ensure` |
| `_T` suffix | type | `request_ctx_T`, `framework_adapter_T` |
| `__set` suffix | setter | `app__set`, `port__set` |
| `__new` suffix | constructor | `request_ctx__new` |
| `_a1` suffix | array | `middleware_a1` |
| `_M_` infix | Map keyed by right side | `server__output__relative_path_M_middleware_ctx_` |
