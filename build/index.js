/// <reference types="./index.d.ts" />
/** @typedef {import('esbuild').BuildOptions}BuildOptions */
/** @typedef {import('esbuild').Plugin}Plugin */
import { build, context } from 'esbuild'
import { fdir } from 'fdir'
import { link, mkdir, rm, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'path'
import { app_path_, browser_path_, cwd_, is_prod_, server__relative_path_, server_path_ } from '../app/index.js'
import { browser__metafile__set } from '../browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__metafile_, server__metafile__set } from '../server/index.js'
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
	if (rebuildjs?.watch ?? !is_prod_(app_ctx)) {
		const esbuild_ctx = await context(esbuild_config)
		await esbuild_ctx.watch()
		console.log('browser__build|watch')
	} else {
		await build(esbuild_config)
	}
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
				const outputs = server__metafile_(app_ctx)?.outputs ?? {}
				for (let output__relative_path in outputs) {
					if (/(\.js|\.mjs)(\.map)?$/.test(output__relative_path)) continue
					const asset_path = join(cwd_(app_ctx), output__relative_path)
					await link(
						asset_path,
						join(browser_path_(app_ctx), relative(server__relative_path_(app_ctx), output__relative_path)))
				}
			})
		}
	}
}
