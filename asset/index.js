/// <reference types="./index.d.ts" />
export async function asset_path_(mod_promise) {
	return (await mod_promise.then(mod=>mod.default)).replace(/^\.\//, '/')
}
export async function asset_path_a_(...mod_promise_a) {
	return Promise.all(mod_promise_a.map(asset_path_))
}
/**
 * @param {assets_T[]}_assets_a
 * @returns {{script_a: *[], css_a: *[]}}
 * @private
 */
export function assets_(..._assets_a) {
	/** @type {assets_T} */
	const assets = { css_a: [], script_a: [] }
	for (const _assets of _assets_a) {
		for (const css of _assets?.css_a || []) {
			if (!~assets.css_a.indexOf(css)) assets.css_a.push(css)
		}
		for (const script of _assets?.script_a || []) {
			if (!~assets.script_a.indexOf(script)) assets.script_a.push(script)
		}
	}
	return assets
}
