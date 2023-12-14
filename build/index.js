/// <reference types="./index.d.ts" />
import { file_exists_ } from '@ctx-core/fs'
/** @typedef {import('esbuild').BuildOptions}BuildOptions */
/** @typedef {import('esbuild').Plugin}Plugin */
import { writeFile } from '@ctx-core/monorepo'
import { build, context } from 'esbuild'
import { fdir } from 'fdir'
import { link, mkdir, rm } from 'fs/promises'
import { dirname, join, resolve } from 'path'
import { app_path_, browser_path_, cwd_, is_prod_, public_path_, server_path_ } from '../app/index.js'
import { browser__metafile__set } from '../browser/index.js'
import { app_ctx, middleware_ctx_ } from '../ctx/index.js'
import {
	server__css_,
	server__cssBundle_,
	server__input_path__set,
	server__metafile_,
	server__metafile__set
} from '../server/index.js'
/**
 * @param {Plugin}config
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
	const plugins = [rebuildjs__plugin_(), ...(esbuild__config.plugins || [])]
	/** @type {BuildOptions} */
	const esbuild_config = {
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		external: [],
		target: 'es2020',
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
	if (rebuildjs?.watch ?? !is_prod_(app_ctx)) {
		const esbuild_ctx = await context(esbuild_config)
		await esbuild_ctx.watch()
		console.log('browser__build|watch')
	} else {
		await build(esbuild_config)
	}
	await public__cp()
}
/**
 * @param {rebuildjs__build_config_T}[config]
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
	const plugins = [rebuildjs__plugin_(), ...(esbuild__config.plugins || [])]
	const esbuild_config = {
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		target: 'es2020',
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
	if (rebuildjs?.watch ?? !is_prod_(app_ctx)) {
		const esbuild_ctx = await context(esbuild_config)
		await esbuild_ctx.watch()
		console.log('server__build|watch')
	} else {
		await build(esbuild_config)
	}
}
/**
 * @param {rebuildjs__build_config_T}[config]
 * @returns {Promise<string[]>}
 */
export function server__external_(config) {
	return ['bun', 'node_modules/*', ...(config.external || [])]
}
/**
 * @returns {Plugin}
 * @private
 */
export function rebuildjs__plugin_() {
	return {
		name: 'rebuildjs__plugin',
		setup(build) {
			build.onEnd(async result=>{
				if (result.metafile) {
					const { outdir } = build.initialOptions
					const resolve_outdir = resolve(outdir)
					if (resolve_outdir === server_path_(app_ctx)) {
						server__metafile__set(app_ctx, result.metafile)
					} else if (resolve_outdir === browser_path_(app_ctx)) {
						browser__metafile__set(app_ctx, result.metafile)
					}
					if (outdir) {
						await writeFile(
							join(outdir, 'metafile.json'),
							JSON.stringify(result.metafile, null, 2))
					}
				}
				const inputs = server__metafile_(app_ctx)?.inputs ?? []
				for (let input_path in inputs) {
					const middleware_ctx = middleware_ctx_()
					server__input_path__set(middleware_ctx, input_path)
					const cssBundle = server__cssBundle_(middleware_ctx)
					if (cssBundle) {
						const server__css = server__css_(middleware_ctx)
						await link(
							join(server_path_(app_ctx), server__css),
							join(browser_path_(app_ctx), server__css))
						const server__css_map = `${server__css}.map`
						if (await file_exists_(join(server_path_(app_ctx), server__css_map))) {
							await link(
								join(server_path_(app_ctx), server__css_map),
								join(browser_path_(app_ctx), server__css_map))
						}
					}
				}
			})
		}
	}
}
/**
 * @returns {Promise<void>}
 */
async function public__cp() {
	const path_a = new fdir()
		.withFullPaths()
		.crawl(public_path_(app_ctx))
		.sync()
	/** @type {Promise<unknown>[]} */
	const promise_a = []
	for (const path of path_a) {
		promise_a.push(
			(async ()=>{
				const out_path = path.replace(public_path_(app_ctx), browser_path_(app_ctx))
				await mkdir(dirname(out_path), { recursive: true })
				await link(path, out_path)
			})(),
		)
	}
}
