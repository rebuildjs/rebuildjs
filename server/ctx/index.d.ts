import type { Ctx, Ctx_wide_T } from 'ctx-core/be'
export declare const app_ctx:app_ctx_T
export declare function middleware_ctx__new():middleware_ctx_T
export declare function request_ctx__new(middleware_ctx:middleware_ctx_T):request_ctx_T
export type app_ctx_T = Ctx<'app'>
export type middleware_ctx_T = Ctx<'middleware'|'app'>
export type request_ctx_T = Ctx<''|'request'|'middleware'|'app'>
export type has_app_T = Ctx_wide_T<'app'>
export type has_middleware_T = Ctx_wide_T<'middleware'>
export type has_request_T = Ctx_wide_T<'request'>
