import { test } from 'uvu'
import { equal } from 'uvu/assert'
import './index.js'
import { app_ctx } from '../ctx/index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('build|loads', ()=>{
	equal(1, 1)
})
test.run()
