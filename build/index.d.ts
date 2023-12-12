import type { BuildOptions, Plugin } from 'esbuild'
export declare function server__build(config?:Partial<BuildOptions>):Promise<void>
export declare function browser__build(config?:Partial<BuildOptions>):Promise<void>
export declare function cssBundle_to_browser_():Plugin
