import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { run } from '../run/index.js'
import { sleep } from '../sleep/index.js'
import { promise_timeout } from './index.js'
test('promise_timeout|success', async ()=>{
	let count = 0
	const promise = promise_timeout(run(async ()=>{
		count++
		await sleep(10)
		return true
	}), 100)
	equal(count, 1)
	equal(await promise, true)
	equal(count, 1)
})
test('promise_timeout|timeout', async ()=>{
	let count = 0
	let err:Error|undefined = undefined
	try {
		await promise_timeout(run(async ()=>{
			count++
			await sleep(10)
			return false
		}), 1)
	} catch (_err) {
		err = _err as Error
	}
	equal(count, 1)
	equal(err?.message, 'Timeout 1ms')
})
test.run()
