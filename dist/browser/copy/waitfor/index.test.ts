import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { waitfor } from './index.js'
test('waitfor|success', async ()=>{
	let count = 0
	let ret = false
	const returned_value_a:boolean[] = []
	const promise = waitfor(()=>{
		count++
		return ret
	}, 10)
		.then(returned_value=>{
			returned_value_a.push(returned_value)
			return returned_value
		})
	equal(count, 1)
	equal(returned_value_a, [])
	ret = true
	equal(await promise, true)
	equal(count, 2)
	equal(returned_value_a, [true])
})
test('waitfor|timeout', async ()=>{
	let count = 0
	let err:Error|undefined = undefined
	try {
		await waitfor(()=>{
			count++
			return false
		}, 1)
	} catch (_err) {
		err = _err as Error
	}
	equal(count, 1)
	equal(err?.message, 'Timeout 1ms')
})
test('waitfor|cancel', async ()=>{
	let count = 0
	const promise = waitfor(()=>{
		count++
		return false
	}, 10)
	equal(count, 1)
	equal(await promise.cancel(), false)
	equal(count, 1)
	equal(await promise, false)
	equal(count, 1)
})
test.run()
