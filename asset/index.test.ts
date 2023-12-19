import { type Ctx, ctx_, ns_ctx_ } from 'ctx-core/be'
import type { Equal, Expect } from 'ctx-core/test'
import { test } from 'uvu'
import { equal, throws } from 'uvu/assert'
import { app_ctx, middleware_ctx_, route_ctx_ } from '../ctx/index.js'
import { asset_path_, asset_path_a_, assets$_, assets_, assets__assign, assets__new, assets__set } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('asset_path_', async ()=>{
	equal(await asset_path_(mod_('./path.png')), '/path.png')
})
test('asset_path_a_', async ()=>{
	equal(await asset_path_a_(
		mod_('./path0.png'),
		mod_('./path1.png'),
		mod_('./path2.png'),
		mod_('./path3.png'),
	), [
		'/path0.png',
		'/path1.png',
		'/path2.png',
		'/path3.png',
	])
})
test('assets', ()=>{
	const route_ctx = route_ctx_(middleware_ctx_())
	/* eslint-disable @typescript-eslint/no-unused-vars */
	type test_ctx = Expect<Equal<typeof route_ctx, Ctx<'app'|'middleware'|'route'>>>
	/* eslint-enable @typescript-eslint/no-unused-vars */
	const assets = assets__new({ css_a: ['/foo.css'], script_a: ['/foo.js'] })
	assets__set(route_ctx, assets)
	equal(assets_(route_ctx), assets)
	equal(assets$_(route_ctx)(), assets)
	/* eslint-disable @typescript-eslint/no-unused-vars */
	// @ts-expect-error TS2345
	type test_assets$_ = Expect<Equal<typeof assets$_, number>>
	/* eslint-enable @typescript-eslint/no-unused-vars */
	// @ts-expect-error TS2345
	throws(()=>assets$_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets$_(middleware_ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets_(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets_(middleware_ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets__set(ctx_(), assets))
	// @ts-expect-error TS2345
	throws(()=>assets__set(middleware_ctx_(), assets))
})
test('assets__assign', async ()=>{
	assets__assign(route_ctx_(middleware_ctx_()), assets__new())
	// @ts-expect-error TS2345
	throws(()=>assets__assign(ctx_()))
	// @ts-expect-error TS2345
	throws(()=>assets__assign(ns_ctx_(ctx_())))
	// @ts-expect-error TS2345
	throws(()=>assets__assign(middleware_ctx_()))
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
async function mod_(out_path:string) {
	return { default: out_path }
}
