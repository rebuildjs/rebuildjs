import { file_exists__waitfor } from 'ctx-core/fs'
import {
	be_lock_memosig_triple_,
	be_memo_pair_,
	Cancel,
	memo_,
	nullish__none_,
	sleep,
	tup,
	waitfor
} from 'ctx-core/rmemo'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { browser__relative_path_, browser_path_, cwd_ } from '../app/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__output_ } from '../rebuildjs_server/index.js'
export const [
	browser__metafile_path$_,
	browser__metafile_path_,
] = be_memo_pair_(ctx=>
	join(browser_path_(ctx), 'metafile.json'),
{ ns: 'app', id: 'browser__metafile_path' })
export const [
	browser__metafile$_,
	browser__metafile_,
	browser__metafile__set
] = /** @type {be_lock_memosig_triple_T<rebuildjs_metafile_T>} */
	be_lock_memosig_triple_(
		()=>undefined,
		{ ns: 'app', id: 'browser__metafile' }
	).add((ctx, browser__metafile$)=>
		memo_(browser__metafile__waitfor_promise$=>{
			browser__metafile__waitfor_promise$.val?.cancel?.()
			if (browser__metafile$.lock) return
			return nullish__none_([browser__metafile_path_(ctx)],
				browser__metafile_path=>{
					const browser__metafile__waitfor_promise =
						file_exists__waitfor(
							browser__metafile_path,
							1000,
							()=>cmd(sleep(0)))
					cmd(browser__metafile__waitfor_promise)
						.then(async success=>{
							if (success) {
								browser__metafile$._ = await cmd(
									waitfor(async ()=>{
										const buf = await cmd(readFile(browser__metafile_path))
										const json = buf + ''
										try {
											return JSON.parse(json)
										} catch {
											return undefined
										}
									}, 1000))
							}
						}).catch(err=>{
							if (err instanceof Cancel) return
							throw err
						})
					return browser__metafile__waitfor_promise
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
							browser__metafile$.lock
							|| browser__metafile_path !== browser__metafile_path_(ctx)
						)
					}
				})
		})
	)
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
	browser__output__relative_path_
] = be_memo_pair_(ctx=>
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
		}), { ns: 'middleware', id: 'browser__output__relative_path' })
export const [
	browser__output$_,
	browser__output_
] = be_memo_pair_(ctx=>
	nullish__none_(tup(browser__metafile_(ctx), browser__output__relative_path_(ctx)),
		(browser__metafile, browser__output__relative_path)=>
			browser__metafile.outputs[browser__output__relative_path]),
{ ns: 'middleware', id: 'browser__output' })
export const [
	browser__cssBundle__relative_path$_,
	browser__cssBundle__relative_path_
] = be_memo_pair_(ctx=>
	browser__output_(ctx)?.cssBundle,
{ ns: 'middleware', id: 'browser__cssBundle__relative_path', })
export const [
	browser__cssBundle$_,
	browser__cssBundle_
] = be_memo_pair_(ctx=>
	nullish__none_([browser__output_(ctx)?.cssBundle],
		cssBundle=>
			join(cwd_(ctx), cssBundle)),
{ ns: 'middleware', id: 'browser__cssBundle', })
export const [
	browser__css$_,
	browser__css_
] = be_memo_pair_(ctx=>
	nullish__none_([browser__relative_path_(ctx), browser__cssBundle__relative_path_(ctx)],
		(browser__relative_path, browser__cssBundle__relative_path)=>
			join('/', relative(browser__relative_path, browser__cssBundle__relative_path))),
{ ns: 'middleware', id: 'browser__css' })
export const [
	browser__script$_,
	browser__script_,
] = be_memo_pair_(ctx=>
	nullish__none_([browser__output__relative_path_(ctx), browser__relative_path_(ctx)],
		(browser__output__relative_path, browser__relative_path)=>
			join('/', relative(browser__relative_path, browser__output__relative_path))),
{ ns: 'middleware', id: 'browser__script' })
