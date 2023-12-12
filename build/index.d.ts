import type { BuildOptions, Plugin } from 'esbuild'
export declare function server__build(config?:Partial<BuildOptions>):Promise<void>
export declare function browser__build(config?:Partial<BuildOptions>):Promise<void>
export declare function rebuildjs_plugin_():Plugin
