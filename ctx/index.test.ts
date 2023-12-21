import { Ctx } from 'ctx-core/be'
import { Equal, Expect } from 'ctx-core/test'
import { test } from 'uvu'
import { app_ctx, middleware_ctx_, route_ctx_ } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('app_ctx', ()=>{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	type test_app_ctx = Expect<Equal<typeof app_ctx, Ctx<'app'>>>
	/* eslint-enable @typescript-eslint/no-unused-vars */
})
test('middleware_ctx_', ()=>{
	const middleware_ctx = middleware_ctx_()
	/* eslint-disable @typescript-eslint/no-unused-vars */
	type test_middleware_ctx = Expect<Equal<typeof middleware_ctx, Ctx<'app'|'middleware'>>>
	/* eslint-enable @typescript-eslint/no-unused-vars */
})
test('route_ctx_', ()=>{
	const route_ctx = route_ctx_(middleware_ctx_())
    /* eslint-disable @typescript-eslint/no-unused-vars */
    type test_route_ctx = Expect<Equal<typeof route_ctx, Ctx<''|'app'|'middleware'|'route'>>>
    /* eslint-enable @typescript-eslint/no-unused-vars */
})
test.run()
