/// <reference types="bun-types" />
export declare function static_middleware__routes_(
	config?:static_middleware__config_T
):Promise<static_middleware__route_T[]>
export type static_middleware__config_T = {
	headers_?:(url_path:string, content_type:string, path:string)=>Record<string, string>
}
export type static_middleware__route_T = {
	url_path:string
	handler:()=>Response
}
