import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { sleep } from './index.js'
test('sleep', async ()=>{
	const now0 = performance.now()
	await sleep(10)
	equal(performance.now() >= now0 + 10, true)
})
test.run()
