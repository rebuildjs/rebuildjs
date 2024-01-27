/// <reference types="./index.d.ts" />
import { ns_ctx_ } from 'ctx-core/be'
export const app_ctx = globalThis.rebuildjs__app_ctx ??= app_ctx__new()
/**
 * @returns {app_ctx_T}
 * @private
 */
function app_ctx__new() {
	return ns_ctx_('app')
}
/**
 * @returns {middleware_ctx_T}
 * @private
 */
export function middleware_ctx__new() {
	return ns_ctx_('middleware', app_ctx)
}
/**
 * @param {middleware_ctx_T}middleware_ctx
 * @returns {request_ctx_T}
 * @private
 */
export function request_ctx__new(middleware_ctx) {
	return ns_ctx_('', 'request', middleware_ctx)
}
