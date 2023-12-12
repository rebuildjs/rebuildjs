/// <reference types="esbuild" />
import { writeFile } from '@ctx-core/monorepo'
import { build, context } from 'esbuild'
import { fdir } from 'fdir'
import { link, mkdir, rm } from 'fs/promises'
import { dirname, join, resolve } from 'path'
import { app_path_, browser_path_, is_prod_, public_path_, server_path_ } from '../app/index.js'
import { browser__metafile__set } from '../browser/index.js'
import { app_ctx, middleware_ctx_ } from '../ctx/index.js'
import {
	server__css_,
	server__cssBundle_,
	server__input_path__set,
	server__metafile_,
	server__metafile__set
} from '../server'
/**
 * @param {Partial<BuildOptions>}config
 * @returns {Promise<void>}
 */
export async function server__build(config = {}) {
	await rm(server_path_(app_ctx), { recursive: true, force: true })
	const path_a = await new fdir()
		.glob('**/*.server.{ts,js,tsx,jsx}')
		.withFullPaths()
		.crawl(app_path_(app_ctx))
		.withPromise()
	/** @type {string[]} */
	const entryPoints = []
	for (const path of path_a) {
		entryPoints.push(path)
	}
	const external = ['/assets/*', 'bun', 'node_modules/*', ...(config.external || [])]
	const plugins = [resbuild_plugin_(), ...(config.plugins || [])]
	const esbuild_config = {
		entryPoints,
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		external,
		target: 'es2020',
		treeShaking: true,
		minify: is_prod_(app_ctx),
		sourcemap: 'external',
		...config,
		format: 'esm',
		platform: 'node',
		metafile: true,
		outdir: server_path_(app_ctx),
		plugins,
	}
	if (is_prod_(app_ctx)) {
		await build(esbuild_config)
	} else {
		const esbuild_ctx = await context(esbuild_config)
		await esbuild_ctx.watch()
	}
}
export async function browser__build(config = {}) {
	await rm(browser_path_(app_ctx), { recursive: true, force: true })
	await mkdir(browser_path_(app_ctx), { recursive: true })
	const path_a = await new fdir()
		.glob('**/*.browser.{ts,js,tsx,jsx}')
		.withFullPaths()
		.crawl(app_path_(app_ctx))
		.withPromise()
	/** @type {string[]} */
	const entryPoints = []
	for (const path of path_a) {
		entryPoints.push(path)
	}
	const plugins = [resbuild_plugin_(), ...(config.plugins || [])]
	/** @type {BuildOptions} */
	const esbuild_config = {
		entryPoints,
		entryNames: '[name]-[hash]',
		assetNames: '[name]-[hash]',
		bundle: true,
		external: [],
		target: 'es2020',
		treeShaking: true,
		minify: is_prod_(app_ctx),
		sourcemap: 'external',
		...config,
		format: 'esm',
		platform: 'browser',
		metafile: true,
		outdir: browser_path_(app_ctx),
		plugins,
	}
	if (is_prod_(app_ctx)) {
		await build(esbuild_config)
	} else {
		const esbuild_ctx = await context(esbuild_config)
		await esbuild_ctx.watch()
	}
	await public__cp()
}
export function resbuild_plugin_() {
	return {
		name: 'cssBundle_to_browser',
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
						let server__css = server__css_(middleware_ctx)
						await link(
							join(server_path_(app_ctx), server__css),
							join(browser_path_(app_ctx), server__css))
					}
				}
			})
		}
	}
}
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
