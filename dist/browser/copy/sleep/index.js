/**
 * @param {number}ms
 * @returns {Promise<number|NodeJS.Timeout>}
 */
export function sleep(ms) {
	return new Promise((resolve)=>setTimeout(resolve, ms))
}
