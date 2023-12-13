import { file_exists_ } from '@ctx-core/fs'
import { nullish__none_, tup } from 'ctx-core/function'
import { be_lock_memosig_triple_, be_memo_pair_, be_sig_triple_ } from 'ctx-core/rmemo'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { cwd_, server_path_ } from '../app/index.js'
import { middleware_ctx__be_config } from '../ctx/index.js'
export const [
	server__metafile_path$_,
	server__metafile_path_,
] = be_memo_pair_(ctx=>
	server_path_(ctx), 'metafile.json')
export const [
	server__metafile$_,
	server__metafile_,
	server__metafile__set
] = be_lock_memosig_triple_(()=>
	undefined,
async (ctx, server__metafile$)=>{
	let metafile_path
	if (
		!server__metafile$.lock
		&& await file_exists_(metafile_path = server__metafile_path_(ctx))
	) {
		server__metafile$._ = JSON.parse(await readFile(metafile_path).then(buf=>buf.toString()))
	}
},
{ ...middleware_ctx__be_config, id: 'server__metafile' })
export const [
	server__input_path$_,
	server__input_path_,
	server__input_path__set
] = be_sig_triple_(()=>
	undefined,
{ ...middleware_ctx__be_config, id: 'server__input_path' })
export const [
	server__output_path$_,
	server__output_path_
] = be_memo_pair_(ctx=>
	nullish__none_(tup(server__metafile_(ctx), server__input_path_(ctx)),
		(server__metafile, input_path)=>{
			const { outputs } = server__metafile
			for (const output_path in outputs) {
				const output = outputs[output_path]
				if (output.entryPoint === input_path) return output_path
			}
		}),
{ ...middleware_ctx__be_config, id: 'server__output_path' })
export const [
	server__output$_,
	server__output_
] = be_memo_pair_(ctx=>
	nullish__none_(tup(server__metafile_(ctx), server__output_path_(ctx)),
		(server__metafile, output_path)=>
			server__metafile.outputs[output_path]),
{ ...middleware_ctx__be_config, id: 'server__output' })
export const [
	server__cssBundle$_,
	server__cssBundle_
] = be_memo_pair_(ctx=>
	nullish__none_([server__output_(ctx)?.cssBundle],
		cssBundle=>
			join(cwd_(ctx), cssBundle)),
{ ...middleware_ctx__be_config, id: 'server__cssBundle', })
export const [
	server__css$_,
	server__css_
] = be_memo_pair_(ctx=>
	nullish__none_([server__cssBundle_(ctx)],
		cssBundle=>
			cssBundle.replace(server_path_(ctx), '')),
{ ...middleware_ctx__be_config, id: 'server__css' })
