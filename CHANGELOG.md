# rebuildjs

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
