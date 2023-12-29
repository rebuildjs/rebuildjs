import { ctx_ } from 'ctx-core/be'
import { file_exists_ } from 'ctx-core/fs'
import { sleep } from 'ctx-core/function'
import { BuildContext } from 'esbuild'
import { rm } from 'node:fs/promises'
import { dirname, join } from 'path'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { cwd__set } from '../app/index.js'
import { browser__metafile_ } from '../browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { metafile__wait } from '../metafile/index.js'
import { server__metafile_ } from '../server/index.js'
import { browser__build, build_id$_, build_id_, build_id__refresh, build_id__set, server__build } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('build_id', ()=>{
	equal(build_id$_(app_ctx)(), undefined)
	equal(build_id_(app_ctx), undefined)
	build_id__set(app_ctx, 'test_build_id')
	equal(build_id$_(app_ctx)(), 'test_build_id')
	equal(build_id_(app_ctx), 'test_build_id')
	// @ts-expect-error TS2345
	throws(()=>build_id$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>build_id_(ctx_()))
})
test('build_id__refresh', ()=>{
	equal(build_id_(app_ctx), undefined)
	const build_id = build_id__refresh()
	equal(build_id_(app_ctx), build_id)
	equal(
		parseInt(build_id.split('-')[0]) <= Date.now(),
		true)
	equal(
		parseInt(build_id.split('-')[0]) > Date.now() - 1000,
		true)
})
test('browser__build|server__build|rebuildjs_plugin_|metafile', async ()=>{
	const test_dir = dirname(new URL(import.meta.url).pathname)
	const cwd = join(test_dir, '../_fixtures')
	cwd__set(app_ctx, cwd)
	await rm(join(cwd, 'dist'), { recursive: true, force: true })
	let server__build_context:BuildContext|undefined = undefined
	let browser__build_context:BuildContext|undefined = undefined
	try {
		server__build_context = await server__build()
		browser__build_context = await browser__build()
		await metafile__wait()
		equal(await file_exists_(join(cwd, 'dist')), true)
		equal(await file_exists_(join(cwd, 'dist', 'browser--dev')), true)
		equal(await file_exists_(join(cwd, 'dist', 'server--dev')), true)
		const server__metafile = server__metafile_(app_ctx)!
		equal(server__metafile.rebuildjs_target, 'server')
		const browser__metafile = browser__metafile_(app_ctx)!
		equal(browser__metafile.rebuildjs_target, 'browser')
		equal(server__metafile.build_id != null, true)
		equal(server__metafile.build_id, browser__metafile.build_id)
		const server__output__relative_path =
			Object.keys(server__metafile.outputs)
				.find(server__output__relative_path=>
					server__metafile.outputs[server__output__relative_path].entryPoint)!
		equal(typeof server__output__relative_path, 'string')
		const server__entryPoint__output =
			server__metafile.outputs[server__output__relative_path]
		equal(server__entryPoint__output != null, true)
		equal(server__entryPoint__output.cssBundle != null, true)
		equal(server__entryPoint__output.esbuild_cssBundle, server__entryPoint__output.cssBundle)
		const browser__output__relative_path =
			Object.keys(browser__metafile.outputs)
				.find(browser__output__relative_path=>
					browser__metafile.outputs[browser__output__relative_path].entryPoint)!
		equal(typeof browser__output__relative_path, 'string')
		const browser__entryPoint__output =
			browser__metafile.outputs[browser__output__relative_path]
		equal(browser__entryPoint__output != null, true)
		equal(browser__entryPoint__output.cssBundle != null, true)
		equal(browser__entryPoint__output.esbuild_cssBundle, browser__entryPoint__output.cssBundle)
		equal(server__entryPoint__output.cssBundle_content, [
			server__output__relative_path,
			browser__output__relative_path
		])
		equal(browser__entryPoint__output.cssBundle_content, [
			browser__output__relative_path
		])
	} finally {
		await sleep(100)
		server__build_context?.dispose?.()
		browser__build_context?.dispose?.()
	}
})
test.run()
