import type { ctx_T, wide_ctx_T } from 'ctx-core/be'
export declare const app_ctx:app_ctx_T
export declare function middleware_ctx__new():middleware_ctx_T
export declare function request_ctx__new(middleware_ctx:middleware_ctx_T):request_ctx_T
export type app_ctx_T = ctx_T<'app'>
export type middleware_ctx_T = ctx_T<'middleware'|'app'>
export type request_ctx_T = ctx_T<''|'request'|'middleware'|'app'>
export type wide_app_ctx_T = wide_ctx_T<'app'>
export type wide_middleware_ctx_T = wide_ctx_T<'middleware'>
export type wide_request_ctx_T = wide_ctx_T<'request'>
