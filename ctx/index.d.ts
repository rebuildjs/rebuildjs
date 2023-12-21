import type { Ctx, Ctx_wide_T } from 'ctx-core/be'
export declare const app_ctx:app_ctx_T
export declare function middleware_ctx_():middleware_ctx_T
export declare function route_ctx_(middleware_ctx:middleware_ctx_T):route_ctx_T
export type app_ctx_T = Ctx<'app'>
export type middleware_ctx_T = Ctx<'middleware'|'app'>
export type route_ctx_T = Ctx<''|'route'|'middleware'|'app'>
export type has_app_T = Ctx_wide_T<'app'>
export type has_middleware_T = Ctx_wide_T<'middleware'>
export type has_route_T = Ctx_wide_T<'route'>
