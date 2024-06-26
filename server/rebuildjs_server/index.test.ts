import { ctx_ } from 'ctx-core/be'
import { deep_equal } from 'ctx-core/deep_equal'
import * as rmemo from 'ctx-core/rmemo'
import { rmemo__wait } from 'ctx-core/rmemo'
import esmock from 'esmock'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { server__metafile0, server__metafile1, server__metafile2 } from '../../_fixtures/metafiles.js'
import { cwd__set, dist_path_, dist_path__set, is_prod__set, server_path_ } from '../app/index.js'
import { app_ctx, middleware_ctx__new } from '../ctx/index.js'
import {
	server__css$_,
	server__css_,
	server__cssBundle$_,
	server__cssBundle_,
	server__cssBundle__relative_path$_,
	server__cssBundle__relative_path_,
	server__metafile$_,
	server__metafile_,
	server__metafile__set,
	server__metafile_path$_,
	server__metafile_path_,
	server__output$_,
	server__output_,
	server__output__relative_path$_,
	server__output__relative_path_,
	server__output__relative_path__set,
	server__output__relative_path_M_middleware_ctx$_,
	server__output__relative_path_M_middleware_ctx_
} from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('server__metafile_path', ()=>{
	dist_path__set(app_ctx, '/test/dist')
	is_prod__set(app_ctx, true)
	equal(server__metafile_path$_(app_ctx)(), '/test/dist/server/metafile.json')
	equal(server__metafile_path_(app_ctx), '/test/dist/server/metafile.json')
	is_prod__set(app_ctx, false)
	equal(server__metafile_path$_(app_ctx)(), '/test/dist/server--dev/metafile.json')
	equal(server__metafile_path_(app_ctx), '/test/dist/server--dev/metafile.json')
	dist_path__set(app_ctx, '/test/dist2')
	equal(server__metafile_path$_(app_ctx)(), '/test/dist2/server--dev/metafile.json')
	equal(server__metafile_path_(app_ctx), '/test/dist2/server--dev/metafile.json')
	is_prod__set(app_ctx, true)
	equal(server__metafile_path$_(app_ctx)(), '/test/dist2/server/metafile.json')
	equal(server__metafile_path_(app_ctx), '/test/dist2/server/metafile.json')
	// @ts-expect-error TS2345
	throws(()=>server__metafile_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server__metafile_path_(ctx_()))
})
test('server__metafile', async ()=>{
	let readFile_path:string|undefined = undefined
	let _server__metafile$_:typeof server__metafile$_
	let _server__metafile_:typeof server__metafile_
	let _server__metafile__set:typeof server__metafile__set
	{
		({
			server__metafile$_: _server__metafile$_,
			server__metafile_: _server__metafile_,
			server__metafile__set: _server__metafile__set,
		} = await esmock('./index.js', {}, {
			'ctx-core/rmemo': rmemo,
			'node:fs/promises': {
				access: async ()=>{},
				readFile: async (path:string)=>{
					readFile_path = path
					switch (path) {
						case '/cwd/dist0/server/metafile.json':
							return Buffer.from(JSON.stringify(server__metafile0), 'utf-8')
						case '/cwd/dist1/server/metafile.json':
							return Buffer.from(JSON.stringify(server__metafile1), 'utf-8')
					}
					return undefined
				}
			}
		}))
	}
	equal(_server__metafile$_(app_ctx)(), undefined)
	equal(_server__metafile_(app_ctx), undefined)
	is_prod__set(app_ctx, true)
	dist_path__set(app_ctx, '/cwd/dist0')
	equal(_server__metafile$_(app_ctx)(), undefined)
	equal(_server__metafile_(app_ctx), undefined)
	await rmemo__wait(
		_server__metafile$_(app_ctx),
		m=>m,
		100)
	equal(_server__metafile$_(app_ctx)(), server__metafile0)
	equal(_server__metafile_(app_ctx), server__metafile0)
	equal(readFile_path, '/cwd/dist0/server/metafile.json')
	equal(_server__metafile$_(app_ctx)(), server__metafile0)
	equal(_server__metafile_(app_ctx), server__metafile0)
	dist_path__set(app_ctx, '/cwd/dist1')
	await rmemo__wait(
		_server__metafile$_(app_ctx),
		m=>deep_equal(m, server__metafile1),
		100)
	equal(_server__metafile$_(app_ctx)(), server__metafile1)
	equal(_server__metafile_(app_ctx), server__metafile1)
	equal(readFile_path, '/cwd/dist1/server/metafile.json')
	dist_path__set(app_ctx, '/cwd/dist0')
	await rmemo__wait(
		_server__metafile$_(app_ctx),
		m=>deep_equal(m, server__metafile0),
		100)
	equal(_server__metafile$_(app_ctx)(), server__metafile0)
	equal(_server__metafile_(app_ctx), server__metafile0)
	equal(readFile_path, '/cwd/dist0/server/metafile.json')
	_server__metafile__set(app_ctx, server__metafile2)
	equal(_server__metafile$_(app_ctx)(), server__metafile2)
	equal(_server__metafile_(app_ctx), server__metafile2)
	dist_path__set(app_ctx, '/cwd/dist1')
	let error_msg:string|undefined = undefined
	try {
		await rmemo__wait(
			_server__metafile$_(app_ctx),
			m=>deep_equal(m, server__metafile1),
			100)
	} catch (e) {
		error_msg = (e as Error).message
	}
	equal(_server__metafile$_(app_ctx)(), server__metafile2)
	equal(_server__metafile_(app_ctx), server__metafile2)
	equal(error_msg, `Timeout 100ms`)
	// @ts-expect-error TS2345
	throws(()=>_server__metafile$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>_server__metafile_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>_server__metafile__set(ctx_(), server__metafile0))
})
test('server__output__relative_path_M_middleware_ctx', ()=>{
	equal(server__output__relative_path_M_middleware_ctx$_(app_ctx)(), undefined)
	equal(server__output__relative_path_M_middleware_ctx_(app_ctx), undefined)
	server__metafile__set(app_ctx, server__metafile0)
	equal(
		server__output__relative_path_M_middleware_ctx$_(app_ctx)()
			.get('dist/server--dev/index.server-SVR0SVR0.js')
			?.is_ctx,
		true)
	equal(
		server__output__relative_path_(
			server__output__relative_path_M_middleware_ctx$_(app_ctx)()
				.get('dist/server--dev/index.server-SVR0SVR0.js')!),
		'dist/server--dev/index.server-SVR0SVR0.js')
	equal(
		server__output__relative_path_M_middleware_ctx$_(app_ctx)()
			.get('dist/server--dev/index.server-SVR0SVR0.js.map')
			?.is_ctx,
		undefined)
	equal(
		server__output__relative_path_M_middleware_ctx_(app_ctx)
			.get('dist/server--dev/index.server-SVR0SVR0.js')
			?.is_ctx,
		true)
	equal(
		server__output__relative_path_(
			server__output__relative_path_M_middleware_ctx_(app_ctx)
				.get('dist/server--dev/index.server-SVR0SVR0.js')!),
		'dist/server--dev/index.server-SVR0SVR0.js')
	equal(
		server__output__relative_path_M_middleware_ctx_(app_ctx)
			.get('dist/server--dev/index.server-SVR0SVR0.js.map')
			?.is_ctx,
		undefined)
	// @ts-expect-error TS2345
	throws(()=>server__output__relative_path_M_middleware_ctx$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server__output__relative_path_M_middleware_ctx_(ctx_()))
})
test('server__output__relative_path', ()=>{
	const middleware_ctx = middleware_ctx__new()
	equal(server__output__relative_path$_(middleware_ctx)(), undefined)
	equal(server__output__relative_path_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server__output__relative_path$_(middleware_ctx)(), 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server__output__relative_path_(middleware_ctx), 'dist/server--dev/index.server-SVR0SVR0.js')
	// @ts-expect-error TS2345
	throws(()=>server__output__relative_path$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>server__output__relative_path_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>server__output__relative_path__set(app_ctx, 'dist/server--dev/index.HASH.js'))
})
test('server__output', ()=>{
	const middleware_ctx = middleware_ctx__new()
	is_prod__set(app_ctx, false)
	equal(server__output$_(middleware_ctx)(), undefined)
	equal(server__output_(middleware_ctx), undefined)
	server__metafile__set(app_ctx, server__metafile0)
	equal(server__output$_(middleware_ctx)(), undefined)
	equal(server__output_(middleware_ctx), undefined)
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
	equal(server__output$_(middleware_ctx)(), server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'])
	equal(server__output_(middleware_ctx), server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'])
	// @ts-expect-error TS2345
	throws(()=>server__output$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>server__output_(app_ctx))
})
test('server__cssBundle__relative_path', ()=>{
	const middleware_ctx = middleware_ctx__new()
	is_prod__set(app_ctx, false)
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), undefined)
	equal(server__cssBundle__relative_path_(middleware_ctx), undefined)
	server__metafile__set(app_ctx, server__metafile0)
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), undefined)
	equal(server__cssBundle__relative_path_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'].cssBundle,
		'dist/server--dev/index.server-SVR0SVR0.css')
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), 'dist/server--dev/index.server-SVR0SVR0.css')
	equal(server__cssBundle__relative_path_(middleware_ctx), 'dist/server--dev/index.server-SVR0SVR0.css')
	server__metafile__set(app_ctx, server__metafile1)
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), undefined)
	equal(server__cssBundle__relative_path_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR1SVR1.js')
	equal(server__metafile1.outputs['dist/server--dev/index.server-SVR1SVR1.js'].cssBundle,
		'dist/server--dev/index.server-SVR1SVR1.css')
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), 'dist/server--dev/index.server-SVR1SVR1.css')
	equal(server__cssBundle__relative_path_(middleware_ctx), 'dist/server--dev/index.server-SVR1SVR1.css')
	server__metafile__set(app_ctx, server__metafile2)
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), undefined)
	equal(server__cssBundle__relative_path_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR2SVR2.js')
	equal(server__metafile2.outputs['dist/server--dev/index.server-SVR2SVR2.js'].cssBundle, undefined)
	equal(server__cssBundle__relative_path$_(middleware_ctx)(), undefined)
	equal(server__cssBundle__relative_path_(middleware_ctx), undefined)
	// @ts-expect-error TS2345
	throws(()=>server__cssBundle__relative_path$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>server__cssBundle__relative_path_(app_ctx))
})
test('server__cssBundle', ()=>{
	const middleware_ctx = middleware_ctx__new()
	is_prod__set(app_ctx, false)
	cwd__set(app_ctx, '/cwd')
	equal(dist_path_(app_ctx), '/cwd/dist')
	equal(server_path_(app_ctx), '/cwd/dist/server--dev')
	equal(server__cssBundle$_(middleware_ctx)(), undefined)
	equal(server__cssBundle_(middleware_ctx), undefined)
	server__metafile__set(app_ctx, server__metafile0)
	equal(server__cssBundle$_(middleware_ctx)(), undefined)
	equal(server__cssBundle_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'].cssBundle,
		'dist/server--dev/index.server-SVR0SVR0.css')
	equal(server__cssBundle$_(middleware_ctx)(), '/cwd/dist/server--dev/index.server-SVR0SVR0.css')
	equal(server__cssBundle_(middleware_ctx), '/cwd/dist/server--dev/index.server-SVR0SVR0.css')
	server__metafile__set(app_ctx, server__metafile1)
	equal(server__cssBundle$_(middleware_ctx)(), undefined)
	equal(server__cssBundle_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR1SVR1.js')
	equal(server__metafile1.outputs['dist/server--dev/index.server-SVR1SVR1.js'].cssBundle,
		'dist/server--dev/index.server-SVR1SVR1.css')
	equal(server__cssBundle$_(middleware_ctx)(), '/cwd/dist/server--dev/index.server-SVR1SVR1.css')
	equal(server__cssBundle_(middleware_ctx), '/cwd/dist/server--dev/index.server-SVR1SVR1.css')
	server__metafile__set(app_ctx, server__metafile2)
	equal(server__cssBundle$_(middleware_ctx)(), undefined)
	equal(server__cssBundle_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR2SVR2.js')
	equal(server__metafile2.outputs['dist/server--dev/index.server-SVR2SVR2.js'].cssBundle, undefined)
	equal(server__cssBundle$_(middleware_ctx)(), undefined)
	equal(server__cssBundle_(middleware_ctx), undefined)
	// @ts-expect-error TS2345
	throws(()=>server__cssBundle$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>server__cssBundle_(app_ctx))
})
test('server__css', ()=>{
	const middleware_ctx = middleware_ctx__new()
	is_prod__set(app_ctx, false)
	cwd__set(app_ctx, '/cwd')
	equal(dist_path_(app_ctx), '/cwd/dist')
	equal(server_path_(app_ctx), '/cwd/dist/server--dev')
	equal(server__css$_(middleware_ctx)(), undefined)
	equal(server__css_(middleware_ctx), undefined)
	server__metafile__set(app_ctx, server__metafile0)
	equal(server__css$_(middleware_ctx)(), undefined)
	equal(server__css_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(server__metafile0.outputs['dist/server--dev/index.server-SVR0SVR0.js'].cssBundle,
		'dist/server--dev/index.server-SVR0SVR0.css')
	equal(server__css$_(middleware_ctx)(), '/index.server-SVR0SVR0.css')
	equal(server__css_(middleware_ctx), '/index.server-SVR0SVR0.css')
	server__metafile__set(app_ctx, server__metafile1)
	equal(server__css$_(middleware_ctx)(), undefined)
	equal(server__css_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR1SVR1.js')
	equal(server__metafile1.outputs['dist/server--dev/index.server-SVR1SVR1.js'].cssBundle,
		'dist/server--dev/index.server-SVR1SVR1.css')
	equal(server__css$_(middleware_ctx)(), '/index.server-SVR1SVR1.css')
	equal(server__css_(middleware_ctx), '/index.server-SVR1SVR1.css')
	server__metafile__set(app_ctx, server__metafile2)
	equal(server__css$_(middleware_ctx)(), undefined)
	equal(server__css_(middleware_ctx), undefined)
	server__output__relative_path__set(middleware_ctx, 'dist/server--dev/index.server-SVR2SVR2.js')
	equal(server__metafile2.outputs['dist/server--dev/index.server-SVR2SVR2.js'].cssBundle, undefined)
	equal(server__css$_(middleware_ctx)(), undefined)
	equal(server__css_(middleware_ctx), undefined)
	// @ts-expect-error TS2345
	throws(()=>server__css$_(app_ctx))
	// @ts-expect-error TS2345
	throws(()=>server__css_(app_ctx))
})
test.run()
