import { test } from 'uvu'
import './index.js'
import { equal } from 'uvu/assert'
test('build|loads', ()=>{
	equal(1, 1)
})
test.run()
