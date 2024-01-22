import type { Equal, Expect } from 'ctx-core/test'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { app_ctx, type middleware_ctx_T } from '../ctx/index.js'
import { middleware_ } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('middleware', ()=>{
	const fn = ()=>{
	}
	equal(middleware_(fn), fn)
})
test('middleware|type', ()=>{
	type test_middleware_ctx__Parameters =
		Expect<
			Equal<
				Parameters<typeof middleware_<R>>,
				[(middleware_ctx:middleware_ctx_T)=>R]>>
	equal({} as test_middleware_ctx__Parameters, {})
	type test_middleware_ctx__ReturnType = Expect<
		Equal<
			ReturnType<typeof middleware_<R>>,
			R>>
	equal({} as test_middleware_ctx__ReturnType, {})
})
test.run()
type R = { foo:'bar' }
