import type { BuildOptions, Plugin } from 'esbuild'
export declare function browser__build(config?:rebuildjs__build_config_T):Promise<void>
export declare function server__build(config?:rebuildjs__build_config_T):Promise<void>
export declare function server__external_(config?:Partial<BuildOptions>):Promise<string[]>
export declare function rebuildjs__plugin_():Plugin
export type rebuildjs__build_config_T = Partial<BuildOptions>&{ rebuildjs?: rebuildjs__plugin_config_T }
export type rebuildjs__plugin_config_T = {
	watch?:boolean
}
