export declare function asset_path_(mod_promise:Promise<{ default:string }>):Promise<string>
export declare function asset_path_a_<
	arg_a_T extends readonly Promise<{ default:string }>[]
>(...mod_promise_a:arg_a_T):Promise<{ [key:keyof arg_a_T]:arg_a_T[key] }>
