import type { be_memo_pair_T, be_sig_triple_T } from 'ctx-core/rmemo'
import type { Metafile } from 'esbuild'
export const [
	server__metafile_path$_,
	server__metafile_path_,
] = be_memo_pair_T<string>
export declare const [
	server__metafile$_,
	server__metafile_,
	server__metafile__set
]:be_sig_triple_T<Metafile|undefined>
export declare const [
	server__input_path$_,
	server__input_path_,
	server__input_path__set
]:be_sig_triple_T<string|undefined>
export declare const [
	server__output_path$_,
	server__output_path_
]:be_memo_pair_T<string|undefined>
export declare const [
	server__output$_,
	server__output_
]:be_memo_pair_T<Metafile['outputs'][string]|undefined>
export declare const [
	server__cssBundle$_,
	server__cssBundle_
]:be_memo_pair_T<string|undefined>
export declare const [
	server__css$_,
	server__css_
]:be_memo_pair_T<string|undefined>
