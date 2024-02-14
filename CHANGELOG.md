# rebuildjs

## 0.62.0

### Minor Changes

- - rmemolike_T

  rmemo\_\_wait: argument: rmemolike_T<unknown> instead of rmemo_T<unknown>

### Patch Changes

- Updated dependencies
  - ctx-core@6.3.0

## 0.61.2

### Patch Changes

- ctx-core: ^6.2.1 -> ^6.2.2
- Updated dependencies
  - ctx-core@6.2.3

## 0.61.1

### Patch Changes

- @typescript-eslint/eslint-plugin: ^7.0.0 -> ^7.0.1
- @typescript-eslint/parser: ^7.0.0 -> ^7.0.1
- Updated dependencies
  - ctx-core@6.2.1

## 0.61.0

### Minor Changes

- timeout_promise: + handle Infinity ms argument: remove timeout from ∋ Promise.race

### Patch Changes

- persist**metafile**build_id: fix: crash due to async error:

      build_id__match__waitfor: ∋ file_exists__waitfor: Infinity ms

- Updated dependencies
  - ctx-core@6.2.0

## 0.60.6

### Patch Changes

- @typescript-eslint/parser: ^6.21.0 -> ^7.0.0
- @typescript-eslint/eslint-plugin: ^6.21.0 -> ^7.0.0

## 0.60.5

### Patch Changes

- elysia: ^0.8.16 -> ^0.8.17

## 0.60.4

### Patch Changes

- ctx-core: ^6.1.2 -> ^6.1.3

## 0.60.3

### Patch Changes

- ./server: rebuildjs*plugin*: rebuildjs*plugin\_\_postprocess$*: rebuildjs**assets**link:

      file_exists__waitfor: long timeout

## 0.60.2

### Patch Changes

- tsx: ^4.7.0 -> ^4.7.1
- Updated dependencies
  - ctx-core@6.1.2

## 0.60.1

### Patch Changes

- ctx-core: ^6.1.0 -> ^6.1.1

## 0.60.0

### Minor Changes

- wide_ctx_T<ns_union_T extends string = ''>: default ns_union_T to ''

### Patch Changes

- Updated dependencies
  - ctx-core@6.1.0

## 0.59.0

### Minor Changes

- minor:

      app_wide_ctx_T→wide_app_ctx_T
      middleware_wide_ctx_T→wide_middleware_ctx_T
      request_wide_ctx_T→wide_request_ctx_T

## 0.58.0

### Minor Changes

- minor:

      app_ctx_wide_T→app_wide_ctx_T
      middleware_ctx_wide_T→middleware_wide_ctx_T
      request_ctx_wide_T→request_wide_ctx_T

## 0.57.0

### Minor Changes

- type rename:

      Ctx→ctx_T
      Ctx_wide_T→wide_ctx_T
      Ctx_s_T→ctx_s_T
      Ctx_s_wide_T→wide_ctx_s_T

### Patch Changes

- Updated dependencies
  - ctx-core@6.0.0

## 0.56.3

### Patch Changes

- ctx-core: ^5.38.1 -> ^5.38.2

## 0.56.2

### Patch Changes

- picomatch: ^3.0.1 -> ^4.0.1

## 0.56.1

### Patch Changes

- rebuildjs_server\_\_build: fix: intermittent ENOENT:

      + mkdir(server_path_(app_ctx), { recursive: true }): immediately after rm(server_path_(app_ctx), { recursive: true, force: true })

## 0.56.0

### Minor Changes

- minor: fix: support copying .map.css for @rebuildjs/tailwindcss:

      + rebuildjs__esbuild__build_id:
      	+ rebuildjs__esbuild__build_id$_
      	+ rebuildjs__esbuild__build_id_
      	+ rebuildjs__esbuild__build_id__set
      rebuildjs_core__ready→rebuildjs__esbuild__done:
      	rebuildjs_core__ready$_→rebuildjs__esbuild__done$_
      	rebuildjs_core__ready_→rebuildjs__esbuild__done_
      rebuildjs_core__ready__wait→rebuildjs__esbuild__done__wait
      rebuildjs__ready__add__ready__a1→rebuildjs__ready__add__ready$__a1:
      	rebuildjs__ready__add__ready__a1$_→rebuildjs__ready__add__ready$__a1$_
      	rebuildjs__ready__add__ready__a1_→rebuildjs__ready__add__ready$__a1_
      	rebuildjs__ready__add__ready__a1__set→rebuildjs__ready__add__ready$__a1__set
      rebuildjs__ready__add(ready$_:rebuildjs__ready__add__ready$__T) instead of ready_:rebuildjs__ready__add__ready__T
      rebuildjs__ready__add__ready__T→rebuildjs__ready__add__ready$__T: ctx__be_T<rmemo_T<boolean>, 'app'>
      rebuildjs_plugin__build_id→rebuildjs__esbuild__build_id:
      	rebuildjs__build_id$_→rebuildjs__esbuild__build_id$_
      	rebuildjs__build_id_→rebuildjs__esbuild__build_id_
      	rebuildjs__build_id__set→rebuildjs__esbuild__build_id__set
      rebuildjs_core__ready→rebuildjs__esbuild__done:
      	rebuildjs_core__ready$_→rebuildjs__esbuild__done$_
      	rebuildjs_core__ready_→rebuildjs__esbuild__done_
      rebuildjs_core__ready__wait→rebuildjs__esbuild__done__wait
      Uc→rebuildjs__ready__add__ready__a1:
      	rebuildjs__ready__add__ready__a1$_→rebuildjs__ready__add__ready$__a1$_
      	rebuildjs__ready__add__ready__a1_→rebuildjs__ready__add__ready$__a1_
      	rebuildjs__ready__add__ready__a1__set→rebuildjs__ready__add__ready$__a1__set
      + rebuildjs__build_id:
      	+ rebuildjs__build_id$_
      	+ rebuildjs__build_id_
      	+ rebuildjs__build_id__set
      rebuildjs_plugin_: ∋ rebuildjs__esbuild__build_id__set

## 0.55.2

### Patch Changes

- elysia: ^0.8.15 -> ^0.8.16

## 0.55.1

### Patch Changes

- @typescript-eslint/parser: ^6.20.0 -> ^6.21.0
- @typescript-eslint/eslint-plugin: ^6.20.0 -> ^6.21.0
- ctx-core: ^5.38.0 -> ^5.38.1

## 0.55.0

### Minor Changes

- - calling: calls & returns argument function

### Patch Changes

- Updated dependencies
  - ctx-core@5.38.0

## 0.54.1

### Patch Changes

- rebuildjs*plugin*: rebuildjs*plugin\_\_postprocess$*: rebuildjs**assets**link:

      link asset *.map files into browser directory:
      	not *.js.map & *.mjs.map
      wait for linked files to exist on the file system

## 0.54.0

### Minor Changes

- minor: rebuildjs**ready**wait: enable rebuildjs plugins to complete by using rebuildjs**ready**add:

      + rebuildjs_core__ready:
      	+ rebuildjs_core__ready$_
      	+ rebuildjs_core__ready_
      + rebuildjs_core__ready__wait
      + rebuildjs__ready__add__ready__a1:
      	+ rebuildjs__ready__add__ready__a1$_
      	+ rebuildjs__ready__add__ready__a1_
      	+ rebuildjs__ready__add__ready__a1__set
      + rebuildjs__ready__add
      + rebuildjs__ready__add__ready__T

## 0.53.0

### Minor Changes

- minor:

      ./server:
      	+ cssBundle__annotate
      	+ server__metafile__update
      	+ browser__metafile__update
      	rebuildjs_plugin_: support plugins changing cssBundle: e.g. @rebuildjs/tailwindcss:
      		don't overwrite esbuild_cssBundle.css,esbuild_cssBundle.css.map when the files already exist

- minor:

      state is stored in globalThis.rmemo: fix: issue when multiple instances of rmemo is in the codebase: bundles
      rmemo__wait: fix: Garbage Collection prematurely collecting memo
      rmemo_f_T:
      	readonly l:number
      	readonly s:rmemo_T<unknown>[]
      	readonly t:rmemo_T<unknown>[]

### Patch Changes

- Updated dependencies
- Updated dependencies
- Updated dependencies
- Updated dependencies
  - ctx-core@5.37.0

## 0.52.9

### Patch Changes

- ctx-core: ^5.36.3 -> ^5.36.4

## 0.52.8

### Patch Changes

- ctx-core: ^5.36.2 -> ^5.36.3

## 0.52.7

### Patch Changes

- ctx-core: ^5.36.1 -> ^5.36.2

## 0.52.6

### Patch Changes

- ctx-core: ^5.36.0 -> ^5.36.1

## 0.52.5

### Patch Changes

- format + optimize imports

## 0.52.4

### Patch Changes

- ctx-core: ^5.35.2 -> ^5.36.0

## 0.52.3

### Patch Changes

- ctx-core: ^5.35.1 -> ^5.35.2

## 0.52.2

### Patch Changes

- elysia: ^0.8.14 -> ^0.8.15
- @typescript-eslint/eslint-plugin: ^6.19.1 -> ^6.20.0
- @typescript-eslint/parser: ^6.19.1 -> ^6.20.0

## 0.52.1

### Patch Changes

- ctx-core: ^5.35.0 -> ^5.35.1

## 0.52.0

### Minor Changes

- - ctx\_\_get

### Patch Changes

- Updated dependencies
- Updated dependencies
  - ctx-core@5.35.0

## 0.51.1

### Patch Changes

- ctx-core: ^5.33.0 -> ^5.34.0

## 0.51.0

### Minor Changes

- Cancel: name: 'Cancel'
- - promise\_\_cancel

### Patch Changes

- fix: intermittent unhandled ENOENT error
- Updated dependencies
- Updated dependencies
- Updated dependencies
  - ctx-core@5.33.0

## 0.50.3

### Patch Changes

- ctx-core: ^5.32.0 -> ^5.32.1

## 0.50.2

### Patch Changes

- ctx-core: ^5.31.2 -> ^5.32.0

## 0.50.1

### Patch Changes

- esbuild: ^0.19.12 -> ^0.20.0
- Updated dependencies
  - ctx-core@5.31.2

## 0.50.0

### Minor Changes

- minor:

      request_ctx__ensure: fix: fresh request_ctx for each request
      ns:'route'→'request'
      route_ctx→request_ctx
      route_ctx__new→request_ctx__new
      route_ctx__ensure→request_ctx__ensure
      has_route_T→has_request_T

## 0.49.1

### Patch Changes

- be\_: argument type: ...config→...config_arg_a
- Updated dependencies
  - ctx-core@5.31.1

## 0.49.0

### Minor Changes

- rmemo\_\_unset: delete rmemo.val

### Patch Changes

- Updated dependencies
  - ctx-core@5.31.0

## 0.48.1

### Patch Changes

- elysia: ^0.8.10 -> ^0.8.14

## 0.48.0

### Minor Changes

- - memo\_\_bind_T<A extends unknown[], R, E = unknown>

### Patch Changes

- Updated dependencies
  - ctx-core@5.30.0

## 0.47.3

### Patch Changes

- ctx-core: ^5.28.1 -> ^5.29.0

## 0.47.2

### Patch Changes

- elysia: ^0.8.9 -> ^0.8.10

## 0.47.1

### Patch Changes

- esmock: ^2.6.2 -> ^2.6.3
- Updated dependencies
  - ctx-core@5.28.1

## 0.47.0

### Minor Changes

- - run*or_val*

### Patch Changes

- Updated dependencies
  - ctx-core@5.28.0

## 0.46.6

### Patch Changes

- ctx-core: ^5.27.1 -> ^5.27.2

## 0.46.5

### Patch Changes

- esbuild: ^0.19.11 -> ^0.19.12
- Updated dependencies
  - ctx-core@5.27.1

## 0.46.4

### Patch Changes

- ctx-core: ^5.26.0 -> ^5.27.0

## 0.46.3

### Patch Changes

- ctx-core: ^5.25.5 -> ^5.26.0

## 0.46.2

### Patch Changes

- ctx-core: ^5.25.4 -> ^5.25.5

## 0.46.1

### Patch Changes

- ctx-core: ^5.25.3 -> ^5.25.4

## 0.46.0

### Minor Changes

- ./file_types→./types

## 0.45.0

### Minor Changes

- minor:

      ./server:
      	+ default_loader
      	rebuildjs_browser__build: loader: default_loader
      	rebuildjs_server__build: loader: default_loader
      + ./browser: export ./any

## 0.44.2

### Patch Changes

- ./server export: fix: export ./any

## 0.44.1

### Patch Changes

- ./file_types: declarations only: not a module

## 0.44.0

### Minor Changes

- import from 'rebuildjs': alias to import from 'rebuildjs/any'

### Patch Changes

- ./server: fix: export error

## 0.43.0

### Minor Changes

- minor:

      exports: environment specific modules:
        any
        server
        types
      browser__build→rebuild_browser__build
      server__build→rebuild_server__build

## 0.42.0

### Minor Changes

- browser\_\_build: target: es2022

## 0.41.3

### Patch Changes

- memo_T: fix: readonly a?:rmemo_a_T
- Updated dependencies
  - ctx-core@5.25.3

## 0.41.2

### Patch Changes

- val\_\_new: + rmemo argument:

      be_sig_triple_
      ns_be_sig_triple_
      id_be_sig_triple_
      ns_id_be_sig_triple_
      ns_be_memo_pair_
      id_be_memo_pair_
      ns_id_be_memo_pair_
      ns_be_memosig_triple_
      id_be_memosig_triple_
      ns_id_be_memosig_triple_
      ns_be_lock_memosig_triple_
      id_be_lock_memosig_triple_
      ns_id_be_lock_memosig_triple_

- Updated dependencies
  - ctx-core@5.25.2

## 0.41.1

### Patch Changes

- generics: ns_T extends string: remove default:

      ns_be_sig_triple_
      ns_id_be_sig_triple_
      ns_be_memo_pair_
      ns_id_be_memo_pair_
      ns_be_memosig_triple_
      ns_id_be_memosig_triple_
      ns_be_lock_memosig_triple_
      ns_id_be_lock_memosig_triple_

- Updated dependencies
  - ctx-core@5.25.1

## 0.41.0

### Minor Changes

- - be_config_arg_a_T
- minor:

      + ns_be_sig_triple_
      + id_be_sig_triple_
      + ns_id_be_sig_triple_
      + ns_be_memo_pair_
      + id_be_memo_pair_
      + ns_id_be_memo_pair_
      + ns_be_memosig_triple_
      + id_be_memosig_triple_
      + ns_id_be_memosig_triple_
      + ns_be_lock_memosig_triple_
      + id_be_lock_memosig_triple_
      + ns_id_be_lock_memosig_triple_

### Patch Changes

- Updated dependencies
- Updated dependencies
  - ctx-core@5.25.0

## 0.40.0

### Minor Changes

- minor:

      + ns_be_
      + id_be_
      + ns_id_be_
      be_: ns_T generic type specified: config:be_config_T is required
      be_memo_pair_: config?:be_config_T<ns_T> argument: fix: generic type

### Patch Changes

- Updated dependencies
  - ctx-core@5.24.0

## 0.39.0

### Minor Changes

- minor:

      generics: + E = unknown:
      	memo_
      	sig_
      	memosig_
      	lock_memosig_
      	memo__bind
      	rmemo__on
      	rmemo__off
      	rmemo__off__add
      	rmemo__add
      	rmemo_T
      	circular_rmemo_T
      	memo_T
      	circular_memo_T
      	sig_T
      	circular_sig_T
      	lock_memosig_T
      	circular_lock_memosig_T
      	memo_def_T
      	rmemo_add_def_T
      be_lock_memosig_triple_:
      be_lock_memosig_triple_T:
      	generics: E = unknown instead of _sig_T extends lock_memosig_T<val_T> = lock_memosig_T<val_T>
      be_memo_pair_:
      be_memo_pair_T:
      	generics: E = unknown instead of _memo_T extends memo_T<val_T> = memo_T<val_T>
      be_sig_triple_:
      be_sig_triple_T:
      be_memosig_triple_:
      be_memosig_triple_T:
      	generics: E = unknown instead of _sig_T extends sig_T<val_T> = sig_T<val_T>

### Patch Changes

- Updated dependencies
  - ctx-core@5.23.0

## 0.38.1

### Patch Changes

- fix: type errors:

      be_lock_memosig_triple
      be_memo_pair
      be_memosig_triple
      be_sig_triple

- Updated dependencies
  - ctx-core@5.22.1

## 0.38.0

### Minor Changes

- minor: make type generics more ergonomic:

      ctx__be_T: <be_val_T, ns_T extends string = '', ctx_T extends Ctx = Ctx_wide_T<ns_T>>
      ctx__get_T: <val_T, ns_T extends string = '', ctx_T extends Ctx = Ctx_wide_T<ns_T>>
      ctx__set_T: <val_T, ns_T extends string = '', ctx_T extends Ctx = Ctx_wide_T<ns_T>>

### Patch Changes

- Updated dependencies
  - ctx-core@5.22.0

## 0.37.13

### Patch Changes

- ctx-core: ^5.20.0 -> ^5.21.0

## 0.37.12

### Patch Changes

- ctx-core: ^5.19.2 -> ^5.20.0

## 0.37.11

### Patch Changes

- ctx-core: ^5.19.1 -> ^5.19.2

## 0.37.10

### Patch Changes

- ctx-core: ^5.19.0 -> ^5.19.1

## 0.37.9

### Patch Changes

- browser**build,server**build: fix: dist directory is external to esbuild

## 0.37.8

### Patch Changes

- ctx-core: ^5.18.9 -> ^5.19.0

## 0.37.7

### Patch Changes

- ctx-core: ^5.18.8 -> ^5.18.9

## 0.37.6

### Patch Changes

- import nodejs core modules using node: prefix
- Updated dependencies
  - ctx-core@5.18.8

## 0.37.5

### Patch Changes

- @typescript-eslint/eslint-plugin: ^6.18.1 -> ^6.19.0
- @typescript-eslint/parser: ^6.18.1 -> ^6.19.0

## 0.37.4

### Patch Changes

- ./types: fix: <reference lib="dom" />

## 0.37.3

### Patch Changes

- ctx-core: ^5.18.6 -> ^5.18.7

## 0.37.2

### Patch Changes

- ctx-core: ^5.18.5 -> ^5.18.6

## 0.37.1

### Patch Changes

- ctx-core: ^5.18.4 -> ^5.18.5

## 0.37.0

### Minor Changes

- minor:

      middleware_ctx_→middleware_ctx__new
      request_ctx_→request_ctx__new

## 0.36.3

### Patch Changes

- ctx-core: ^5.18.3 -> ^5.18.4

## 0.36.2

### Patch Changes

- ctx-core: ^5.18.1 -> ^5.18.2
- esmock: ^2.6.0 -> ^2.6.1
- Updated dependencies
  - ctx-core@5.18.3

## 0.36.1

### Patch Changes

- ctx-core: ^5.18.0 -> ^5.18.1

## 0.36.0

### Minor Changes

- minor:

      + memo__bind:
      	+ _
      	+ bind

### Patch Changes

- Updated dependencies
  - ctx-core@5.18.0

## 0.35.1

### Patch Changes

- memo\_: add: fix: error when return value is nullish
- ctx-core: ^5.17.0 -> ^5.17.1

## 0.35.0

### Minor Changes

- minor:

      memo_:
      	rename internals:
      		.r→.s
      		.memor→.t
      		.f.S→.f.t
      	+ .memo_: support limiting dependent library bundle sizes by not requiring the rmemo to be imported
      	.add: no longer wraps rmemo_add_def argument with a memo_: user can return a memo from the rmemo_add_def function
      + rmemo__off__add
      rmemo__on: arguments: + off_fn?:(rmemo:rmemo_T<val_T>)=>unknown
      rmemo__on:
      rmemo__off:
      	+ <val_T> generic type
      - rmemo__add_T
      rmemo_add_def_T: arguments: - old_val"

### Patch Changes

- Updated dependencies
  - ctx-core@5.17.0

## 0.34.6

### Patch Changes

- elysia: ^0.8.8 -> ^0.8.9

## 0.34.5

### Patch Changes

- rmemo\_\_add: fix: arguments match the .add method
- Updated dependencies
  - ctx-core@5.16.2

## 0.34.4

### Patch Changes

- fix: rollback: rebuildjs*plugin*: rebuildjs*plugin\_\_postprocess$*: memo: void

## 0.34.3

### Patch Changes

- rebuildjs*plugin*: rebuildjs*plugin\_\_postprocess$*: memo: void

## 0.34.2

### Patch Changes

- ctx-core: ^5.16.0 -> ^5.16.1

## 0.34.1

### Patch Changes

- @typescript-eslint/eslint-plugin: ^6.18.0 -> ^6.18.1
- @typescript-eslint/parser: ^6.18.0 -> ^6.18.1

## 0.34.0

### Minor Changes

- minor:

      memo_T:
      sig_T:
      	+ .add<add_val_T>(add_def:(sig:sig_T<val_T>, prev_val:add_val_T|undefined)=>add_val_T):memo_T<val_T>
      memo_:
      sig_:
      memosig_:
      lock_memosig_:
      	arguments: - ...subscriber_a
      rmemo__subscribe→rmemo__add

  patch:

      rmemo__add: fix: add_def is not called until memo argument is called

### Patch Changes

- Updated dependencies
  - ctx-core@5.16.0

## 0.33.0

### Minor Changes

- minor:

      subscribers: + strong reference to return value: prevent GC
      memo_T:
      sig_T:
      	+ b?:[unknown, memo_T<unknown>][]

### Patch Changes

- Updated dependencies
  - ctx-core@5.15.0

## 0.32.0

### Minor Changes

- ondelete*be*: .d: fix: clear ondelete callbacks when run

### Patch Changes

- Updated dependencies
  - ctx-core@5.14.0

## 0.31.1

### Patch Changes

- @typescript-eslint/parser: ^6.17.0 -> ^6.18.0

## 0.31.0

### Minor Changes

- minor:

      Cancel
      nullish
      nullish__none_
      run
      sleep
      Timeout
      tup

### Patch Changes

- Updated dependencies
  - ctx-core@5.13.0

## 0.30.1

### Patch Changes

- ctx-core: ^5.11.0 -> ^5.12.0

## 0.30.0

### Minor Changes

- minor:

      + rmemo__on: aliased by on
      + rmemo__off: aliased by off

### Patch Changes

- Updated dependencies
  - ctx-core@5.11.0

## 0.29.3

### Patch Changes

- assets\_\_assign: arguments: ...\_assets_a:Partial<assets_T>[]

## 0.29.2

### Patch Changes

- assets\_\_assign: fix: implementation

## 0.29.1

### Patch Changes

- browser\_\_output: fix: type

## 0.29.0

### Minor Changes

- minor:

      + browser__output:
      	+ browser__output$_
      	+ browser__output_
      + browser__cssBundle__relative_path:
      	+ browser__cssBundle__relative_path$_
      	+ browser__cssBundle__relative_path_
      + browser__cssBundle:
      	+ browser__cssBundle$_
      	+ browser__cssBundle_
      + browser__css:
      	+ browser__css$_
      	+ browser__css_

## 0.28.0

### Minor Changes

- minor:

      + circular_rmemo_T
      + circular_memo_T
      + circular_sig_T
      + circular_lock_memosig_T

### Patch Changes

- Updated dependencies
  - ctx-core@5.10.0

## 0.27.2

### Patch Changes

- rebuildjs build: esbuild_cssBundle: fix: cp .map file

## 0.27.1

### Patch Changes

- elysia: ^0.8.6 -> ^0.8.8
- patch:

      browser__metafile:
      server__metafile:
      	esbuild_cssBundle:
      		fix: seperate file copied from cssBundle
      	fix: implement cancel logic

## 0.27.0

### Minor Changes

- minor:

      + persist__metafile__build_id:
      	+ persist__metafile__build_id$_
      	+ persist__metafile__build_id_
      + persist__metafile__build_id__ready:
      	+ persist__metafile__build_id__ready$_
      	+ persist__metafile__build_id__ready_
      rebuildjs__ready__wait: return value: rmemo__wait_ret_T<unknown>
      - RebuildjsInterrupt: use Cancel from ctx-core/function

- - RebuildInterrupt: use Cancel from ctx-core/function instead

### Patch Changes

- be*memo_pair*:
  be*sig_triple*:

      fix: jsdoc type

- Updated dependencies
- Updated dependencies
- Updated dependencies
- Updated dependencies
- Updated dependencies
  - ctx-core@5.9.0

## 0.26.1

### Patch Changes

- RebuildjsInterrupt: fix: export type

## 0.26.0

### Minor Changes

- rmemo\_\_wait:

      always calls promise_timeout
      + .cancel(val:rmemo_val_T<_rmemo_T>)

### Patch Changes

- rebuildjs*plugin: cmd: + memo watching cancel*(): call .cancel() on promise when available
- Updated dependencies
- Updated dependencies
  - ctx-core@5.8.0

## 0.25.0

### Minor Changes

- rmemo\_\_wait: arguments: + error?:Error
- minor:

      + rebuildjs__build_id:
      	+ rebuildjs__build_id$_
      	+ rebuildjs__build_id_
      	+ rebuildjs__build_id__set
      + rebuildjs__ready:
      	+ rebuildjs__ready$_
      	+ rebuildjs__ready_
      	+ rebuildjs__ready__set
      + rebuildjs__ready__wait

### Patch Changes

- Updated dependencies
- Updated dependencies
  - ctx-core@5.7.0

## 0.24.3

### Patch Changes

- minor: + RebuildjsInterrupt

  patch: rebuildjs**assets**link$: strengthen interrupt logic

- patch:

      browser__metafile__persist:
      server__metafile__persist:
      	+ mkdir recursive: true before writeFile

## 0.24.2

### Patch Changes

- rebuildjs_plugin: assets**link$: fix: + file_exists**waitfor before link

## 0.24.1

### Patch Changes

- elysia: ^0.8.5 -> ^0.8.6
- esbuild: ^0.19.10 -> ^0.19.11
- Updated dependencies
  - ctx-core@5.6.1

## 0.24.0

### Minor Changes

- minor:

      exports: + ./metafile_l0
      app_ctx: assigned to globalThis.rebuildjs__app_ctx:
        fix: handle this module being bundled multiple times
      + rebuildjs_metafile_T
      	+ rebuildjs_target?:'browser'|'server'
      	+ build_id?:string
      	.outputs:
      		+ esbuild_cssBundle?:string
      		+ cssBundle_content?:string[]
      + browser__metafile__persist
      + build_id:
      	+ build_id$_
      	+ build_id_
      	+ build_id__set
      	+ build_id__refresh
      rebuildjs__plugin_→rebuildjs_plugin_
      rebuildjs__build_config_T→rebuildjs_plugin_config_T
      + metafile__build_id:
      	+ metafile__build_id$_
      	+ metafile__build_id_
      + server__metafile__persist
      + server__output__relative_path_M_middleware_ctx:
      	+ server__output__relative_path_M_middleware_ctx$_
      	+ server__output__relative_path_M_middleware_ctx_

- minor: rmemo: + be

  patch: be: arguments: fix: + config?:be_config_T<ns_T>

### Patch Changes

- Updated dependencies
- Updated dependencies
- Updated dependencies
  - ctx-core@5.6.0

## 0.23.0

### Minor Changes

- exports: + ./types

## 0.22.2

### Patch Changes

- elysia: ^0.8.3 -> ^0.8.5

## 0.22.1

### Patch Changes

- fix: text & comment occurrences of esmcss

## 0.22.0

### Minor Changes

- minor: extracted into cssesm package:

      esmcss supports:
      	esmcss_esbuild_plugin_
      	var__css__replace
      - esmcss_ebuild_plugin_
      - var__css__replace

## 0.21.0

### Minor Changes

- minor:

      + rmemo__subscribe
      + subscribe

### Patch Changes

- Updated dependencies
- Updated dependencies
  - ctx-core@5.5.0

## 0.20.11

### Patch Changes

- elysia: ^0.7.30 -> ^0.8.3

## 0.20.10

### Patch Changes

- rebuildjs\_\_plugin: asset lins: fix: "File or folder exists" error: rm -f before link

## 0.20.9

### Patch Changes

- import node:fs/promises instead of fs/promises

## 0.20.8

### Patch Changes

- fix: ∋ writeFile from 'node:fs/promises': instead of @ctx-core/monorepo

## 0.20.7

### Patch Changes

- fix: type errors

## 0.20.6

### Patch Changes

- route*ctx*: js implementation: ns: + ''

## 0.20.5

### Patch Changes

- patch:

      assets_T: required props: css_a,script_a
      assets__new: arguments: (..._assets_a:(Partial<assets_T>|undefined)[])

## 0.20.4

### Patch Changes

- assets\_\_new: arguments type: allow undefined

## 0.20.3

### Patch Changes

- rmemo\_\_wait: fix: prevent early GC of internal memo
- Updated dependencies
  - ctx-core@5.4.1

## 0.20.2

### Patch Changes

- server**metafile:
  browser**metafile:

      fix: race condition between the server__metafile_path,browser__metafile_path & the metafile.json being read from disk

- Updated dependencies
  - ctx-core@5.4.0

## 0.20.1

### Patch Changes

- metafile**wait:
  server**metafile:
  browser\_\_metafile:

      wait for metafile to be written to disk: ∋ subscribe_wait

## 0.20.0

### Minor Changes

- request_ctx,request_ctx_T: ns: + ''

## 0.19.8

### Patch Changes

- ctx-core: ^5.3.0 -> ^5.3.1

## 0.19.7

### Patch Changes

- ctx-core: ^5.2.3 -> ^5.3.0

## 0.19.6

### Patch Changes

- @ctx-core/fs: ^1.4.44 -> ^1.4.45

## 0.19.5

### Patch Changes

- rmemo: fix: imports
- Updated dependencies
  - ctx-core@5.2.3

## 0.19.4

### Patch Changes

- @ctx-core/fs: ^1.4.43 -> ^1.4.44

## 0.19.3

### Patch Changes

- browser build: es2021
- Updated dependencies
  - ctx-core@5.2.2

## 0.19.2

### Patch Changes

- ctx-core: ^5.2.0 -> ^5.2.1
- Updated dependencies
  - @ctx-core/fs@1.4.43

## 0.19.1

### Patch Changes

- ctx-core: ^5.1.0 -> ^5.2.0
- Updated dependencies
  - @ctx-core/fs@1.4.42

## 0.19.0

### Minor Changes

- minor:

      + ctx__clear
      + ondelete_be_
      + ondelete_be__val__new_T

## 0.18.6

### Patch Changes

- tsx: ^4.6.2 -> ^4.7.0
- @ctx-core/fs: ^1.4.39 -> ^1.4.40
- ctx-core: ^5.0.2 -> ^5.1.0
- Updated dependencies
  - @ctx-core/fs@1.4.41

## 0.18.5

### Patch Changes

- @ctx-core/fs: ^1.4.38 -> ^1.4.39

## 0.18.4

### Patch Changes

- ctx-core: ^5.0.1 -> ^5.0.2

## 0.18.3

### Patch Changes

- @ctx-core/fs: ^1.4.37 -> ^1.4.38

## 0.18.2

### Patch Changes

- ctx-core: ^5.0.0 -> ^5.0.1

## 0.18.1

### Patch Changes

- esbuild: ^0.19.9 -> ^0.19.10
- Updated dependencies
  - @ctx-core/fs@1.4.37

## 0.18.0

### Minor Changes

- minor: + Ctx ns (namespace):

      be_:
      Be:
      be_o_T:
      be_config_T
      Ctx:
      	generics: + ns_T
      	+ ns:ns_T
      	- is_source_
      be__has_:
      be_map__find:
      be__val_:
      be_lock_memosig_triple_:
      be_lock_memosig_triple_T:
      be_memo_pair_:
      be_memo_pair_T:
      be_memosig_triple_:
      be_memosig_triple_T:
      be_sig_triple_:
      be_sig_triple_T:
      	generics: + ns_T
      be: generics:
      	+ ns_T
      	+ ctx_T
      ctx__set:
      ctx__delete:
      	generics:
      		+ ns_T
      		+ ctx_T
      	arguments: + ns?:string
      ctx__new:
      ctx_:
      	returns Ctx<''>
      + BeMap
      + BeMapO
      + Ctx_wide_T
      + Ctx_s_T
      + Ctx_s_wide_T
      + ctx__be_T
      + ctx__get_T
      + ctx__set_T
      + ns_ctx__new
      rmemo: bundle size optimizations: .includes instead of .indexOf
      exports: + ./test
      + Expect
      + Equal
      TupleExclude: fix: type error
      + TupleMemberExtends
      + TupleValues
      + TupleConcat
      + TupleToUnion
      - be___T
      - be__return_T

  size-limit:

      memo_: - 4 B
      memo_ sig_: - 5 B
      memo_ sig_ be_ ctx_: - 34 B
      memo_ sig_ be_ ctx_ be_memo_pair_ be_sig_triple_: - 35 B

### Patch Changes

- Updated dependencies
  - ctx-core@5.0.0

## 0.17.0

### Minor Changes

- - assets\_

## 0.16.0

### Minor Changes

- - var**css**replace

## 0.15.1

### Patch Changes

- asset*path_a*: fix: type

## 0.15.0

### Minor Changes

- - asset*path_a*

## 0.14.0

### Minor Changes

- - metafile\_\_wait

## 0.13.2

### Patch Changes

- @ctx-core/fs: ^1.4.35 -> ^1.4.36

## 0.13.1

### Patch Changes

- ctx-core: ^4.18.0 -> ^4.19.0

## 0.13.0

### Minor Changes

- - cssjs*esbuild_plugin*

## 0.12.0

### Minor Changes

- - asset*path*

## 0.11.3

### Patch Changes

- server\_\_css: fix: path

## 0.11.2

### Patch Changes

- browser**output**relative_path: fix: lookup:

      fixes downstream browser__script

## 0.11.1

### Patch Changes

- remove unused import

## 0.11.0

### Minor Changes

- - minor:

    rebuildjs\*\*plugin\_:

    - link all non .js,.mjs,.js.map,.mjs.map server outputs to browser
    - public\*\*cp: going to rely on asset file imports using esbuild
    - server\_\_input_path:
      - server\__input_path$_
      - server\__input_path_
      - server**input_path**set

    * server**output**relative_path\_\_set

    - browser\_\_input_path:
      - browser\__input_path$_
      - browser\__input_path_

## 0.10.4

### Patch Changes

- rebuildjs\__plugin_: fix: link cssBundle map file

## 0.10.3

### Patch Changes

- browser\_\_relative_path: !is_prod: fix: path

## 0.10.2

### Patch Changes

- patch:

      fix: watch config logic:
      	browser__build
      	server__build

## 0.10.1

### Patch Changes

- rebuildjs**build_config_T: fix: &{ rebuildjs?: rebuildjs**plugin_config_T }

## 0.10.0

### Minor Changes

- minor:

      + rebuildjs__build_config_T
      + relysjs__plugin_config_T
      arguments: config: &rebuildjs__build_config_T:
      	browser__build
      	server__build
      rebuildjs_plugin_→rebuildjs__plugin_
      rebuildjs__plugin_: arguments: config.rebuildjs: watch options:
        defaults to true when is_prod
        defaults to false when not is_prod

## 0.9.2

### Patch Changes

- app\_\_relative_path: fix: value

## 0.9.1

### Patch Changes

- fix: rmemo id:

      app_path
      browser__relative_path

- add rmemos:

      + src__relative_path:
      	+ src__relative_path$_
      	+ src__relative_path_
      + app__relative_path:
      	+ app__relative_path$_
      	+ app__relative_path_

- fix: rmemo names:

      browser_relative_path→browser__relative_path
      server_relative_path→server__relative_path

## 0.9.0

### Minor Changes

- minor:

      browser__output_path→browser__output__relative_path:
      	browser__output_path$_→browser__output__relative_path$_
      	browser__output_path_→browser__output__relative_path_
      server__output_path→server__output__relative_path:
      	server__output_path$_→server__output__relative_path$_
      	server__output_path_→server__output__relative_path_

## 0.8.1

### Patch Changes

- @ctx-core/fs: ^1.4.34 -> ^1.4.35

## 0.8.0

### Minor Changes

- - server\__external_

### Patch Changes

- entryPoints: fix: always include route files:

      browser__build
      server__build

- patch:

      fix: rmemo source_ctx:
      	browser__metafile_path: app_ctx
      	server__metafile_path: app_ctx
      	server__metafile: app_ctx
      fix: rmemo id:
      	port
      	cwd
      	is_prod
      	public_path
      	dist_path
      	src_path
      	app_path
      	browser_relative_path
      	browser_path
      	server_relative_path
      	server_path
      	browser__metafile_path
      	server__metafile_path

- rmemo_T: fix: + |lock_memosig_T<val_T>
- Updated dependencies
- Updated dependencies
  - ctx-core@4.18.0

## 0.7.0

### Minor Changes

- minor:

      if metafile.json does not exist: ._ = is not called: remove setting null value:
      	browser__metafile$_
      	server__metafile$_
      + browser__metafile_path:
      	+ browser__metafile_path$_
      	+ browser__metafile_path_
      + server__metafile_path:
      	+ server__metafile_path$_
      	+ server__metafile_path_

## 0.6.0

### Minor Changes

- browser**metafile,server**metafile: initial load of metafile.json: if metafile.json does not exist: .\_ = null

## 0.5.1

### Patch Changes

- fix: dependencies: ∋ @ctx-core/fs

## 0.5.0

### Minor Changes

- browser**metafile,server**metafile: load the metafile.json on the file system as the default value
- lock*memosig*: \_=: sets .lock = 1 to prevent the memo_def from running

### Patch Changes

- browser**build,server**build: !is_prod: + console.log to indicate watch is active
- Updated dependencies
- Updated dependencies
  - ctx-core@4.17.0

## 0.4.1

### Patch Changes

- ctx-core: ^4.15.0 -> ^4.16.0

## 0.4.0

### Minor Changes

- minor:

      + browser_relative_path
      	+ browser_relative_path$_
      	+ browser_relative_path_
      + server_relative_path
      	+ server_relative_path$_
      	+ server_relative_path_

### Patch Changes

- browser\_\_script: replace logic: fix: browser_relative_path instead of hard coded dist/dev-browser

## 0.3.3

### Patch Changes

- ∋ esbuild
- fix: import app_ctx\_\_be_config

## 0.3.2

### Patch Changes

- patch:

      server__build: external: fix: always include: 'bun', 'node_modules/*'
      be_lock_memosig_triple_:
      	is_prod
      	dist_path
      	public_path
      	src_path
      	app_path
      	browser_path
      	server_path

## 0.3.1

### Patch Changes

- ctx-core: ^4.14.1 -> ^4.15.0

## 0.3.0

### Minor Changes

- cssBundle*to_browser*→rebuildjs*plugin*

## 0.2.0

### Minor Changes

- rebuild*plugin*→cssBundle*to_browser*

### Patch Changes

- browser**build,server**build: fix: invocation using a custom cwd (cwd\_\_set)

## 0.1.2

### Patch Changes

- version bump

## 0.1.1

### Patch Changes

- version bump

## 0.1.0

### Minor Changes

- minor: initial version:

      + dev environment
      + production environment
      + port:
      	+ port$_
      	+ port_
      	+ port__set
      + cwd:
      	+ cwd$_
      	+ cwd_
      	+ cwd**set
      + dist*path:
      	+ dist_path$*
      	+ dist*path*
      	+ dist_path**set
      + public*path:
      	+ public_path$*
      	+ public*path*
      	+ public*path\_\_set
      + src_path:
      	+ src_path$*
      	+ src*path*
      	+ src*path\_\_set
      + app_path:
      	+ app_path$*
      	+ app*path*
      	+ app*path\_\_set
      + browser_path:
      	+ browser_path$*
      	+ browser*path*
      	+ browser*path\_\_set
      + server_path:
      	+ server_path$*
      	+ server*path*
      	+ server*path**set
      + browser**metafile:
      	+ browser\_\_metafile$*
      	+ browser**metafile\_
      	+ browser**metafile**set
      + browser**input*path:
      	+ browser\_\_input_path$*
      	+ browser**input*path*
      + browser**output*path:
      	+ browser\_\_output_path$*
      	+ browser**output*path*
      + browser**script:
      	+ browser**script$\_
      	+ browser**script*
      + server**build
      + browser**build
      + app_ctx
      + app_ctx\_\_be_config
      + middleware_ctx*
      + middleware*ctx**be_config
      + route**ctx*
      + route*ctx\_\_be_config
      + app_ctx_T
      + middleware_MapCtx_T
      + middleware_ctx_T
      + route_MapCtx_T
      + request_ctx_T
      + middleware*
      + server**metafile:
        + server**metafile$_
      	+ server__metafile_
      	+ server__metafile__set
      + server__input_path:
      	+ server__input_path$_
      	+ server\_\_input_path_
      	+ server**input_path**set
      + server**output_path:
      	+ server**output*path$*
      	+ server**output*path*
      + server**output:
      	+ server**output$\_
      	+ server**output*
      + server**cssBundle:
      	+ server**cssBundle$*
      	+ server**cssBundle\_
      + server**css:
      	+ server**css$\_
      	+ server**css\_
