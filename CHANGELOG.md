# rebuildjs

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

- route_ctx,route_ctx_T: ns: + ''

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
