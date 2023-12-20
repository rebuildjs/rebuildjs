import { ctx_ } from 'ctx-core/be'
import { deep_equal } from 'ctx-core/deep_equal'
import * as rmemo from 'ctx-core/rmemo'
import { rmemo__wait } from 'ctx-core/rmemo'
import esmock from 'esmock'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { browser_metafile0, browser_metafile1, browser_metafile2, server_metafile0 } from '../_fixtures/index.js'
import { dist_path__set, is_prod__set } from '../app/index.js'
import { app_ctx, middleware_ctx_ } from '../ctx/index.js'
import { server__metafile__set, server__output_, server__output__relative_path__set } from '../server/index.js'
import {
	browser__metafile$_,
	browser__metafile_,
	browser__metafile__set,
	browser__metafile_path$_,
	browser__metafile_path_,
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
	let file_exists__path:string|undefined = undefined
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
		} = await esmock('./index.js', {}, {
			'ctx-core/rmemo': rmemo,
			'ctx-core/fs': {
				file_exists_: async (path:string)=>{
					file_exists__path = path
					return true
				}
			},
			'node:fs/promises': {
				readFile: async (path:string)=>{
					readFile_path = path
					switch (path) {
						case '/cwd/dist0/browser/metafile.json':
							return Buffer.from(JSON.stringify(browser_metafile0), 'utf-8')
						case '/cwd/dist1/browser/metafile.json':
							return Buffer.from(JSON.stringify(browser_metafile1), 'utf-8')
					}
				}
			},
		}))
	}
	equal(_browser__metafile$_(app_ctx)._, undefined)
	equal(_browser__metafile_(app_ctx), undefined)
	await rmemo__wait(_browser__metafile$_(app_ctx), m=>m, 100)
	equal(_browser__metafile$_(app_ctx)._, browser_metafile0)
	equal(_browser__metafile_(app_ctx), browser_metafile0)
	equal(file_exists__path, '/cwd/dist0/browser/metafile.json')
	equal(readFile_path, '/cwd/dist0/browser/metafile.json')
	equal(_browser__metafile$_(app_ctx)._, browser_metafile0)
	equal(_browser__metafile_(app_ctx), browser_metafile0)
	dist_path__set(app_ctx, '/cwd/dist1')
	await rmemo__wait(_browser__metafile$_(app_ctx), m=>deep_equal(m, browser_metafile1), 100)
	equal(_browser__metafile$_(app_ctx)._, browser_metafile1)
	equal(_browser__metafile_(app_ctx), browser_metafile1)
	equal(file_exists__path, '/cwd/dist1/browser/metafile.json')
	equal(readFile_path, '/cwd/dist1/browser/metafile.json')
	dist_path__set(app_ctx, '/cwd/dist0')
	await rmemo__wait(_browser__metafile$_(app_ctx), m=>deep_equal(m, browser_metafile0), 100)
	equal(_browser__metafile$_(app_ctx)._, browser_metafile0)
	equal(_browser__metafile_(app_ctx), browser_metafile0)
	equal(file_exists__path, '/cwd/dist0/browser/metafile.json')
	equal(readFile_path, '/cwd/dist0/browser/metafile.json')
	_browser__metafile__set(app_ctx, browser_metafile2)
	equal(_browser__metafile$_(app_ctx)._, browser_metafile2)
	equal(_browser__metafile_(app_ctx), browser_metafile2)
	dist_path__set(app_ctx, '/cwd/dist1')
	let error_msg:string|undefined = undefined
	try {
		await rmemo__wait(_browser__metafile$_(app_ctx), m=>deep_equal(m, browser_metafile1), 100)
	} catch (e) {
		error_msg = (e as Error).message
	}
	equal(_browser__metafile$_(app_ctx)._, browser_metafile2)
	equal(_browser__metafile_(app_ctx), browser_metafile2)
	equal(error_msg, `Timeout 100ms`)
	// @ts-expect-error TS2345
	throws(()=>_browser__metafile$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>_browser__metafile_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>_browser__metafile__set(ctx_(), browser_metafile0))
})
test('browser__output__relative_path', ()=>{
	const middleware_ctx = middleware_ctx_()
	equal(browser__output__relative_path$_(middleware_ctx)._, undefined)
	equal(browser__output__relative_path_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server_metafile0)
	equal(browser__output__relative_path$_(middleware_ctx)._, undefined)
	equal(browser__output__relative_path_(middleware_ctx), undefined)
	browser__metafile__set(middleware_ctx, browser_metafile0)
	equal(browser__output__relative_path$_(middleware_ctx)._, undefined)
	equal(browser__output__relative_path_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server_metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'], {
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
	equal(server__output_(middleware_ctx), server_metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'])
	equal(browser__output__relative_path$_(middleware_ctx)._, 'dist/browser--dev/index.browser-BRS0BRS0.js')
	equal(browser__output__relative_path$_(middleware_ctx)._, 'dist/browser--dev/index.browser-BRS0BRS0.js')
	// @ts-expect-error TS2345
	throws(()=>browser__output__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>browser__output__relative_path_(ctx_()))
})
test('browser__script', ()=>{
	const middleware_ctx = middleware_ctx_()
	equal(browser__script$_(middleware_ctx)._, undefined)
	equal(browser__script_(middleware_ctx), undefined)
	server__metafile__set(middleware_ctx, server_metafile0)
	equal(browser__script$_(middleware_ctx)._, undefined)
	equal(browser__script_(middleware_ctx), undefined)
	browser__metafile__set(middleware_ctx, browser_metafile0)
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
