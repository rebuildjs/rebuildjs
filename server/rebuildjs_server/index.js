import { file_exists__waitfor } from 'ctx-core/fs'
import {
	Cancel,
	memo_,
	ns_id_be_lock_memosig_triple_,
	ns_id_be_memo_pair_,
	ns_id_be_sig_triple_,
	nullish__none_,
	promise__cancel__throw,
	sleep,
	tup
} from 'ctx-core/rmemo'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { cwd_, server__relative_path_, server_path_ } from '../app/index.js'
import { app_ctx, middleware_ctx__new } from '../ctx/index.js'
export const [
	server__metafile_path$_,
	server__metafile_path_,
] = ns_id_be_memo_pair_(
	'app',
	'server__metafile_path',
	ctx=>
		join(server_path_(ctx), 'metafile.json'))
export const [
	server__metafile$_,
	server__metafile_,
	server__metafile__set
] = /** @type {be_lock_memosig_triple_T<rebuildjs_metafile_T>} */
	ns_id_be_lock_memosig_triple_(
		'app',
		'server__metafile',
		()=>undefined,
		[
			(ctx, server__metafile$)=>
				memo_(server__metafile__waitfor_promise$=>{
					server__metafile__waitfor_promise$.val?.cancel?.()
					if (server__metafile$.lock) return
					nullish__none_([server__metafile_path_(ctx)],
						server__metafile_path=>{
							server__metafile__waitfor_promise$.set(
								file_exists__waitfor(
									async ()=>{
										const buf = await cmd(
											readFile(server__metafile_path))
										const json = buf + ''
										try {
											server__metafile$.set(JSON.parse(json))
											return true
										} catch (err) {
											console.warn('server__metafile|JSON.parse|error', { err })
											return undefined
										}
									},
									5000,
									()=>cmd(sleep(0))
								).catch(err=>{
									if (err instanceof Cancel) return
									throw err
								}))
							async function cmd(promise) {
								if (cancel_()) promise__cancel__throw(promise)
								const rv = await promise
								if (cancel_()) promise__cancel__throw(promise)
								return rv
							}
							function cancel_() {
								return (
									server__metafile$.lock
									|| server__metafile_path !== server__metafile_path_(ctx))
							}
						})
				})
		])
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
] = ns_id_be_memo_pair_(
	'app',
	'server__output__relative_path_M_middleware_ctx',
	ctx=>
		nullish__none_([server__metafile_(ctx)],
			server__metafile=>
				new Map(
					Object.keys(server__metafile.outputs)
						.filter(server__output__relative_path=>
							server__metafile.outputs[server__output__relative_path].entryPoint)
						.map(server__output__relative_path=>{
							const middleware_ctx = middleware_ctx__new()
							server__output__relative_path__set(middleware_ctx, server__output__relative_path)
							return [server__output__relative_path, middleware_ctx]
						}))))
export const [
	server__output__relative_path$_,
	server__output__relative_path_,
	server__output__relative_path__set,
] = ns_id_be_sig_triple_(
	'middleware',
	'server__output__relative_path',
	()=>undefined)
export const [
	server__output$_,
	server__output_
] = ns_id_be_memo_pair_(
	'middleware',
	'server__output',
	ctx=>
		nullish__none_(tup(server__metafile_(ctx), server__output__relative_path_(ctx)),
			(server__metafile, server__output__relative_path)=>
				server__metafile.outputs[server__output__relative_path]))
export const [
	server__cssBundle__relative_path$_,
	server__cssBundle__relative_path_
] = ns_id_be_memo_pair_(
	'middleware',
	'server__cssBundle__relative_path',
	ctx=>
		server__output_(ctx)?.cssBundle)
export const [
	server__cssBundle$_,
	server__cssBundle_
] = ns_id_be_memo_pair_(
	'middleware',
	'server__cssBundle',
	ctx=>
		nullish__none_([server__output_(ctx)?.cssBundle],
			cssBundle=>
				join(cwd_(ctx), cssBundle)))
export const [
	server__css$_,
	server__css_
] = ns_id_be_memo_pair_(
	'middleware',
	'server__css',
	ctx=>
		nullish__none_([server__relative_path_(ctx), server__cssBundle__relative_path_(ctx)],
			(server__relative_path, server__cssBundle__relative_path)=>
				join('/', relative(server__relative_path, server__cssBundle__relative_path))))
