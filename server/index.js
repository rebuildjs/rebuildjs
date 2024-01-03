import { file_exists__waitfor } from 'ctx-core/fs'
import {
	be_lock_memosig_triple_,
	be_memo_pair_,
	be_sig_triple_,
	Cancel,
	nullish__none_,
	sleep,
	tup,
	waitfor
} from 'ctx-core/rmemo'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'path'
import { cwd_, server__relative_path_, server_path_ } from '../app/index.js'
import { app_ctx, middleware_ctx_ } from '../ctx/index.js'
export const [
	server__metafile_path$_,
	server__metafile_path_,
] = be_memo_pair_(ctx=>
	join(server_path_(ctx), 'metafile.json'),
{ ns: 'app', id: 'server__metafile_path' })
let server__metafile__waitfor_promise
export const [
	server__metafile$_,
	server__metafile_,
	server__metafile__set
] = /** @type {be_lock_memosig_triple_T<rebuildjs_metafile_T>} */
	be_lock_memosig_triple_(
		()=>undefined,
		async (ctx, server__metafile$)=>{
			server__metafile__waitfor_promise?.cancel?.()
			if (server__metafile$.lock) return
			nullish__none_([server__metafile_path_(ctx)],
				async server__metafile_path=>{
					try {
						if (await cmd(
							server__metafile__waitfor_promise =
								file_exists__waitfor(
									server__metafile_path,
									1000,
									()=>cmd(sleep(0))))
						) {
							server__metafile$._ = await cmd(
								waitfor(async ()=>{
									const buf = await cmd(readFile(server__metafile_path))
									const json = buf + ''
									try {
										return JSON.parse(json)
									} catch {
										return undefined
									}
								}, 1000))
						}
					} catch (err) {
						if (err instanceof Cancel) return
						throw err
					}
					async function cmd(promise) {
						if (cancel_()) throw new Cancel()
						const rv = await promise
						if (cancel_()) {
							promise.cancel?.()
							throw new Cancel()
						}
						return rv
					}
					function cancel_() {
						return (
							server__metafile$.lock
							|| server__metafile_path !== server__metafile_path_(ctx))
					}
				})
		}, { ns: 'app', id: 'server__metafile' })
export function server__metafile__persist() {
	return nullish__none_([
		server__metafile_path_(app_ctx),
		server__metafile_(app_ctx)
	], async (server__metafile_path, server__metafile)=>{
		await mkdir(server_path_(app_ctx), { recursive: true })
		await writeFile(
			server__metafile_path,
			JSON.stringify(server__metafile, null, '\t'))
	})
}
export const [
	server__output__relative_path_M_middleware_ctx$_,
	server__output__relative_path_M_middleware_ctx_,
] = be_memo_pair_(ctx=>
	nullish__none_([server__metafile_(ctx)],
		server__metafile=>
			new Map(
				Object.keys(server__metafile.outputs)
					.filter(server__output__relative_path=>
						server__metafile.outputs[server__output__relative_path].entryPoint)
					.map(server__output__relative_path=>{
						const middleware_ctx = middleware_ctx_()
						server__output__relative_path__set(middleware_ctx, server__output__relative_path)
						return [server__output__relative_path, middleware_ctx]
					}))),
{
	id: 'server__output__relative_path_M_middleware_ctx',
	ns: 'app'
})
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
		(server__metafile, server__output__relative_path)=>
			server__metafile.outputs[server__output__relative_path]),
{ ns: 'middleware', id: 'server__output' })
export const [
	server__cssBundle__relative_path$_,
	server__cssBundle__relative_path_
] = be_memo_pair_(ctx=>
	server__output_(ctx)?.cssBundle,
{ ns: 'middleware', id: 'server__cssBundle__relative_path', })
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
