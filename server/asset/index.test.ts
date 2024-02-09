import { type ctx_T, ctx_, ns_ctx_ } from 'ctx-core/be'
import type { Equal, Expect } from 'ctx-core/test'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { browser__metafile0, server__metafile0 } from '../../_fixtures/metafiles.js'
import { app_ctx, middleware_ctx__new, request_ctx__new } from '../ctx/index.js'
import { browser__metafile__set } from '../rebuildjs_browser/index.js'
import { server__metafile__set, server__output__relative_path__set } from '../rebuildjs_server/index.js'
import { assets$_, assets_, assets__assign, assets__new, assets__set } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('assets', ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	equal(assets$_(request_ctx)(), {
		css_a: [],
		script_a: [],
	})
	server__metafile__set(request_ctx, server__metafile0)
	equal(assets$_(request_ctx)(), {
		css_a: [],
		script_a: [],
	})
	server__output__relative_path__set(request_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css'],
		script_a: [],
	})
	browser__metafile__set(request_ctx, browser__metafile0)
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css', '/index.browser-BRS0BRS0.css'],
		script_a: ['/index.browser-BRS0BRS0.js'],
	})
	const test_assets = assets__new(
		{ css_a: ['/foo.css'], script_a: ['/foo.js'] },
		undefined)
	assets__set(request_ctx, test_assets)
	equal(assets$_(request_ctx)(), test_assets)
	equal(assets_(request_ctx), test_assets)
	// @ts-expect-error TS2345
	throws(()=>assets$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets$_(middleware_ctx__new()))
	// @ts-expect-error TS2345
	throws(()=>assets_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets_(middleware_ctx__new()))
	// @ts-expect-error TS2345
	throws(()=>assets__set(ctx_(), test_assets))
	// @ts-expect-error TS2345
	throws(()=>assets__set(middleware_ctx__new(), test_assets))
})
test('assets|types', ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	/* eslint-disable @typescript-eslint/ban-ts-comment */
	/* eslint-disable @typescript-eslint/no-unused-vars */
	// @ts-ignore TS6196
	type test_ctx = Expect<Equal<typeof request_ctx, ctx_T<''|'app'|'middleware'|'request'>>>
	// @ts-expect-error TS2345
	type test_assets$_ = Expect<Equal<typeof assets$_, number>>
	/* eslint-enable @typescript-eslint/no-unused-vars */
	/* eslint-enable @typescript-eslint/ban-ts-comment */
})
test('assets__assign', async ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	server__metafile__set(request_ctx, server__metafile0)
	browser__metafile__set(request_ctx, browser__metafile0)
	server__output__relative_path__set(request_ctx, 'dist/server--dev/index.server-SVR0SVR0.js')
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css', '/index.browser-BRS0BRS0.css'],
		script_a: ['/index.browser-BRS0BRS0.js'],
	})
	assets__assign(request_ctx, assets__new())
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css', '/index.browser-BRS0BRS0.css'],
		script_a: ['/index.browser-BRS0BRS0.js'],
	})
	assets__assign(request_ctx, {
		css_a: ['/test0.css']
	})
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css', '/index.browser-BRS0BRS0.css', '/test0.css'],
		script_a: ['/index.browser-BRS0BRS0.js'],
	})
	assets__assign(request_ctx, {
		script_a: ['/test0.js']
	})
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css', '/index.browser-BRS0BRS0.css', '/test0.css'],
		script_a: ['/index.browser-BRS0BRS0.js', '/test0.js'],
	})
	assets__assign(request_ctx, assets__new({
		css_a: ['/test1.css'],
		script_a: ['/test1.js'],
	}))
	equal(assets_(request_ctx), {
		css_a: ['/index.server-SVR0SVR0.css', '/index.browser-BRS0BRS0.css', '/test0.css', '/test1.css'],
		script_a: ['/index.browser-BRS0BRS0.js', '/test0.js', '/test1.js'],
	})
	// @ts-expect-error TS2345
	throws(()=>assets__assign(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets__assign(ns_ctx_(ctx_())))
	// @ts-expect-error TS2345
	throws(()=>assets__assign(middleware_ctx__new()))
	// @ts-expect-error TS2345
	throws(()=>assets__assign(app_ctx, assets__new()))
})
test('assets__new', async ()=>{
	equal(assets__new(
		{ script_a: ['/foo.js'] },
		{ css_a: ['/foo.css'] },
		{ script_a: ['/bar.js'], css_a: ['/bar.css'] },
		{},
		{ script_a: [], css_a: [] },
		{ script_a: undefined, css_a: undefined }),
	{
		css_a: ['/foo.css', '/bar.css'],
		script_a: ['/foo.js', '/bar.js']
	})
})
test.run()
