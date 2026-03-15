/// <reference lib="dom" />
import type { middleware_ctx_T, request_ctx_T } from '../ctx/index.js'
export declare function html_route_<framework_ctx_T>(
	middleware_ctx:middleware_ctx_T,
	page_:($p:{ ctx:request_ctx_T })=>({ toString():string }|ReadableStream<string>),
	request_ctx__ensure:(middleware_ctx:middleware_ctx_T, framework_ctx:framework_ctx_T)=>request_ctx_T,
	response_init?:ResponseInit
):(framework_ctx:framework_ctx_T)=>Response
export declare function html_response__new(
	html_OR_stream:string|ReadableStream,
	response_init?:ResponseInit
):Response
