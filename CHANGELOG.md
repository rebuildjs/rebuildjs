# rebuildjs

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
      + route_ctx_T
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
