import type { ctx__be_T, ctx__get_T, memo_T } from 'ctx-core/rmemo'
import type { has_app_T } from '../ctx/index.js'
export * from '../metafile_l0/index.js'
export declare const metafile__build_id$_:ctx__be_T<has_app_T, memo_T<string>, 'app'>
export declare const metafile__build_id_:ctx__get_T<has_app_T, string>
export declare function metafile__wait(timeout?:number):Promise<void>
