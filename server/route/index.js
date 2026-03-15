/// <reference types="./index.d.ts" />
// TODO: use built-in TextEncoderStream when bunjs implements TextEncoderStream
// See https://github.com/oven-sh/bun/issues/5648
// See https://github.com/oven-sh/bun/issues/159
import { TextEncoderStream } from 'ctx-core/stream'
import { request_ctx__new } from '../ctx/index.js'
/**
 * @param {middleware_ctx_T}middleware_ctx
 * @param {($p:{ ctx:request_ctx_T })=>(string|ReadableStream<string|Uint8Array>)}page_
 * @param {(middleware_ctx:middleware_ctx_T, framework_ctx:any)=>request_ctx_T}request_ctx__ensure
 * @param {ResponseInit}[response_init]
 * @returns {(framework_ctx:any)=>Response}
 */
export function html_route_(
	middleware_ctx,
	page_,
	request_ctx__ensure,
	response_init
) {
	return framework_ctx=>
		html_response__new(
			page_({
				ctx: request_ctx__ensure(middleware_ctx, framework_ctx)
			}),
			response_init)
}
/**
 * @param {string|ReadableStream}html_OR_stream
 * @param {ResponseInit}[response_init]
 * @returns {Response}
 */
export function html_response__new(
	html_OR_stream,
	response_init
) {
	const headers = new Headers(response_init?.headers)
	headers.set('Content-Type', 'text/html;charset=UTF-8')
	return new Response(
		html_OR_stream.pipeTo
			? html_OR_stream.pipeThrough(new TextEncoderStream())
			: new ReadableStream({
				start(controller) {
					controller.enqueue('' + html_OR_stream)
					controller.close()
				}
			}),
		{
			...(response_init ?? {}),
			headers
		}
	)
}
