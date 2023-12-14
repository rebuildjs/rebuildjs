export declare function asset_path_(mod_promise:Promise<{ default:string }>):Promise<string>
export declare function asset_path_a_<
	Tuple extends [...Promise<{ default:string }>[]]
>(...mod_promise_a:Tuple):Promise<{
	[Index in keyof Tuple]: string
}>
export declare function assets_(..._assets_a:assets_T[]):assets_T
export type assets_T = {
	css_a?:string[]
	script_a?:string[]
}
