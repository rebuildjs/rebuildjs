export async function asset_path_(mod_promise) {
	return (await mod_promise.then(mod=>mod.default)).replace(/^\.\//, '/')
}
