import { ctx_ } from 'ctx-core/be'
import { file_exists_ } from 'ctx-core/fs'
import { sleep } from 'ctx-core/function'
import { BuildContext } from 'esbuild'
import { readFile } from 'node:fs/promises'
import { rm } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import {
	browser__metafile0,
	browser__metafile1,
	server__metafile0,
	server__metafile1
} from '../../_fixtures/metafiles.js'
import { cwd_, cwd__set } from '../app/index.js'
import { browser__metafile_, browser__metafile__set } from '../rebuildjs_browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__metafile_, server__metafile__set } from '../rebuildjs_server/index.js'
import {
	rebuildjs_browser__build,
	build_id$_,
	build_id_,
	build_id__refresh,
	build_id__set,
	rebuildjs__build_id$_,
	rebuildjs__build_id_,
	rebuildjs__build_id__set,
	rebuildjs__ready$_,
	rebuildjs__ready_,
	rebuildjs__ready__wait,
	rebuildjs_server__build
} from './index.js'
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
test('rebuildjs__build_id', ()=>{
	equal(rebuildjs__build_id$_(app_ctx)(), undefined)
	equal(rebuildjs__build_id_(app_ctx), undefined)
	build_id__refresh()
	equal(typeof build_id_(app_ctx), 'string')
	rebuildjs__build_id__set(app_ctx, build_id_(app_ctx)!)
	equal(rebuildjs__build_id$_(app_ctx)(), build_id_(app_ctx)!)
	equal(rebuildjs__build_id_(app_ctx), build_id_(app_ctx)!)
	// @ts-expect-error TS2345
	throws(()=>rebuildjs__build_id$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>rebuildjs__build_id_(ctx_()))
})
test('rebuildjs__ready', async ()=>{
	equal(rebuildjs__ready$_(app_ctx)(), false)
	equal(rebuildjs__ready_(app_ctx), false)
	const build_id = server__metafile0.build_id!
	build_id__set(app_ctx, build_id)
	equal(rebuildjs__ready$_(app_ctx)(), false)
	equal(rebuildjs__ready_(app_ctx), false)
	server__metafile__set(app_ctx, server__metafile0)
	equal(rebuildjs__ready$_(app_ctx)(), false)
	equal(rebuildjs__ready_(app_ctx), false)
	browser__metafile__set(app_ctx, browser__metafile0)
	equal(rebuildjs__ready$_(app_ctx)(), false)
	equal(rebuildjs__ready_(app_ctx), false)
	rebuildjs__build_id__set(app_ctx, build_id)
	equal(rebuildjs__ready$_(app_ctx)(), true)
	equal(rebuildjs__ready_(app_ctx), true)
	// @ts-expect-error TS2345
	throws(()=>rebuildjs__ready$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>rebuildjs__ready_(ctx_()))
})
test('rebuildjs__ready__wait', async ()=>{
	let done = false
	const promise = rebuildjs__ready__wait()
	promise.then(()=>done = true)
	try {
		equal(done, false)
		const build_id = server__metafile1.build_id!
		build_id__set(app_ctx, build_id)
		await sleep(0)
		equal(done, false)
		server__metafile__set(app_ctx, server__metafile1)
		await sleep(0)
		equal(done, false)
		browser__metafile__set(app_ctx, browser__metafile1)
		await sleep(0)
		equal(done, false)
		rebuildjs__build_id__set(app_ctx, build_id)
		await sleep(0)
		equal(done, true)
	} finally {
		await promise.cancel()
	}
})
test('rebuildjs__ready__wait|timeout', async ()=>{
	let err:Error|undefined = undefined
	try {
		await rebuildjs__ready__wait(0)
	} catch (_err) {
		err = _err as Error
	}
	equal(err!.message, 'Timeout 0ms')
})
test('rebuildjs_browser__build|rebuildjs_server__build|rebuildjs_plugin_|metafile', async ()=>{
	const test_dir = dirname(new URL(import.meta.url).pathname)
	const cwd = join(test_dir, '../../_fixtures')
	cwd__set(app_ctx, cwd)
	await rm(join(cwd, 'dist'), { recursive: true, force: true })
	let server__build_context:BuildContext|undefined = undefined
	let browser__build_context:BuildContext|undefined = undefined
	try {
		server__build_context = await rebuildjs_server__build()
		browser__build_context = await rebuildjs_browser__build()
		await rebuildjs__ready__wait()
		equal(await file_exists_(join(cwd, 'dist')), true)
		equal(await file_exists_(join(cwd, 'dist', 'browser--dev')), true)
		equal(await file_exists_(join(cwd, 'dist', 'server--dev')), true)
		await rebuildjs__ready__wait()
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
		equal(server__entryPoint__output.esbuild_cssBundle,
			join(
				dirname(server__entryPoint__output.cssBundle!),
				basename(server__entryPoint__output.cssBundle!, '.css') + '_esbuild.css'))
		const browser__output__relative_path =
			Object.keys(browser__metafile.outputs)
				.find(browser__output__relative_path=>
					browser__metafile.outputs[browser__output__relative_path].entryPoint)!
		equal(typeof browser__output__relative_path, 'string')
		const browser__entryPoint__output =
			browser__metafile.outputs[browser__output__relative_path]
		equal(browser__entryPoint__output != null, true)
		equal(browser__entryPoint__output.cssBundle != null, true)
		equal(browser__entryPoint__output.esbuild_cssBundle,
			join(
				dirname(browser__entryPoint__output.cssBundle!),
				basename(browser__entryPoint__output.cssBundle!, '.css') + '_esbuild.css'))
		equal(server__entryPoint__output.cssBundle_content, [
			server__output__relative_path,
			browser__output__relative_path
		])
		equal(browser__entryPoint__output.cssBundle_content, [
			browser__output__relative_path
		])
	} finally {
		await rebuildjs__ready__wait()
		server__build_context?.dispose?.()
		browser__build_context?.dispose?.()
	}
})
test('rebuildjs_browser__build|rebuildjs_server__build|rebuildjs_plugin_|css', async ()=>{
	const test_dir = dirname(new URL(import.meta.url).pathname)
	const cwd = join(test_dir, '../../_fixtures')
	cwd__set(app_ctx, cwd)
	await rm(join(cwd, 'dist'), { recursive: true, force: true })
	let server__build_context:BuildContext|undefined = undefined
	let browser__build_context:BuildContext|undefined = undefined
	try {
		server__build_context = await rebuildjs_server__build()
		browser__build_context = await rebuildjs_browser__build()
		await rebuildjs__ready__wait()
		const server__metafile = server__metafile_(app_ctx)!
		const server__output__relative_path =
			Object.keys(server__metafile.outputs)
				.find(server__output__relative_path=>
					server__metafile.outputs[server__output__relative_path].entryPoint)!
		const server__entryPoint__output =
			server__metafile.outputs[server__output__relative_path]
		const browser__metafile = browser__metafile_(app_ctx)!
		const browser__output__relative_path =
			Object.keys(browser__metafile.outputs)
				.find(browser__output__relative_path=>
					browser__metafile.outputs[browser__output__relative_path].entryPoint)!
		const browser__entryPoint__output =
			browser__metafile.outputs[browser__output__relative_path]
		equal(typeof server__entryPoint__output.cssBundle, 'string')
		equal(typeof browser__entryPoint__output.cssBundle, 'string')
		equal(typeof server__entryPoint__output.esbuild_cssBundle, 'string')
		equal(typeof browser__entryPoint__output.esbuild_cssBundle, 'string')
		equal(server__entryPoint__output.cssBundle !== server__entryPoint__output.esbuild_cssBundle, true)
		equal(browser__entryPoint__output.cssBundle !== browser__entryPoint__output.esbuild_cssBundle, true)
		equal(
			await readFile(join(cwd_(app_ctx), server__entryPoint__output.cssBundle!)).then(buf=>buf + '')
			=== await readFile(join(cwd_(app_ctx), server__entryPoint__output.esbuild_cssBundle!)).then(buf=>buf + ''),
			true)
		equal(
			await readFile(join(cwd_(app_ctx), browser__entryPoint__output.cssBundle + '.map')).then(buf=>buf + '')
			=== await readFile(join(cwd_(app_ctx), browser__entryPoint__output.esbuild_cssBundle + '.map')).then(
				buf=>buf + ''),
			true)
		equal(
			await readFile(join(cwd_(app_ctx), server__entryPoint__output.cssBundle!)).then(buf=>buf + '')
			=== await readFile(join(cwd_(app_ctx), server__entryPoint__output.esbuild_cssBundle!)).then(buf=>buf + ''),
			true)
		equal(
			await readFile(join(cwd_(app_ctx), browser__entryPoint__output.cssBundle + '.map')).then(buf=>buf + '')
			=== await readFile(join(cwd_(app_ctx), browser__entryPoint__output.esbuild_cssBundle + '.map')).then(
				buf=>buf + ''),
			true)
	} finally {
		await rebuildjs__ready__wait()
		server__build_context?.dispose?.()
		browser__build_context?.dispose?.()
	}
})
test.run()
