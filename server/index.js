import { file_exists_ } from '@ctx-core/fs'
import { nullish__none_, tup } from 'ctx-core/function'
import { be_lock_memosig_triple_, be_memo_pair_, be_sig_triple_ } from 'ctx-core/rmemo'
import { readFile } from 'fs/promises'
import { join, relative } from 'path'
import { cwd_, server__relative_path_, server_path_ } from '../app/index.js'
export const [
	server__metafile_path$_,
	server__metafile_path_,
] = be_memo_pair_(ctx=>
	join(server_path_(ctx), 'metafile.json'),
{ ns: 'app', id: 'server__metafile_path' })
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
}, { ns: 'app', id: 'server__metafile' })
export const [
	server__output__relative_path$_,
	server__output__relative_path_,
	server__output__relative_path__set,
] = be_sig_triple_(()=>
	undefined,
{ ns: 'middleware', id: 'server__output__relative_path' })
export const [
	server__output$_,
	server__output_
] = be_memo_pair_(ctx=>
	nullish__none_(tup(server__metafile_(ctx), server__output__relative_path_(ctx)),
		(server__metafile, output_path)=>
			server__metafile.outputs[output_path]),
{ ns: 'middleware', id: 'server__output' })
export const [
	server__cssBundle__relative_path$_,
	server__cssBundle__relative_path_
] = be_memo_pair_(ctx=>
	server__output_(ctx)?.cssBundle,
{ ns: 'middleware', id: 'server__cssBundle', })
export const [
	server__cssBundle$_,
	server__cssBundle_
] = be_memo_pair_(ctx=>
	nullish__none_([server__output_(ctx)?.cssBundle],
		cssBundle=>
			join(cwd_(ctx), cssBundle)),
{ ns: 'middleware', id: 'server__cssBundle', })
export const [
	server__css$_,
	server__css_
] = be_memo_pair_(ctx=>
	nullish__none_([server__relative_path_(ctx), server__cssBundle__relative_path_(ctx)],
		(server__relative_path, server__cssBundle__relative_path)=>
			join('/', relative(server__relative_path, server__cssBundle__relative_path))),
{ ns: 'middleware', id: 'server__css' })
