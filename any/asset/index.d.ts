export declare function asset_path_(mod_promise:Promise<{ default:string }>):Promise<string>
export declare function asset_path_a_<
	Tuple extends [...Promise<{ default:string }>[]]
>(...mod_promise_a:Tuple):Promise<{
	[Index in keyof Tuple]:string
}>
