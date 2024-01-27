import { be_, type Ctx } from 'ctx-core/be'
import type { Equal, Expect } from 'ctx-core/test'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { app_ctx, middleware_ctx__new, request_ctx__new } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('app_ctx', ()=>{
	const ns_app_ = be_(()=>
		'app',
	{ ns: 'app' })
	equal(ns_app_(app_ctx), 'app')
})
test('app_ctx|ns', ()=>{
	type test_app_ctx = Expect<Equal<typeof app_ctx, Ctx<'app'>>>
	equal({} as test_app_ctx, {})
})
test('middleware_ctx__new', ()=>{
	const middleware_ctx = middleware_ctx__new()
	const ns_middleware_ = be_(()=>
		'middleware',
	{ ns: 'middleware' })
	const ns_app_ = be_(()=>
		'app',
	{ ns: 'app' })
	equal(ns_middleware_(middleware_ctx), 'middleware')
	equal(ns_app_(middleware_ctx), 'app')
})
test('middleware_ctx|ns', ()=>{
	const middleware_ctx = middleware_ctx__new()
	type test_middleware_ctx = Expect<Equal<typeof middleware_ctx, Ctx<'app'|'middleware'>>>
	equal({} as test_middleware_ctx, {})
})
test('request_ctx__new', ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	const ns_blank_ = be_(()=>
		'',
	{ ns: '' })
	const ns_route_ = be_(()=>
		'request',
	{ ns: 'request' })
	const ns_middleware_ = be_(()=>
		'middleware',
	{ ns: 'middleware' })
	const ns_app_ = be_(()=>
		'app',
	{ ns: 'app' })
	equal(ns_blank_(request_ctx), '')
	equal(ns_route_(request_ctx), 'request')
	equal(ns_middleware_(request_ctx), 'middleware')
	equal(ns_app_(request_ctx), 'app')
})
test('request_ctx|ns', ()=>{
	const request_ctx = request_ctx__new(middleware_ctx__new())
	type test_request_ctx = Expect<Equal<typeof request_ctx, Ctx<''|'app'|'middleware'|'request'>>>
	equal({} as test_request_ctx, {})
})
test.run()
