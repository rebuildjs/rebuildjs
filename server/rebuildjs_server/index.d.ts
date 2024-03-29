import type { ctx__be_T, ctx__get_T, ctx__set_T, lock_memosig_T, memo_T, sig_T } from 'ctx-core/rmemo'
import type { middleware_ctx_T } from '../ctx/index.js'
import type { rebuildjs_metafile_T } from '../metafile_l0/index.js'
export const server__metafile_path$_:ctx__be_T<memo_T<string>, 'app'>
export const server__metafile_path_:ctx__get_T<string, 'app'>
export const server__metafile$_:ctx__be_T<lock_memosig_T<rebuildjs_metafile_T|undefined>, 'app'>
export const server__metafile_:ctx__get_T<rebuildjs_metafile_T|undefined, 'app'>
export const server__metafile__set:ctx__set_T<rebuildjs_metafile_T|undefined, 'app'>
export declare function server__metafile__persist():Promise<void>
export const server__output__relative_path_M_middleware_ctx$_:ctx__be_T<memo_T<Map<string, middleware_ctx_T>>, 'app'>
export const server__output__relative_path_M_middleware_ctx_:ctx__get_T<Map<string, middleware_ctx_T>, 'app'>
export const server__output__relative_path$_:ctx__be_T<sig_T<string>, 'middleware'>
export const server__output__relative_path_:ctx__get_T<string, 'middleware'>
export const server__output__relative_path__set:ctx__set_T<string, 'middleware'>
export const server__output$_:ctx__be_T<memo_T<rebuildjs_metafile_T['outputs'][string]|undefined>, 'middleware'>
export const server__output_:ctx__get_T<rebuildjs_metafile_T['outputs'][string]|undefined, 'middleware'>
export const server__cssBundle__relative_path$_:ctx__be_T<memo_T<string|undefined>, 'middleware'>
export const server__cssBundle__relative_path_:ctx__get_T<string|undefined, 'middleware'>
export const server__cssBundle$_:ctx__be_T<memo_T<string|undefined>, 'middleware'>
export const server__cssBundle_:ctx__get_T<string|undefined, 'middleware'>
export const server__css$_:ctx__be_T<memo_T<string|undefined>, 'middleware'>
export const server__css_:ctx__get_T<string|undefined, 'middleware'>
