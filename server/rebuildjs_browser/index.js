import { file_exists__waitfor } from 'ctx-core/fs'
import {
	Cancel,
	memo_,
	ns_id_be_lock_memosig_triple_,
	ns_id_be_memo_pair_,
	nullish__none_,
	promise__cancel__throw,
	sleep,
	tup
} from 'ctx-core/rmemo'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { browser__relative_path_, browser_path_, cwd_ } from '../app/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__output_ } from '../rebuildjs_server/index.js'
export const [
	browser__metafile_path$_,
	browser__metafile_path_,
] = ns_id_be_memo_pair_(
	'app',
	'browser__metafile_path',
	ctx=>
		join(browser_path_(ctx), 'metafile.json'))
export const [
	browser__metafile$_,
	browser__metafile_,
	browser__metafile__set
] = /** @type {be_lock_memosig_triple_T<rebuildjs_metafile_T>} */
	ns_id_be_lock_memosig_triple_(
		'app',
		'browser__metafile',
		()=>undefined,
		[
			(ctx, browser__metafile$)=>
				memo_(browser__metafile__waitfor_promise$=>{
					browser__metafile__waitfor_promise$.val?.cancel?.()
					if (browser__metafile$.lock) return
					nullish__none_([browser__metafile_path_(ctx)],
						browser__metafile_path=>{
							browser__metafile__waitfor_promise$.set(
								file_exists__waitfor(
									async ()=>{
										const buf = await cmd(
											readFile(browser__metafile_path))
										const json = buf + ''
										try {
											browser__metafile$.set(JSON.parse(json))
											return true
										} catch (err) {
											console.warn('browser__metafile|JSON.parse|error', { err })
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
									browser__metafile$.lock
									|| browser__metafile_path !== browser__metafile_path_(ctx)
								)
							}
						})
				})
		])
export function browser__metafile__persist() {
	return nullish__none_([
		browser__metafile_path_(app_ctx),
		browser__metafile_(app_ctx)
	], async (browser__metafile_path, browser__metafile)=>{
		await mkdir(browser_path_(app_ctx), { recursive: true })
		await writeFile(
			browser__metafile_path,
			JSON.stringify(browser__metafile, null, '\t'))
	})
}
export const [
	browser__output__relative_path$_,
	browser__output__relative_path_,
	browser__output__relative_path__set,
] = ns_id_be_lock_memosig_triple_(
	'middleware',
	'browser__output__relative_path',
	ctx=>
		nullish__none_([browser__metafile_(ctx), server__output_(ctx)],
			(browser__metafile, server__output)=>{
				const { outputs } = browser__metafile
				for (const browser__output__relative_path in outputs) {
					const browser__output = outputs[browser__output__relative_path]
					if (
						browser__output.entryPoint
					&& browser__output.entryPoint ===
					server__output.entryPoint.replace(/\.server\.(ts|js|tsx|jsx)/, '.browser.$1')
					) {
						return browser__output__relative_path
					}
				}
			}))
export const [
	browser__output$_,
	browser__output_
] = ns_id_be_memo_pair_(
	'middleware',
	'browser__output',
	ctx=>
		nullish__none_(tup(browser__metafile_(ctx), browser__output__relative_path_(ctx)),
			(browser__metafile, browser__output__relative_path)=>
				browser__metafile.outputs[browser__output__relative_path]))
export const [
	browser__cssBundle__relative_path$_,
	browser__cssBundle__relative_path_
] = ns_id_be_memo_pair_(
	'middleware',
	'browser__cssBundle__relative_path',
	ctx=>browser__output_(ctx)?.cssBundle)
export const [
	browser__cssBundle$_,
	browser__cssBundle_
] = ns_id_be_memo_pair_(
	'middleware',
	'browser__cssBundle',
	ctx=>
		nullish__none_([browser__output_(ctx)?.cssBundle],
			cssBundle=>
				join(cwd_(ctx), cssBundle)))
export const [
	browser__css$_,
	browser__css_
] = ns_id_be_memo_pair_(
	'middleware',
	'browser__css',
	ctx=>
		nullish__none_([browser__relative_path_(ctx), browser__cssBundle__relative_path_(ctx)],
			(browser__relative_path, browser__cssBundle__relative_path)=>
				join('/', relative(browser__relative_path, browser__cssBundle__relative_path))))
export const [
	browser__script$_,
	browser__script_,
] = ns_id_be_memo_pair_(
	'middleware',
	'browser__script',
	ctx=>
		nullish__none_([browser__output__relative_path_(ctx), browser__relative_path_(ctx)],
			(browser__output__relative_path, browser__relative_path)=>
				join('/', relative(browser__relative_path, browser__output__relative_path))))
