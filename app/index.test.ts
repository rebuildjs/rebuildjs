import { type Ctx, ctx_ } from 'ctx-core/be'
import type { Equal, Expect } from 'ctx-core/test'
import { resolve } from 'node:path'
import { test } from 'uvu'
import { equal, not, throws } from 'uvu/assert'
import { app_ctx } from '../ctx/index.js'
import {
	app__relative_path$_,
	app__relative_path_,
	app_path$_,
	app_path_,
	app_path__set,
	browser__relative_path$_,
	browser__relative_path_,
	browser_path$_,
	browser_path_,
	cwd$_,
	cwd_,
	cwd__set,
	dist__relative_path$_,
	dist__relative_path_,
	dist_path$_,
	dist_path_,
	dist_path__set,
	is_prod$_,
	is_prod_,
	is_prod__set,
	port$_,
	port_,
	port__set,
	public_path$_,
	public_path_,
	public_path__set,
	server__relative_path$_,
	server__relative_path_,
	server_path$_,
	server_path_,
	src__relative_path$_,
	src__relative_path_,
	src_path$_,
	src_path_,
	src_path__set
} from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('app_ctx', ()=>{
	/* eslint-disable @typescript-eslint/ban-ts-comment */
	/* eslint-disable @typescript-eslint/no-unused-vars */
	// @ts-ignore TS6196
	type test_app_ctx = Expect<Equal<typeof app_ctx, Ctx<'app'>>>
	/* eslint-enable @typescript-eslint/no-unused-vars */
	/* eslint-enable @typescript-eslint/ban-ts-comment */
})
test('port', ()=>{
	equal(process.env.PORT, undefined)
	equal(port$_(app_ctx)._, 3000)
	equal(port_(app_ctx), 3000)
	port__set(app_ctx, 4000)
	equal(port_(app_ctx), 4000)
	// @ts-expect-error TS2345
	throws(()=>port$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>port_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>port__set(ctx_(), 5000))
})
test('cwd', ()=>{
	equal(cwd$_(app_ctx)._, resolve('.'))
	equal(cwd_(app_ctx), resolve('.'))
	cwd__set(app_ctx, '/test/path')
	equal(cwd$_(app_ctx)._, resolve('/test/path'))
	equal(cwd_(app_ctx), resolve('/test/path'))
	// @ts-expect-error TS2345
	throws(()=>cwd$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>cwd_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>cwd__set(ctx_(), '/another/path'))
})
test('is_prod', ()=>{
	not.equal(process.env.NODE_ENV, 'production')
	equal(is_prod$_(app_ctx)._, false)
	equal(is_prod_(app_ctx), false)
	is_prod__set(app_ctx, true)
	equal(is_prod$_(app_ctx)._, true)
	equal(is_prod_(app_ctx), true)
	// @ts-expect-error TS2345
	throws(()=>is_prod$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>is_prod_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>is_prod__set(ctx_(), false))
})
test('public_path', ()=>{
	equal(public_path$_(app_ctx)._, resolve('./public'))
	equal(public_path_(app_ctx), resolve('./public'))
	cwd__set(app_ctx, '/test/cwd')
	equal(public_path$_(app_ctx)._, '/test/cwd/public')
	equal(public_path_(app_ctx), '/test/cwd/public')
	public_path__set(app_ctx, '/test/cwd/public2')
	equal(public_path$_(app_ctx)._, '/test/cwd/public2')
	equal(public_path_(app_ctx), '/test/cwd/public2')
	cwd__set(app_ctx, '/test/cwd2')
	equal(public_path$_(app_ctx)._, '/test/cwd/public2')
	equal(public_path_(app_ctx), '/test/cwd/public2')
	// @ts-expect-error TS2345
	throws(()=>public_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>public_path_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>public_path__set(ctx_(), '/another/path/public'))
})
test('dist_path', ()=>{
	equal(dist_path$_(app_ctx)._, resolve('./dist'))
	equal(dist_path_(app_ctx), resolve('./dist'))
	cwd__set(app_ctx, '/test/cwd')
	equal(dist_path$_(app_ctx)._, '/test/cwd/dist')
	equal(dist_path_(app_ctx), '/test/cwd/dist')
	dist_path__set(app_ctx, '/test/cwd/dist2')
	equal(dist_path$_(app_ctx)._, '/test/cwd/dist2')
	equal(dist_path_(app_ctx), '/test/cwd/dist2')
	cwd__set(app_ctx, '/test/cwd2')
	equal(dist_path$_(app_ctx)._, '/test/cwd/dist2')
	equal(dist_path_(app_ctx), '/test/cwd/dist2')
	// @ts-expect-error TS2345
	throws(()=>dist_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>dist_path_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>dist_path__set(ctx_(), '/another/path/dist'))
})
test('dist__relative_path', ()=>{
	equal(dist__relative_path$_(app_ctx)._, 'dist')
	equal(dist__relative_path_(app_ctx), 'dist')
	cwd__set(app_ctx, '/test/cwd')
	equal(dist__relative_path$_(app_ctx)._, 'dist')
	equal(dist__relative_path_(app_ctx), 'dist')
	dist_path__set(app_ctx, '/test/cwd/dist2')
	equal(dist__relative_path$_(app_ctx)._, 'dist2')
	equal(dist__relative_path_(app_ctx), 'dist2')
	// @ts-expect-error TS2345
	throws(()=>dist__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>dist__relative_path_(ctx_()))
})
test('src_path', ()=>{
	equal(src_path$_(app_ctx)._, resolve('./src'))
	equal(src_path_(app_ctx), resolve('./src'))
	cwd__set(app_ctx, '/test/cwd')
	equal(src_path$_(app_ctx)._, '/test/cwd/src')
	equal(src_path_(app_ctx), '/test/cwd/src')
	src_path__set(app_ctx, '/test/cwd/src2')
	equal(src_path$_(app_ctx)._, '/test/cwd/src2')
	equal(src_path_(app_ctx), '/test/cwd/src2')
	cwd__set(app_ctx, '/test/cwd2')
	equal(src_path$_(app_ctx)._, '/test/cwd/src2')
	equal(src_path_(app_ctx), '/test/cwd/src2')
	// @ts-expect-error TS2345
	throws(()=>src_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>src_path_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>src_path__set(ctx_(), '/another/path/src'))
})
test('src__relative_path', ()=>{
	equal(src__relative_path$_(app_ctx)._, 'src')
	equal(src__relative_path_(app_ctx), 'src')
	cwd__set(app_ctx, '/test/cwd')
	equal(src__relative_path$_(app_ctx)._, 'src')
	equal(src__relative_path_(app_ctx), 'src')
	src_path__set(app_ctx, '/test/cwd/src2')
	equal(src__relative_path$_(app_ctx)._, 'src2')
	equal(src__relative_path_(app_ctx), 'src2')
	// @ts-expect-error TS2345
	throws(()=>src__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>src__relative_path_(ctx_()))
})
test('app_path', ()=>{
	equal(app_path$_(app_ctx)._, resolve('./src/app'))
	equal(app_path_(app_ctx), resolve('./src/app'))
	cwd__set(app_ctx, '/test/cwd')
	equal(app_path$_(app_ctx)._, '/test/cwd/src/app')
	equal(app_path_(app_ctx), '/test/cwd/src/app')
	src_path__set(app_ctx, '/test/cwd/src2')
	app_path__set(app_ctx, '/test/cwd/src2/app2')
	equal(app_path$_(app_ctx)._, '/test/cwd/src2/app2')
	equal(app_path_(app_ctx), '/test/cwd/src2/app2')
	cwd__set(app_ctx, '/test/cwd2')
	equal(app_path$_(app_ctx)._, '/test/cwd/src2/app2')
	equal(app_path_(app_ctx), '/test/cwd/src2/app2')
	src_path__set(app_ctx, '/test/cwd/src3')
	equal(app_path$_(app_ctx)._, '/test/cwd/src2/app2')
	equal(app_path_(app_ctx), '/test/cwd/src2/app2')
	// @ts-expect-error TS2345
	throws(()=>app_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>app_path_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>app_path__set(ctx_(), '/another/path/src/app'))
})
test('app__relative_path', ()=>{
	equal(app__relative_path$_(app_ctx)._, 'src/app')
	equal(app__relative_path_(app_ctx), 'src/app')
	cwd__set(app_ctx, '/test/cwd')
	equal(app__relative_path$_(app_ctx)._, 'src/app')
	equal(app__relative_path_(app_ctx), 'src/app')
	src_path__set(app_ctx, '/test/cwd/src2')
	equal(app__relative_path$_(app_ctx)._, 'src2/app')
	equal(app__relative_path_(app_ctx), 'src2/app')
	app_path__set(app_ctx, '/test/cwd/src2/app2')
	equal(app__relative_path$_(app_ctx)._, 'src2/app2')
	equal(app__relative_path_(app_ctx), 'src2/app2')
	cwd__set(app_ctx, '/test/cwd2')
	equal(app__relative_path$_(app_ctx)._, '../cwd/src2/app2')
	equal(app__relative_path_(app_ctx), '../cwd/src2/app2')
	src_path__set(app_ctx, '/test/cwd2/src2')
	equal(app__relative_path$_(app_ctx)._, '../cwd/src2/app2')
	equal(app__relative_path_(app_ctx), '../cwd/src2/app2')
	// @ts-expect-error TS2345
	throws(()=>app__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>app__relative_path_(ctx_()))
})
test('browser__relative_path', ()=>{
	is_prod__set(app_ctx, false)
	equal(browser__relative_path$_(app_ctx)._, 'dist/browser--dev')
	equal(browser__relative_path_(app_ctx), 'dist/browser--dev')
	is_prod__set(app_ctx, true)
	equal(browser__relative_path$_(app_ctx)._, 'dist/browser')
	equal(browser__relative_path_(app_ctx), 'dist/browser')
	cwd__set(app_ctx, '/test/cwd')
	equal(browser__relative_path$_(app_ctx)._, 'dist/browser')
	equal(browser__relative_path_(app_ctx), 'dist/browser')
	is_prod__set(app_ctx, false)
	equal(browser__relative_path$_(app_ctx)._, 'dist/browser--dev')
	equal(browser__relative_path_(app_ctx), 'dist/browser--dev')
	dist_path__set(app_ctx, '/test/cwd/dist2')
	equal(browser__relative_path$_(app_ctx)._, 'dist2/browser--dev')
	equal(browser__relative_path_(app_ctx), 'dist2/browser--dev')
	is_prod__set(app_ctx, true)
	equal(browser__relative_path$_(app_ctx)._, 'dist2/browser')
	equal(browser__relative_path_(app_ctx), 'dist2/browser')
	// @ts-expect-error TS2345
	throws(()=>browser__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>browser__relative_path_(ctx_()))
})
test('browser_path', ()=>{
	is_prod__set(app_ctx, false)
	equal(browser_path$_(app_ctx)._, resolve('./dist/browser--dev'))
	equal(browser_path_(app_ctx), resolve('./dist/browser--dev'))
	is_prod__set(app_ctx, true)
	equal(browser_path$_(app_ctx)._, resolve('./dist/browser'))
	equal(browser_path_(app_ctx), resolve('./dist/browser'))
	cwd__set(app_ctx, '/test/cwd')
	equal(browser_path$_(app_ctx)._, '/test/cwd/dist/browser')
	equal(browser_path_(app_ctx), '/test/cwd/dist/browser')
	is_prod__set(app_ctx, false)
	equal(browser_path$_(app_ctx)._, '/test/cwd/dist/browser--dev')
	equal(browser_path_(app_ctx), '/test/cwd/dist/browser--dev')
	dist_path__set(app_ctx, '/test/cwd/dist2')
	equal(browser_path$_(app_ctx)._, '/test/cwd/dist2/browser--dev')
	equal(browser_path_(app_ctx), '/test/cwd/dist2/browser--dev')
	is_prod__set(app_ctx, true)
	equal(browser_path$_(app_ctx)._, '/test/cwd/dist2/browser')
	equal(browser_path_(app_ctx), '/test/cwd/dist2/browser')
	// @ts-expect-error TS2345
	throws(()=>browser_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>browser_path_(ctx_()))
})
test('server__relative_path', ()=>{
	is_prod__set(app_ctx, false)
	equal(server__relative_path$_(app_ctx)._, 'dist/server--dev')
	equal(server__relative_path_(app_ctx), 'dist/server--dev')
	is_prod__set(app_ctx, true)
	equal(server__relative_path$_(app_ctx)._, 'dist/server')
	equal(server__relative_path_(app_ctx), 'dist/server')
	cwd__set(app_ctx, '/test/cwd')
	equal(server__relative_path$_(app_ctx)._, 'dist/server')
	equal(server__relative_path_(app_ctx), 'dist/server')
	is_prod__set(app_ctx, false)
	equal(server__relative_path$_(app_ctx)._, 'dist/server--dev')
	equal(server__relative_path_(app_ctx), 'dist/server--dev')
	dist_path__set(app_ctx, '/test/cwd/dist2')
	equal(server__relative_path$_(app_ctx)._, 'dist2/server--dev')
	equal(server__relative_path_(app_ctx), 'dist2/server--dev')
	is_prod__set(app_ctx, true)
	equal(server__relative_path$_(app_ctx)._, 'dist2/server')
	equal(server__relative_path_(app_ctx), 'dist2/server')
	// @ts-expect-error TS2345
	throws(()=>server__relative_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server__relative_path_(ctx_()))
})
test('server_path', ()=>{
	is_prod__set(app_ctx, false)
	equal(server_path$_(app_ctx)._, resolve('./dist/server--dev'))
	equal(server_path_(app_ctx), resolve('./dist/server--dev'))
	is_prod__set(app_ctx, true)
	equal(server_path$_(app_ctx)._, resolve('./dist/server'))
	equal(server_path_(app_ctx), resolve('./dist/server'))
	cwd__set(app_ctx, '/test/cwd')
	equal(server_path$_(app_ctx)._, '/test/cwd/dist/server')
	equal(server_path_(app_ctx), '/test/cwd/dist/server')
	is_prod__set(app_ctx, false)
	equal(server_path$_(app_ctx)._, '/test/cwd/dist/server--dev')
	equal(server_path_(app_ctx), '/test/cwd/dist/server--dev')
	dist_path__set(app_ctx, '/test/cwd/dist2')
	equal(server_path$_(app_ctx)._, '/test/cwd/dist2/server--dev')
	equal(server_path_(app_ctx), '/test/cwd/dist2/server--dev')
	is_prod__set(app_ctx, true)
	equal(server_path$_(app_ctx)._, '/test/cwd/dist2/server')
	equal(server_path_(app_ctx), '/test/cwd/dist2/server')
	// @ts-expect-error TS2345
	throws(()=>server_path$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>server_path_(ctx_()))
})
test.run()
