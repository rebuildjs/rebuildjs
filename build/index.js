/// <reference types="../metafile_l0/index.d.ts" />
/// <reference types="./index.d.ts" />
import { file_exists__waitfor } from 'ctx-core/fs'
import { Cancel, cancel__period_, nullish__none_, run, waitfor } from 'ctx-core/function'
import { be, be_memo_pair_, be_sig_triple_, memo_, off, rmemo__wait } from 'ctx-core/rmemo'
import { short_uuid_ } from 'ctx-core/uuid'
import { context } from 'esbuild'
import { fdir } from 'fdir'
import { cp, link, mkdir, readFile, rm } from 'node:fs/promises'
import { basename, dirname, extname, join, relative, resolve } from 'path'
import { app_path_, browser_path_, cwd_, is_prod_, server__relative_path_, server_path_ } from '../app/index.js'
import {
	browser__metafile_,
	browser__metafile__persist,
	browser__metafile__set,
	browser__metafile_path_,
	browser__output__relative_path_
} from '../browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { metafile__build_id_ } from '../metafile/index.js'
import {
	server__metafile_,
	server__metafile__persist,
	server__metafile__set,
	server__metafile_path_,
	server__output__relative_path_M_middleware_ctx_
} from '../server/index.js'
export const [
	build_id$_,
	build_id_,
	build_id__set,
] = be_sig_triple_(()=>
	undefined,
{ id: 'build_id', ns: 'app' })
export function build_id__refresh() {
	const build_id = Date.now() + '-' + short_uuid_()
	build_id__set(app_ctx, build_id)
	return build_id
}
export const [
	persist__metafile__build_id$_,
	persist__metafile__build_id_,
] = be_memo_pair_(()=>undefined,
	(ctx, persist__metafile__build_id$)=>{
		const build_id = build_id_(ctx)
		const metafile__build_id = metafile__build_id_(ctx)
		const server__metafile_path = server__metafile_path_(ctx)
		const browser__metafile_path = browser__metafile_path_(ctx)
		if (metafile__build_id) {
			const cancel__period = cancel__period_(0, cancel_)
			run(async ()=>{
				try {
					await cmd(
						file_exists__waitfor(server__metafile_path, 1000, cancel__period))
					await cmd(
						waitfor(()=>
							readFile(server__metafile_path).then(buf=>
								JSON.parse('' + buf)?.build_id === build_id),
						1000,
						cancel__period))
					await cmd(
						file_exists__waitfor(browser__metafile_path, 1000, cancel__period))
					await cmd(
						waitfor(()=>
							readFile(browser__metafile_path).then(buf=>
								JSON.parse('' + buf)?.build_id === build_id),
						1000,
						cancel__period))
					persist__metafile__build_id$._ = build_id
				} catch (err) {
					if (err instanceof Cancel) return
					throw err
				}
			})
		}
		async function cmd(promise) {
			if (cancel_()) throw new Cancel
			const rv = await promise
			if (cancel_()) {
				promise.cancel?.()
				throw new Cancel
			}
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
	},
	{ id: 'persist__metafile__build_id', ns: 'app' })
export const [
	persist__metafile__ready$_,
	persist__metafile__ready_,
] = be_memo_pair_(ctx=>
	nullish__none_([build_id_(ctx), persist__metafile__build_id_(ctx)],
		(build_id, persist__metafile__build_id)=>
			!!(build_id && build_id === persist__metafile__build_id)),
{ id: 'persist__metafile__ready', ns: 'app' })
export const [
	rebuildjs__build_id$_,
	rebuildjs__build_id_,
	rebuildjs__build_id__set,
] = be_sig_triple_(()=>undefined,
	{ id: 'rebuildjs_plugin__build_id', ns: 'app' })
export const [
	rebuildjs__ready$_,
	rebuildjs__ready_,
] = be_memo_pair_(ctx=>
	!!(
		build_id_(ctx)
			&& build_id_(ctx) === metafile__build_id_(ctx)
			&& build_id_(ctx) === rebuildjs__build_id_(ctx)),
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
/**
 * @param {import('esbuild').Plugin}config
 * @returns {Promise<void>}
 * @private
 */
export async function browser__build(config) {
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
	/** @type {string[]} */
	const entryPoints = esbuild__config?.entryPoints ?? []
	for (const path of path_a) {
		entryPoints.push(path)
	}
	const plugins = [rebuildjs_plugin_(), ...(esbuild__config.plugins || [])]
	/** @type {import('esbuild').BuildOptions} */
	const esbuild_config = {
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		external: [],
		target: 'es2021',
		treeShaking: true,
		minify: is_prod_(app_ctx),
		sourcemap: 'external',
		...esbuild__config,
		entryPoints,
		format: 'esm',
		platform: 'browser',
		absWorkingDir: cwd_(app_ctx),
		metafile: true,
		outdir: browser_path_(app_ctx),
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
export async function server__build(config) {
	const {
		rebuildjs,
		...esbuild__config
	} = config ?? {}
	await rm(server_path_(app_ctx), { recursive: true, force: true })
	const path_a = await new fdir()
		.glob('**/*.server.{ts,js,tsx,jsx}')
		.withFullPaths()
		.crawl(app_path_(app_ctx))
		.withPromise()
	/** @type {string[]} */
	const entryPoints = esbuild__config?.entryPoints ?? []
	for (const path of path_a) {
		entryPoints.push(path)
	}
	const plugins = [rebuildjs_plugin_(), ...(esbuild__config.plugins || [])]
	const esbuild_config = {
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		target: 'es2022',
		treeShaking: true,
		minify: is_prod_(app_ctx),
		sourcemap: 'external',
		...esbuild__config,
		entryPoints,
		format: 'esm',
		platform: 'node',
		absWorkingDir: cwd_(app_ctx),
		metafile: true,
		outdir: server_path_(app_ctx),
		external: server__external_(esbuild__config),
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
						await server__metafile__update(metafile, build_id)
						if (build_id_(app_ctx) === build_id) {
							await browser__metafile__update(browser__metafile_(app_ctx), build_id)
						}
					} else if (resolve_outdir === browser_path_(app_ctx)) {
						const build_id = build_id__refresh()
						await browser__metafile__update(metafile, build_id)
						if (build_id_(app_ctx) === build_id) {
							await server__metafile__update(server__metafile_(app_ctx), build_id)
						}
					}
				}
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
											await rebuildjs__assets__link()
										} catch (err) {
											if (err instanceof Cancel) return
											throw err
										}
										rebuildjs__build_id__set(ctx, build_id)
									})
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
														const esbuild_cssBundle_path = join(cwd_(ctx), esbuild_cssBundle)
														await cmd(
															file_exists__waitfor(cssBundle_path))
														await cmd(
															cp(cssBundle_path, esbuild_cssBundle_path))
													}
											}
										}
									}
								}
								async function rebuildjs__assets__link() {
									const outputs= server__metafile.outputs ?? {}
									for (let output__relative_path in outputs) {
										switch (extname(output__relative_path)) {
											case '.js':
											case '.mjs':
											case '.map':
												continue
										}
										const server_asset_path = join(cwd, output__relative_path)
										const browser_asset_path = join(
											browser_path,
											relative(server__relative_path, output__relative_path))
										await cmd(
											rm(browser_asset_path, { force: true }))
										await cmd(
											file_exists__waitfor(server_asset_path))
										await cmd(
											link(server_asset_path, browser_asset_path))
									}
								}
								async function cmd(promise) {
									if (cancel_()) throw new Cancel()
									promise.rebuildjs_cancel$ = run(memo_(rebuildjs_cancel$=>{
										if (cancel_()) {
											promise.cancel?.()
											off(rebuildjs_cancel$)
										}
										return rebuildjs_cancel$
									}))
									const ret = await promise
									if (cancel_()) throw new Cancel()
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
async function server__metafile__update(server__metafile, build_id) {
	if (!server__metafile) return
	server__metafile = {
		...server__metafile,
		build_id,
		rebuildjs_target: 'server'
	}
	server__metafile__set(app_ctx, server__metafile)
	for (const [
		server__output__relative_path,
		middleware_ctx
	] of server__output__relative_path_M_middleware_ctx_(app_ctx).entries()) {
		const output = server__metafile.outputs[server__output__relative_path]
		const { cssBundle } = output
		if (cssBundle) {
			output.esbuild_cssBundle = esbuild_cssBundle_(cssBundle)
			output.cssBundle_content = [
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
async function browser__metafile__update(browser__metafile, build_id) {
	if (!browser__metafile) return
	browser__metafile = {
		...browser__metafile,
		build_id,
		rebuildjs_target: 'browser'
	}
	browser__metafile__set(app_ctx, browser__metafile)
	for (const middleware_ctx of server__output__relative_path_M_middleware_ctx_(app_ctx)?.values?.() ?? []) {
		const browser__output__relative_path = browser__output__relative_path_(middleware_ctx)
		if (browser__output__relative_path) {
			const output = browser__metafile.outputs[browser__output__relative_path]
			const { cssBundle } = output
			if (cssBundle) {
				output.esbuild_cssBundle = esbuild_cssBundle_(cssBundle)
				output.cssBundle_content = [browser__output__relative_path]
			}
		}
	}
	await browser__metafile__persist()
}
function esbuild_cssBundle_(cssBundle) {
	return join(
		dirname(cssBundle),
		basename(cssBundle, '.css') + '_esbuild.css')
}
