import type { be_config_T, MapCtx } from 'ctx-core/be'
export declare const app_ctx:app_ctx_T
export declare const app_ctx__be_config:be_config_T
export declare function middleware_ctx_():middleware_ctx_T
export declare const middleware_ctx__be_config:be_config_T
export declare function route__ctx_(app_input_ctx:middleware_ctx_T):route_ctx_T
export declare const route_ctx__be_config:be_config_T
export type app_ctx_T = MapCtx&{ is_app_ctx:true }
export type middleware_MapCtx_T = MapCtx&{ is_middleware_ctx:true }
export type middleware_ctx_T = [middleware_MapCtx_T, app_ctx_T]
export type route_MapCtx_T = MapCtx&{ is_route_ctx:true }
export type route_ctx_T = [route_MapCtx_T, ...middleware_ctx_T]
