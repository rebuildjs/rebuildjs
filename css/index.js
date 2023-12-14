/// <reference types="esbuild" />
/// <reference types="./index.d.ts" />
/**
 * @returns {Plugin}
 * @private
 */
export function cssjs_esbuild_plugin_() {
	return {
		name: 'cssjs_esbuild_plugin',
		setup(build) {
			build.onLoad(
				{ filter: /\.css\.(js|ts)$/ },
				async ({ path })=>{
					const contents = await import(path).then(mod=>mod.default())
					return { contents, loader: 'css' }
				}
			)
		},
	}
}
/**
 * @param {string}css
 * @param {Record<string, string>}_var_R_a
 * @returns {string}
 */
export function var__css__replace(css, ..._var_R_a) {
	const var_R = _var_R_a.reduce((
		var_R,
		_var_R
	)=>({
		...var_R,
		..._var_R,
	}), {})
	return css.replaceAll(/var\(([^)]*)\)/g, (_, $)=>var_R[$])
}
