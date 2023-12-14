import { test } from 'uvu'
import { equal } from 'uvu/assert'
import './index.js'
test('app|loads', ()=>{
	equal(1, 1)
})
test.run()
