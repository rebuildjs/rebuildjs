import { ctx_ } from 'ctx-core/be'
import { deep_equal } from 'ctx-core/deep_equal'
import * as rmemo from 'ctx-core/rmemo'
import { rmemo__wait } from 'ctx-core/rmemo'
import esmock from 'esmock'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import {
	browser__metafile0,
	browser__metafile1,
	browser__metafile2,
	server__metafile0
} from '../../_fixtures/metafiles.js'
import { cwd__set, dist_path__set, is_prod__set } from '../app/index.js'
import { app_ctx, middleware_ctx__new } from '../ctx/index.js'
import {
	server__metafile__set,
	server__output_,
	server__output__relative_path__set
} from '../rebuildjs_server/index.js'
import {
	browser__css$_,
	browser__css_,
	browser__cssBundle$_,
	browser__cssBundle_,
	browser__cssBundle__relative_path$_,
	browser__cssBundle__relative_path_,
	browser__metafile$_,
	browser__metafile_,
	browser__metafile__set,
	browser__metafile_path$_,
	browser__metafile_path_,
	browser__output$_,
	browser__output_,
	browser__output__relative_path$_,
	browser__output__relative_path_,
	browser__script$_,
	browser__script_
} from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('browser__metafile_path', ()=>{
	dist_path__set(app_ctx, '/test/dist')
	is_prod__set(app_ctx, true)
	equal(browser__metafile_path$_(app_ctx)._, '/test/dist/browser/metafile.json')
	equal(browser__metafile_path_(app_ctx), '/test/dist/browser/metafile.json')
	is_prod__set(app_ctx, false)
	equal(browser__metafile_path$_(app_ctx)._, '/test/dist/browser--dev/metafile.json')
	equal(browser__metafile_path_(app_ctx), '/test/dist/browser--dev/metafile.json')
	dist_path__set(app_ctx, '/test/dist2')
	equal(browser__metafile_path$_(app_ctx)._, '/test/dist2/browser--dev/metafile.json')
	equal(browser__metafile_path_(app_ctx), '/test/dist2/browser--dev/metafile.json')
	is_prod__set(app_ctx, true)
	equal(browser__metafile_path$_(app_ctx)._, '/test/dist2/browser/metafile.json')
	equal(browser__metafile_path_(app_ctx), '/test/dist2/browser/metafile.json')
	// @ts-expect-error TS2345
	throws(()=>browser__metafile_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>browser__metafile_path_(ctx_()))
})
test('browser__metafile', async ()=>{
	let readFile_path:string|undefined = undefined
	let _browser__metafile$_:typeof browser__metafile$_
	let _browser__metafile_:typeof browser__metafile_
	let _browser__metafile__set:typeof browser__metafile__set
	is_prod__set(app_ctx, true)
	dist_path__set(app_ctx, '/cwd/dist0')
	{
		({
			browser__metafile$_: _browser__metafile$_,
			browser__metafile_: _browser__metafile_,
			browser__metafile__set: _browser__metafile__set,
		} = await esmock.p('./index.js', import.meta.url, {}, {
			'ctx-core/rmemo': rmemo,
			'node:fs/promises': {
				// TODO: https://github.com/iambumblehead/esmock/issues/281
				// access: async ()=>{},
				readFile: async (path:string)=>{
					readFile_path = path
					switch (path) {
						case '/cwd/dist0/browser/metafile.json':
							return Buffer.from(JSON.stringify(browser__metafile0), 'utf-8')
						case '/cwd/dist1/browser/metafile.json':
							return Buffer.from(JSON.stringify(browser__metafile1), 'utf-8')
					}
					return undefined
				}
			},
		}))
	}
	equal(_browser__metafile$_(app_ctx)._, undefined)
	equal(_browser__metafile_(app_ctx), undefined)
	await rmemo__wait(
		_browser__metafile$_(app_ctx),
		m=>m,
		100)
	equal(_browser__metafile$_(app_ctx)._, browser__metafile0)
	equal(_browser__metafile_(app_ctx), browser__metafile0)
	equal(readFile_path, '/cwd/dist0/browser/metafile.json')
	equal(_browser__metafile$_(app_ctx)._, browser__metafile0)
	equal(_browser__metafile_(app_ctx), browser__metafile0)
	dist_path__set(app_ctx, '/cwd/dist1')
	await rmemo__wait(
		_browser__metafile$_(app_ctx),
		m=>deep_equal(m, browser__metafile1),
		100)
	equal(_browser__metafile$_(app_ctx)._, browser__metafile1)
	equal(_browser__metafile_(app_ctx), browser__metafile1)
	equal(readFile_path, '/cwd/dist1/browser/metafile.json')
	dist_path__set(app_ctx, '/cwd/dist0')
	await rmemo__wait(
		_browser__metafile$_(app_ctx),
		m=>deep_equal(m, browser__metafile0),
		100)
	equal(_browser__metafile$_(app_ctx)._, browser__metafile0)
	equal(_browser__metafile_(app_ctx), browser__metafile0)
	equal(readFile_path, '/cwd/dist0/browser/metafile.json')
	_browser__metafile__set(app_ctx, browser__metafile2)
	equal(_browser__metafile$_(app_ctx)._, browser__metafile2)
	equal(_browser__metafile_(app_ctx), browser__metafile2)
	dist_path__set(app_ctx, '/cwd/dist1')
	let error_msg:string|undefined = undefined
	try {
		await rmemo__wait(
			_browser__metafile$_(app_ctx),
			m=>deep_equal(m, browser__metafile1),
			100)
	} catch (e) {
		error_msg = (e as Error).message
	}
	equal(_browser__metafile$_(app_ctx)._, browser__metafile2)
	equal(_browser__metafile_(app_ctx), browser__metafile2)
	equal(error_msg, `Timeout 100ms`)
	// @ts-expect-error TS2345
	throws(()=>_browser__metafile$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>_browser__metafile_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>_browser__metafile__set(ctx_(), browser__metafile0))
})
test('browser__output__relative_path', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(browser__output__relative_path$_(middleware_ctx)._, undefined)
	equal(browser__output__relative_path_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server__metafile0)
	equal(browser__output__relative_path$_(middleware_ctx)._, undefined)
	equal(browser__output__relative_path_(middleware_ctx), undefined)
	browser__metafile__set(middleware_ctx, browser__metafile0)
	equal(browser__output__relative_path$_(middleware_ctx)._, undefined)
	equal(browser__output__relative_path_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'], {
		'imports': [],
		'exports': [],
		'entryPoint': 'src/app/index.server.ts',
		'cssBundle': 'dist/server--dev/index.server-SVR0SVR0.css',
		'inputs': {
			'../input/path0': {
				'bytesInOutput': 98
			},
		},
		'bytes': 98
	})
	equal(server__output_(middleware_ctx), server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'])
	equal(browser__output__relative_path$_(middleware_ctx)._, 'dist/browser--dev/index.browser-BRS0BRS0.js')
	equal(browser__output__relative_path_(middleware_ctx), 'dist/browser--dev/index.browser-BRS0BRS0.js')
	// @ts-expect-error TS2345
	throws(()=>browser__output__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>browser__output__relative_path_(ctx_()))
})
test('browser__output', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(browser__output$_(middleware_ctx)(), undefined)
	equal(browser__output_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server__metafile0)
	browser__metafile__set(middleware_ctx, browser__metafile0)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(browser__output__relative_path_(middleware_ctx), 'dist/browser--dev/index.browser-BRS0BRS0.js')
	equal(typeof browser__metafile0.outputs['dist/browser--dev/index.browser-BRS0BRS0.js'], 'object')
	equal(browser__output$_(middleware_ctx)(), browser__metafile0.outputs['dist/browser--dev/index.browser-BRS0BRS0.js'])
	equal(browser__output_(middleware_ctx), browser__metafile0.outputs['dist/browser--dev/index.browser-BRS0BRS0.js'])
	// @ts-expect-error TS2345
	throws(()=>browser__output$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>browser__output_(app_ctx))
})
test('browser__cssBundle__relative_path', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(browser__cssBundle__relative_path$_(middleware_ctx)(), undefined)
	equal(browser__cssBundle__relative_path_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server__metafile0)
	browser__metafile__set(middleware_ctx, browser__metafile0)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(browser__output__relative_path_(middleware_ctx), 'dist/browser--dev/index.browser-BRS0BRS0.js')
	equal(browser__metafile0.outputs['dist/browser--dev/index.browser-BRS0BRS0.js'].cssBundle, 'dist/browser--dev/index.browser-BRS0BRS0.css')
	equal(browser__cssBundle__relative_path$_(middleware_ctx)(), 'dist/browser--dev/index.browser-BRS0BRS0.css')
	equal(browser__cssBundle__relative_path_(middleware_ctx), 'dist/browser--dev/index.browser-BRS0BRS0.css')
	// @ts-expect-error TS2345
	throws(()=>browser__cssBundle__relative_path$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>browser__cssBundle__relative_path_(app_ctx))
})
test('browser__cssBundle', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(browser__cssBundle$_(middleware_ctx)(), undefined)
	equal(browser__cssBundle_(middleware_ctx), undefined)
	cwd__set(app_ctx, '/cwd')
	server__metafile__set(middleware_ctx, server__metafile0)
	browser__metafile__set(middleware_ctx, browser__metafile0)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(browser__output__relative_path_(middleware_ctx), 'dist/browser--dev/index.browser-BRS0BRS0.js')
	equal(browser__metafile0.outputs['dist/browser--dev/index.browser-BRS0BRS0.js'].cssBundle, 'dist/browser--dev/index.browser-BRS0BRS0.css')
	equal(browser__cssBundle$_(middleware_ctx)(), '/cwd/dist/browser--dev/index.browser-BRS0BRS0.css')
	equal(browser__cssBundle_(middleware_ctx), '/cwd/dist/browser--dev/index.browser-BRS0BRS0.css')
	// @ts-expect-error TS2345
	throws(()=>browser__cssBundle$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>browser__cssBundle_(app_ctx))
})
test('browser__css', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(browser__css$_(middleware_ctx)(), undefined)
	equal(browser__css_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server__metafile0)
	browser__metafile__set(middleware_ctx, browser__metafile0)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(browser__output__relative_path_(middleware_ctx), 'dist/browser--dev/index.browser-BRS0BRS0.js')
	equal(browser__metafile0.outputs['dist/browser--dev/index.browser-BRS0BRS0.js'].cssBundle, 'dist/browser--dev/index.browser-BRS0BRS0.css')
	equal(browser__css$_(middleware_ctx)(), '/index.browser-BRS0BRS0.css')
	equal(browser__css_(middleware_ctx), '/index.browser-BRS0BRS0.css')
	// @ts-expect-error TS2345
	throws(()=>browser__css$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>browser__css_(app_ctx))
})
test('browser__script', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(browser__script$_(middleware_ctx)._, undefined)
	equal(browser__script_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server__metafile0)
	equal(browser__script$_(middleware_ctx)._, undefined)
	equal(browser__script_(middleware_ctx), undefined)
	browser__metafile__set(middleware_ctx, browser__metafile0)
	equal(browser__script$_(middleware_ctx)._, undefined)
	equal(browser__script_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(browser__script$_(middleware_ctx)._, '/index.browser-BRS0BRS0.js')
	equal(browser__script_(middleware_ctx), '/index.browser-BRS0BRS0.js')
	// @ts-expect-error TS2345
	throws(()=>browser__script$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>browser__script_(ctx_()))
})
test.run()
