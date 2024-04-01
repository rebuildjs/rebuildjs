/// <reference types="./index.d.ts" />
import { compact } from 'ctx-core/array'
import { ns_id_be_lock_memosig_triple_ } from 'ctx-core/rmemo'
import { browser__css_, browser__script_ } from '../rebuildjs_browser/index.js'
import { server__css_ } from '../rebuildjs_server/index.js'
export const [
	assets$_,
	assets_,
	assets__set,
] = ns_id_be_lock_memosig_triple_(
	'request',
	'assets',
	ctx=>
		assets__new({
			css_a: compact([server__css_(ctx), browser__css_(ctx)]),
			script_a: compact([browser__script_(ctx)]),
		}))
export function assets__assign(request_ctx, ..._assets_a) {
	assets__set(request_ctx, assets__new(assets_(request_ctx), ..._assets_a))
}
/**
 * @param {assets_T[]}_assets_a
 * @returns {{script_a: *[], css_a: *[]}}
 * @private
 */
export function assets__new(..._assets_a) {
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
