"use strict";
import { ns_ctx_ } from "ctx-core/be";
export const app_ctx = app_ctx_();
function app_ctx_() {
  return ns_ctx_("app");
}
export function middleware_ctx_() {
  return ns_ctx_("middleware", app_ctx);
}
export function route_ctx_(middleware_ctx) {
  return ns_ctx_("", "route", middleware_ctx);
}
