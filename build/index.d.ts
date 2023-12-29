import type { ctx__be_T, ctx__get_T, ctx__set_T, sig_T } from 'ctx-core/rmemo'
import type { BuildContext, BuildOptions, Plugin } from 'esbuild'
import type { has_app_T } from '../ctx/index.js'
export declare const build_id$_:ctx__be_T<has_app_T, sig_T<string|undefined>, 'app'>
export declare const build_id_:ctx__get_T<has_app_T, string|undefined>
export declare const build_id__set:ctx__set_T<has_app_T, string|undefined>
export declare function build_id__refresh():string
export declare function browser__build(config?:rebuildjs_build_config_T):Promise<BuildContext>
export declare function server__build(config?:rebuildjs_build_config_T):Promise<BuildContext>
export declare function server__external_(config?:Partial<BuildOptions>):Promise<string[]>
export declare function rebuildjs_plugin_():Plugin
export type rebuildjs_build_config_T =
	Partial<BuildOptions>&{ rebuildjs?:rebuildjs_plugin_config_T }
export type rebuildjs_plugin_config_T = {
	watch?:boolean
}
