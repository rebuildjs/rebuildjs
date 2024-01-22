import type { ctx__be_T, ctx__get_T, ctx__set_T, lock_memosig_T, memo_T } from 'ctx-core/rmemo'
import type { rebuildjs_metafile_T } from '../metafile_l0/index.js'
export declare const browser__metafile_path$_:ctx__be_T<memo_T<string>, 'app'>
export declare const browser__metafile_path_:ctx__get_T<string, 'app'>
export declare const browser__metafile$_:ctx__be_T<lock_memosig_T<rebuildjs_metafile_T|undefined>, 'app'>
export declare const browser__metafile_:ctx__get_T<rebuildjs_metafile_T|undefined, 'app'>
export declare const browser__metafile__set:ctx__set_T<rebuildjs_metafile_T|undefined, 'app'>
export declare function browser__metafile__persist():Promise<void>
export declare const browser__output__relative_path$_:ctx__be_T<memo_T<string>, 'middleware'>
export declare const browser__output__relative_path_:ctx__get_T<string, 'middleware'>
export declare const browser__output$_:ctx__be_T<memo_T<rebuildjs_metafile_T['outputs'][string]|undefined>, 'middleware'>
export declare const browser__output_:ctx__get_T<rebuildjs_metafile_T['outputs'][string]|undefined, 'middleware'>
export declare const browser__cssBundle__relative_path$_:ctx__be_T<memo_T<string>, 'middleware'>
export declare const browser__cssBundle__relative_path_:ctx__get_T<string, 'middleware'>
export declare const browser__cssBundle$_:ctx__be_T<memo_T<string>, 'middleware'>
export declare const browser__cssBundle_:ctx__get_T<string, 'middleware'>
export declare const browser__css$_:ctx__be_T<memo_T<string>, 'middleware'>
export declare const browser__css_:ctx__get_T<string, 'middleware'>
export declare const browser__script$_:ctx__be_T<memo_T<string>, 'middleware'>
export declare const browser__script_:ctx__get_T<string, 'middleware'>
