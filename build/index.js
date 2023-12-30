/// <reference types="../metafile_l0/index.d.ts" />
/// <reference types="./index.d.ts" />
import { file_exists__waitfor } from 'ctx-core/fs'
import { nullish__none_, run } from 'ctx-core/function'
import { be, be_memo_pair_, be_sig_triple_, memo_, rmemo__wait } from 'ctx-core/rmemo'
import { short_uuid_ } from 'ctx-core/uuid'
import { context } from 'esbuild'
import { fdir } from 'fdir'
import { link, mkdir, rm } from 'node:fs/promises'
import { join, relative, resolve } from 'path'
import { app_path_, browser_path_, cwd_, is_prod_, server__relative_path_, server_path_ } from '../app/index.js'
import {
	browser__metafile_,
	browser__metafile__persist,
	browser__metafile__set,
	browser__output__relative_path_
} from '../browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { metafile__build_id_ } from '../metafile/index.js'
import {
	server__metafile_,
	server__metafile__persist,
	server__metafile__set,
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
		setup.rebuildjs__assets__link$ = rebuildjs__assets__link$_()
		return setup
		/**
		 *
		 * @returns {memo_T<void>}
		 * @private
		 */
		function rebuildjs__assets__link$_() {
			return (
				be(app_ctx, ctx=>
					run(memo_(assets__link$=>{
						r()
						return assets__link$
						function r() {
							nullish__none_([
								build_id_(ctx),
								metafile__build_id_(ctx),
								server__metafile_(ctx),
								cwd_(ctx),
								browser_path_(ctx),
								server__relative_path_(ctx),
							], (
								build_id,
								metafile__build_id,
								server__metafile,
								cwd,
								browser_path,
								server__relative_path,
							)=>{
								if (build_id === metafile__build_id) {
									run(async ()=>{
										try {
											const outputs = server__metafile.outputs ?? {}
											for (let output__relative_path in outputs) {
												if (/(\.js|\.mjs)(\.map)?$/.test(output__relative_path)) continue
												const server_asset_path = join(cwd, output__relative_path)
												const browser_asset_path = join(
													browser_path,
													relative(server__relative_path, output__relative_path))
												await cmd(()=>
													rm(browser_asset_path, { force: true }))
												await cmd(()=>
													file_exists__waitfor(server_asset_path))
												await cmd(()=>
													link(server_asset_path, browser_asset_path))
											}
										} catch (err) {
											if (err instanceof RebuildjsInterrupt) return
											throw err
										}
										rebuildjs__build_id__set(ctx, build_id)
									})
								}
								async function cmd(fn) {
									if (cancel_()) throw new RebuildjsInterrupt()
									const ret = await fn()
									if (cancel_()) throw new RebuildjsInterrupt()
									return ret
								}
								function cancel_() {
									return (
										build_id_(ctx) !== build_id
											|| metafile__build_id_(ctx) !== metafile__build_id
											|| server__metafile_(ctx) !== server__metafile
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
			output.esbuild_cssBundle = cssBundle
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
				output.esbuild_cssBundle = cssBundle
				output.cssBundle_content = [browser__output__relative_path]
			}
		}
	}
	await browser__metafile__persist()
}
export class RebuildjsInterrupt extends Error {
	constructor() {
		super('RebuildjsInterrupt')
	}
}
