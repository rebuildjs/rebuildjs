/**
 * @param {(()=>Promise<unknown>)|Promise<unknown>}promise
 * @param {number}ms
 * @param {Error}[error]
 * @returns {Promise<unknown>}
 */
export async function promise_timeout(
	promise,
	ms,
	error = new Error(`Timeout ${ms}ms`),
) {
	let id
	let timeout = new Promise((_resolve, reject)=>{
		id = setTimeout(()=>reject(error), ms)
	})
	return Promise.race([
		typeof promise === 'function' ? promise() : promise,
		timeout
	]).then(result=>{
		clearTimeout(id)
		return result
	})
}
