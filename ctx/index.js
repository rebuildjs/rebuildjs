/// <reference types="./index.d.ts" />
/** @typedef {import('ctx-core/be').be_config_T}be_config_T */
import { ctx_ } from 'ctx-core/be'
export const app_ctx = app_ctx_()
/**
 * @returns {app_ctx_T}
 * @private
 */
function app_ctx_() {
	const app_ctx = ctx_()
	app_ctx.is_app_ctx = true
	return app_ctx
}
/**
 * @type {be_config_T}
 */
export const app_ctx__be_config = Object.freeze({
	is_source: ctx=>'is_app_ctx' in ctx
})
/**
 * @returns {middleware_ctx_T}
 * @private
 */
export function middleware_ctx_() {
	const ctx = ctx_()
	ctx.is_middleware_ctx = true
	return [ctx_(), app_ctx]
}
/**
 * @type {be_config_T}
 */
export const middleware_ctx__be_config = Object.freeze({
	is_source: ctx=>'is_middleware_ctx' in ctx
})
/**
 * @param {middleware_ctx_T}middleware_ctx
 * @returns {route_ctx_T}
 * @private
 */
export function route__ctx_(middleware_ctx) {
	const ctx = ctx_()
	ctx.is_route_ctx = true
	return [ctx, ...middleware_ctx]
}
/**
 * @type {be_config_T}
 */
export const route_ctx__be_config = Object.freeze({
	is_source: ctx=>'is_route_ctx' in ctx
})
