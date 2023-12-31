import type { ctx__be_T, ctx__get_T, ctx__set_T, rmemo__wait_ret_T, sig_T } from 'ctx-core/rmemo'
import type { BuildContext, BuildOptions, Plugin } from 'esbuild'
import type { has_app_T } from '../ctx/index.js'
export declare const build_id$_:ctx__be_T<has_app_T, sig_T<string|undefined>, 'app'>
export declare const build_id_:ctx__get_T<has_app_T, string|undefined>
export declare const build_id__set:ctx__set_T<has_app_T, string|undefined>
export declare const persist__metafile__build_id$_:ctx__be_T<has_app_T, sig_T<string|undefined>, 'app'>
export declare const persist__metafile__build_id_:ctx__get_T<has_app_T, string|undefined>
export declare const persist__metafile__ready$_:ctx__be_T<has_app_T, sig_T<boolean>, 'app'>
export declare const persist__metafile__ready_:ctx__get_T<has_app_T, boolean>
export declare function build_id__refresh():string
export declare const rebuildjs__build_id$_:ctx__be_T<has_app_T, sig_T<string>, 'app'>
export declare const rebuildjs__build_id_:ctx__get_T<has_app_T, string>
export declare const rebuildjs__build_id__set:ctx__set_T<has_app_T, string>
export declare const rebuildjs__ready$_:ctx__be_T<has_app_T, sig_T<boolean>, 'app'>
export declare const rebuildjs__ready_:ctx__get_T<has_app_T, boolean>
export declare function rebuildjs__ready__wait(timeout?:number):rmemo__wait_ret_T<unknown>
export declare function browser__build(config?:rebuildjs_build_config_T):Promise<BuildContext>
export declare function server__build(config?:rebuildjs_build_config_T):Promise<BuildContext>
export declare function server__external_(config?:Partial<BuildOptions>):Promise<string[]>
export declare function rebuildjs_plugin_():Plugin
export type rebuildjs_build_config_T =
	Partial<BuildOptions>&{ rebuildjs?:rebuildjs_plugin_config_T }
export type rebuildjs_plugin_config_T = {
	watch?:boolean
}
