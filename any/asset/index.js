/**
 * @param {Promise<{ default:string }>}mod_promise
 * @returns {Promise<string>}
 * @private
 */
export function asset_path_(mod_promise) {
	return (
		mod_promise
			.then(mod=>mod.default)
			.then(relative_path=>relative_path.replace(/^\.\//, '/'))
	)
}
/**
 * @param {Promise<{ default:string }>}mod_promise_a
 * @returns {Promise<string[]>}
 * @private
 */
export function asset_path_a_(...mod_promise_a) {
	return Promise.all(mod_promise_a.map(asset_path_))
}
