/// <reference types="../metafile_l0/index.d.ts" />
/// <reference types="./index.d.ts" />
import { file_exists_, file_exists__waitfor } from 'ctx-core/fs'
import {
	be,
	be_memo_pair_,
	be_sig_triple_,
	Cancel,
	cancel__period_,
	memo_,
	nullish__none_,
	off,
	promise__cancel,
	promise__cancel__throw,
	rmemo__wait,
	run
} from 'ctx-core/rmemo'
import { short_uuid_ } from 'ctx-core/uuid'
import { context } from 'esbuild'
import { fdir } from 'fdir'
import { cp, link, mkdir, readFile, rm } from 'node:fs/promises'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import {
	app_path_,
	browser_path_,
	cwd_,
	dist_path_,
	is_prod_,
	server__relative_path_,
	server_path_
} from '../app/index.js'
import { app_ctx } from '../ctx/index.js'
import { metafile__build_id_ } from '../metafile/index.js'
import {
	browser__metafile_,
	browser__metafile__persist,
	browser__metafile__set,
	browser__metafile_path_,
	browser__output_,
	browser__output__relative_path_
} from '../rebuildjs_browser/index.js'
import {
	server__metafile_,
	server__metafile__persist,
	server__metafile__set,
	server__metafile_path_,
	server__output_,
	server__output__relative_path_M_middleware_ctx_
} from '../rebuildjs_server/index.js'
export const [
	build_id$_,
	build_id_,
	build_id__set,
] = be_sig_triple_(
	()=>undefined,
	{ id: 'build_id', ns: 'app' })
export function build_id__refresh() {
	const build_id = Date.now() + '-' + short_uuid_()
	build_id__set(app_ctx, build_id)
	return build_id
}
export const [
	persist__metafile__build_id$_,
	persist__metafile__build_id_,
] = be_memo_pair_(
	()=>undefined,
	{ id: 'persist__metafile__build_id', ns: 'app' }
).add((ctx, persist__metafile__build_id$)=>
	memo_(()=>{
		const build_id = build_id_(ctx)
		const metafile__build_id = metafile__build_id_(ctx)
		const server__metafile_path = server__metafile_path_(ctx)
		const browser__metafile_path = browser__metafile_path_(ctx)
		const cancel__period = cancel__period_(0, cancel_)
		if (metafile__build_id) {
			run(async ()=>{
				try {
					await Promise.all([
						build_id__match__waitfor(server__metafile_path),
						build_id__match__waitfor(browser__metafile_path),
					])
					persist__metafile__build_id$._ = build_id
				} catch (err) {
					if (err instanceof Cancel) return
					throw err
				}
			}).catch(err=>console.error(err))
		}
		function build_id__match__waitfor(metafile_path) {
			return file_exists__waitfor(async ()=>{
				const buf = await cmd(readFile(metafile_path))
				const json = buf + ''
				try {
					return JSON.parse(json).build_id === build_id
				} catch {
					return undefined
				}
			},
			Infinity,
			cancel__period)
		}
		async function cmd(promise) {
			if (cancel_()) promise__cancel__throw(promise)
			const rv = await promise
			if (cancel_()) promise__cancel__throw(promise)
			return rv
		}
		function cancel_() {
			return (
				build_id_(ctx) !== build_id
				|| metafile__build_id_(ctx) !== metafile__build_id
				|| server__metafile_path_(ctx) !== server__metafile_path
				|| browser__metafile_path_(ctx) !== browser__metafile_path
			)
		}
	}))
export const [
	persist__metafile__ready$_,
	persist__metafile__ready_,
] = be_memo_pair_(ctx=>
	nullish__none_([build_id_(ctx), persist__metafile__build_id_(ctx)],
		(build_id, persist__metafile__build_id)=>
			!!(build_id && build_id === persist__metafile__build_id)),
{ id: 'persist__metafile__ready', ns: 'app' })
export const [
	rebuildjs__esbuild__build_id$_,
	rebuildjs__esbuild__build_id_,
	rebuildjs__esbuild__build_id__set,
] = be_sig_triple_(()=>undefined,
	{ id: 'rebuildjs__esbuild__build_id', ns: 'app' })
export const [
	rebuildjs__esbuild__done$_,
	rebuildjs__esbuild__done_,
] = be_memo_pair_(ctx=>
	!!(
		build_id_(ctx)
			&& build_id_(ctx) === metafile__build_id_(ctx)
			&& build_id_(ctx) === rebuildjs__esbuild__build_id_(ctx)),
{ id: 'rebuildjs__esbuild__done', ns: 'app' })
/**
 * @param {number}[timeout]
 * @returns {Promise<void>}}
 */
export function rebuildjs__esbuild__done__wait(timeout) {
	return rmemo__wait(
		rebuildjs__esbuild__done$_(app_ctx),
		ready=>ready,
		timeout ?? 5000)
}
export const [
	rebuildjs__ready__add__ready$__a1$_,
	rebuildjs__ready__add__ready$__a1_,
	rebuildjs__ready__add__ready$__a1__set,
] = be_sig_triple_(
	()=>[],
	{ id: 'rebuildjs__ready__add__ready__a1', ns: 'app' })
export function rebuildjs__ready__add(ready$_) {
	let rebuildjs__ready__add_a1 = rebuildjs__ready__add__ready$__a1_(app_ctx)
	if (!rebuildjs__ready__add_a1.includes(ready$_)) {
		rebuildjs__ready__add_a1 = [...rebuildjs__ready__add_a1, ready$_]
		rebuildjs__ready__add__ready$__a1__set(app_ctx, rebuildjs__ready__add_a1)
	}
	return rebuildjs__ready__add_a1
}
export const [
	rebuildjs__build_id$_,
	rebuildjs__build_id_,
	rebuildjs__build_id__set,
] = be_sig_triple_(()=>undefined,
	{ id: 'rebuildjs__build_id', ns: 'app' })
export const [
	rebuildjs__ready$_,
	rebuildjs__ready_,
] = be_memo_pair_(ctx=>
	!!(
		rebuildjs__esbuild__done_(ctx)
			&& rebuildjs__build_id_(ctx) === build_id_(ctx)
			&& rebuildjs__ready__add__ready$__a1_(ctx).every(ready$_=>ready$_(ctx)())),
{ id: 'rebuildjs__ready', ns: 'app' })
/**
 * @param {number}[timeout]
 * @returns {Promise<void>}}
 */
export function rebuildjs__ready__wait(timeout) {
	return rmemo__wait(
		rebuildjs__ready$_(app_ctx),
		ready=>ready,
		timeout ?? 5000)
}
export const default_loader = {
	'.aac': 'file',
	'.apng': 'file',
	'.avif': 'file',
	'.eot': 'file',
	'.flac': 'file',
	'.gif': 'file',
	'.htm': 'file',
	'.html': 'file',
	'.ico': 'file',
	'.jfif': 'file',
	'.jpeg': 'file',
	'.jpg': 'file',
	'.mov': 'file',
	'.mp3': 'file',
	'.mp4': 'file',
	'.ogg': 'file',
	'.opus': 'file',
	'.otf': 'file',
	'.pdf': 'file',
	'.pjp': 'file',
	'.pjpeg': 'file',
	'.png': 'file',
	'.svg': 'file',
	'.ttf': 'file',
	'.wav': 'file',
	'.webm': 'file',
	'.webmanifest': 'file',
	'.webp': 'file',
	'.woff': 'file',
	'.woff2': 'file',
	'.txt': 'text',
	'.xml': 'text',
}
/**
 * @param {import('esbuild').Plugin}config
 * @returns {Promise<void>}
 * @private
 */
export async function rebuildjs_browser__build(config) {
	const {
		rebuildjs,
		...esbuild__config
	} = config ?? {}
	await rm(browser_path_(app_ctx), { recursive: true, force: true })
	await mkdir(browser_path_(app_ctx), { recursive: true })
	const path_a = await new fdir()
		.glob('**/*.browser.{ts,js,tsx,jsx}')
		.withFullPaths()
		.crawl(app_path_(app_ctx))
		.withPromise()
		.catch(err=>{
			console.error('fdir|browser|catch', { err })
			throw err
		})
	/** @type {string[]} */
	const entryPoints = esbuild__config?.entryPoints ?? []
	for (const path of path_a) {
		entryPoints.push(path)
	}
	const external = [dist_path_(app_ctx) + '/*', ...(esbuild__config.external ?? [])]
	const plugins = [rebuildjs_plugin_(), ...(esbuild__config.plugins ?? [])]
	/** @type {import('esbuild').BuildOptions} */
	const esbuild_config = {
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		target: 'es2022',
		treeShaking: true,
		minify: is_prod_(app_ctx),
		sourcemap: 'external',
		loader: default_loader,
		publicPath: '/',
		...esbuild__config,
		entryPoints,
		format: 'esm',
		platform: 'browser',
		absWorkingDir: cwd_(app_ctx),
		metafile: true,
		outdir: browser_path_(app_ctx),
		external,
		plugins,
	}
	const esbuild_ctx = await context(esbuild_config)
	if (rebuildjs?.watch ?? !is_prod_(app_ctx)) {
		await esbuild_ctx.watch()
		console.log('browser__build|watch')
	} else {
		await esbuild_ctx.rebuild()
	}
	return esbuild_ctx
}
/**
 * @param {rebuildjs_build_config_T}[config]
 * @returns {Promise<void>}
 */
export async function rebuildjs_server__build(config) {
	const {
		rebuildjs,
		...esbuild__config
	} = config ?? {}
	await rm(server_path_(app_ctx), { recursive: true, force: true })
	await mkdir(server_path_(app_ctx), { recursive: true })
	const path_a = await new fdir()
		.glob('**/*.server.{ts,js,tsx,jsx}')
		.withFullPaths()
		.crawl(app_path_(app_ctx))
		.withPromise()
		.catch(err=>{
			console.error('fdir|server|catch', { err })
			throw err
		})
	/** @type {string[]} */
	const entryPoints = esbuild__config?.entryPoints ?? []
	for (const path of path_a) {
		entryPoints.push(path)
	}
	const external = [dist_path_(app_ctx) + '/*', ...server__external_(esbuild__config)]
	const plugins = [rebuildjs_plugin_(), ...(esbuild__config.plugins || [])]
	const esbuild_config = {
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		target: 'es2022',
		treeShaking: true,
		minify: is_prod_(app_ctx),
		sourcemap: 'external',
		loader: default_loader,
		publicPath: '/',
		...esbuild__config,
		entryPoints,
		format: 'esm',
		platform: 'node',
		absWorkingDir: cwd_(app_ctx),
		metafile: true,
		outdir: server_path_(app_ctx),
		external,
		plugins,
	}
	const esbuild_ctx = await context(esbuild_config)
	if (rebuildjs?.watch ?? !is_prod_(app_ctx)) {
		await esbuild_ctx.watch()
		console.log('server__build|watch')
	} else {
		await esbuild_ctx.rebuild()
	}
	return esbuild_ctx
}
/**
 * @param {rebuildjs_build_config_T}[config]
 * @returns {Promise<string[]>}
 */
export function server__external_(config) {
	return ['bun', 'node_modules/*', ...(config.external || [])]
}
/**
 * @returns {import('esbuild').Plugin}
 * @private
 *
 */
export function rebuildjs_plugin_() {
	return { name: 'rebuildjs_plugin', setup: setup_() }
	function setup_() {
		/**
		 * @param {import('esbuild').PluginBuild}build
		 */
		const setup = build=>{
			build.onEnd(async result=>{
				const {
					/** @type {rebuildjs_metafile_T} */
					metafile
				} = result
				if (metafile) {
					const { outdir } = build.initialOptions
					const resolve_outdir = resolve(outdir)
					if (resolve_outdir === server_path_(app_ctx)) {
						const build_id = build_id__refresh()
						await server__metafile__update(metafile, { build_id })
						if (build_id_(app_ctx) === build_id) {
							await browser__metafile__update(browser__metafile_(app_ctx), { build_id })
						}
					} else if (resolve_outdir === browser_path_(app_ctx)) {
						const build_id = build_id__refresh()
						await browser__metafile__update(metafile, { build_id })
						if (build_id_(app_ctx) === build_id) {
							await server__metafile__update(server__metafile_(app_ctx), { build_id })
						}
					}
				}
				rebuildjs__esbuild__build_id__set(app_ctx, build_id_(app_ctx))
			})
		}
		// Prevent GC
		setup.rebuildjs_plugin__postprocess$ = rebuildjs_plugin__postprocess$_()
		return setup
		/**
		 *
		 * @returns {memo_T<void>}
		 * @private
		 */
		function rebuildjs_plugin__postprocess$_() {
			return (
				be(app_ctx, ctx=>
					run(memo_(rebuildjs__assets__link$=>{
						r()
						return rebuildjs__assets__link$
						function r() {
							if (!persist__metafile__ready_(ctx)) return
							nullish__none_([
								build_id_(ctx),
								metafile__build_id_(ctx),
								server__metafile_(ctx),
								browser__metafile_(ctx),
								cwd_(ctx),
								browser_path_(ctx),
								server__relative_path_(ctx),
							], (
								build_id,
								metafile__build_id,
								server__metafile,
								browser__metafile,
								cwd,
								browser_path,
								server__relative_path,
							)=>{
								if (build_id === metafile__build_id) {
									run(async ()=>{
										try {
											await esbuild_cssBundle__cp()
											await Promise.all(
												rebuildjs__ready__add__ready$__a1_(ctx).map(ready$_=>
													cmd(rmemo__wait(
														ready$_(ctx),
														ready=>ready,
														30_000))))
											await rebuildjs__assets__link()
											rebuildjs__build_id__set(ctx, build_id)
										} catch (err) {
											if (err instanceof Cancel) return
											throw err
										}
									}).catch(err=>console.error(err))
								}
								async function esbuild_cssBundle__cp() {
									for (const metafile of [server__metafile, browser__metafile]) {
										for (let output__relative_path in metafile.outputs) {
											let cssBundle, esbuild_cssBundle
											switch (extname(output__relative_path)) {
												case '.js':
												case '.mjs':
													({ cssBundle, esbuild_cssBundle } = metafile.outputs[output__relative_path])
													if (cssBundle && esbuild_cssBundle) {
														const cssBundle_path = join(cwd_(ctx), cssBundle)
														const cssBundle_map_path = cssBundle_path + '.map'
														const esbuild_cssBundle_path = join(cwd_(ctx), esbuild_cssBundle)
														const esbuild_cssBundle_map_path = esbuild_cssBundle_path + '.map'
														if (!await file_exists_(esbuild_cssBundle_path)) {
															await file_exists__waitfor(async ()=>{
																await cmd(
																	cp(cssBundle_path, esbuild_cssBundle_path))
																return true
															})
														}
														if (!await file_exists_(esbuild_cssBundle_map_path)) {
															await file_exists__waitfor(async ()=>{
																await cmd(
																	cp(
																		cssBundle_map_path,
																		esbuild_cssBundle_map_path))
																return true
															})
														}
													}
											}
										}
									}
								}
								async function rebuildjs__assets__link() {
									const outputs = server__metafile.outputs ?? {}
									const promise_a1 = []
									for (let output__relative_path in outputs) {
										const _basename = basename(output__relative_path)
										if (
											_basename.endsWith('.js')
												|| _basename.endsWith('.mjs')
												|| _basename.endsWith('.js.map')
												|| _basename.endsWith('.mjs.map')
										) continue
										const server_asset_path = join(cwd, output__relative_path)
										const browser_asset_path = join(
											browser_path,
											relative(server__relative_path, output__relative_path))
										await file_exists__waitfor(async ()=>{
											await cmd(
												rm(browser_asset_path, { force: true }))
											await cmd(
												link(server_asset_path, browser_asset_path))
											return true
										}, Infinity)
										promise_a1.push(file_exists__waitfor(browser_asset_path))
									}
									await cmd(Promise.all(promise_a1))
								}
								async function cmd(promise) {
									if (cancel_()) promise__cancel__throw(promise)
									promise.rebuildjs_cancel$ = run(memo_(rebuildjs_cancel$=>{
										if (cancel_()) {
											promise__cancel(promise)
											off(rebuildjs_cancel$)
										}
										return rebuildjs_cancel$
									}))
									const ret = await promise
									if (cancel_()) promise__cancel__throw(promise)
									return ret
								}
								function cancel_() {
									return (
										build_id_(ctx) !== build_id
											|| metafile__build_id_(ctx) !== metafile__build_id
											|| server__metafile_(ctx) !== server__metafile
											|| browser__metafile_(ctx) !== browser__metafile
											|| cwd_(ctx) !== cwd
											|| browser_path_(ctx) !== browser_path
											|| server__relative_path_(ctx) !== server__relative_path
									)
								}
							})
						}
					})),
				{ id: 'rebuildjs__assets__link$', ns: 'app' })
			)
		}
	}
}
export async function server__metafile__update(server__metafile, server__metafile_partial) {
	if (server__metafile) {
		server__metafile = {
			...server__metafile,
			...server__metafile_partial,
			rebuildjs_target: 'server'
		}
		server__metafile__set(app_ctx, server__metafile)
		for (const [
			server__output__relative_path,
			middleware_ctx
		] of server__output__relative_path_M_middleware_ctx_(app_ctx).entries()) {
			const server__output = server__output_(middleware_ctx)
			const { cssBundle } = server__output
			if (cssBundle) {
				server__output.esbuild_cssBundle ??= cssBundle__annotate(cssBundle, '_esbuild')
				server__output.cssBundle_content = [
					server__output__relative_path,
					...(
						browser__output__relative_path_(middleware_ctx)
							? [browser__output__relative_path_(middleware_ctx)]
							: [])
				]
			}
		}
		await server__metafile__persist()
	}
	return server__metafile
}
export async function browser__metafile__update(browser__metafile, browser__metafile_partial) {
	if (browser__metafile) {
		browser__metafile = {
			...browser__metafile,
			...browser__metafile_partial,
			rebuildjs_target: 'browser'
		}
		browser__metafile__set(app_ctx, browser__metafile)
		for (const middleware_ctx of server__output__relative_path_M_middleware_ctx_(app_ctx)?.values?.() ?? []) {
			const browser__output = browser__output_(middleware_ctx)
			if (browser__output) {
				const { cssBundle } = browser__output
				if (cssBundle) {
					browser__output.esbuild_cssBundle ??= cssBundle__annotate(cssBundle, '_esbuild')
					browser__output.cssBundle_content = [browser__output__relative_path_(middleware_ctx)]
				}
			}
		}
		await browser__metafile__persist()
	}
	return browser__metafile
}
export function cssBundle__annotate(cssBundle, suffix) {
	return join(
		dirname(cssBundle),
		basename(cssBundle, '.css') + (suffix ?? '') + '.css')
}
