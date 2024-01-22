import type { ctx__be_T, ctx__get_T, ctx__set_T } from 'ctx-core/be'
import type { lock_memosig_T } from 'ctx-core/rmemo'
import type { has_route_T } from '../ctx/index.js'
export declare const assets$_:ctx__be_T<lock_memosig_T<assets_T>, 'route'>
export declare const assets_:ctx__get_T<assets_T, 'route'>
export declare const assets__set:ctx__set_T<assets_T, 'route'>
export declare function assets__assign<ctx_T extends has_route_T>(
	ctx:ctx_T,
	..._assets_a:Partial<assets_T>[]
):assets_T
export declare function assets__new(..._assets_a:(Partial<assets_T>|undefined)[]):assets_T
export type assets_T = {
	css_a:string[]
	script_a:string[]
}
