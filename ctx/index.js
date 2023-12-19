/// <reference types="./index.d.ts" />
import { ns_ctx_ } from 'ctx-core/be'
export const app_ctx = app_ctx_()
/**
 * @returns {app_ctx_T}
 * @private
 */
function app_ctx_() {
	return ns_ctx_('app')
}
/**
 * @returns {middleware_ctx_T}
 * @private
 */
export function middleware_ctx_() {
	return ns_ctx_('middleware', app_ctx)
}
/**
 * @param {middleware_ctx_T}middleware_ctx
 * @returns {route_ctx_T}
 * @private
 */
export function route_ctx_(middleware_ctx) {
	return ns_ctx_('route', middleware_ctx)
}
