import { promise_timeout } from '../promise_timeout/index.js'
import { sleep } from '../sleep/index.js'
/**
 * @param {()=>Promise<unknown>}fn
 * @param {unknown}timeout
 * @param {unknown}[period]
 * @returns {Promise<void>}
 */
export function waitfor(fn, timeout, period = 0) {
	let cancel
	let promise = new Promise((resolve, reject)=>
		promise_timeout(async ()=>{
			let rv
			for (; !cancel;) {
				rv = await fn()
				if (rv) return rv
				await sleep(period)
			}
			return rv
		}, timeout)
			.then(resolve)
			.catch(err=>{
				cancel = 1
				reject(err)
			}))
	promise.cancel = ()=>{
		cancel = 1
		return promise
	}
	return promise
}
