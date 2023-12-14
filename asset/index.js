export async function asset_path_(mod_promise) {
	return (await mod_promise.then(mod=>mod.default)).replace(/^\.\//, '/')
}
export async function asset_path_a_(...mod_promise_a) {
	return Promise.all(mod_promise_a.map(asset_path_))
}
