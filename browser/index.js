import { nullish__none_, tup } from 'ctx-core/function'
import { be_memo_pair_, be_sig_triple_ } from 'ctx-core/rmemo'
import { app_ctx__be_config, middleware_ctx__be_config } from '../ctx/index.js'
import { server__input_path_ } from '../server/index.js'
export const [
	browser__metafile$_,
	browser__metafile_,
	browser__metafile__set
] = be_sig_triple_(()=>
	undefined,
{ ...app_ctx__be_config, id: 'browser__metafile' })
export const [
	browser__input_path$_,
	browser__input_path_
] = be_memo_pair_(ctx=>
	nullish__none_(tup(browser__metafile_(ctx), server__input_path_(ctx)),
		(browser__metafile, server__input_path)=>{
			const browser__input_path =
					server__input_path.replace(
						/\.server\.(ts|js|tsx|jsx)/,
						'.browser.$1')
			return browser__metafile.inputs[browser__input_path] && browser__input_path
		}),
{ ...middleware_ctx__be_config, id: 'browser__input_path' })
export const [
	browser__output_path$_,
	browser__output_path_
] = be_memo_pair_(ctx=>
	nullish__none_([browser__metafile_(ctx), browser__input_path_(ctx)],
		(browser__metafile, browser__input_path)=>{
			const { outputs } = browser__metafile
			for (const output_path in outputs) {
				if (outputs[output_path].entryPoint === browser__input_path) {
					return output_path
				}
			}
		}),
{ ...middleware_ctx__be_config, id: 'browser__output_path' })
export const [
	browser__script$_,
	browser__script_,
] = be_memo_pair_(ctx=>
	nullish__none_([browser__output_path_(ctx)],
		browser__output_path=>
			browser__output_path.replace('dist/dev-browser', '')),
{ ...middleware_ctx__be_config, id: 'browser__script' })
