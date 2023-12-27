"use strict";
import { be_ } from "ctx-core/be";
import { test } from "uvu";
import { equal } from "uvu/assert";
import { app_ctx, middleware_ctx_, route_ctx_ } from "./index.js";
test.after.each(() => {
  app_ctx.s.app.clear();
});
test("app_ctx", () => {
  const ns_app_ = be_(
    () => "app",
    { ns: "app" }
  );
  equal(ns_app_(app_ctx), "app");
});
test("middleware_ctx_", () => {
  const middleware_ctx = middleware_ctx_();
  const ns_middleware_ = be_(
    () => "middleware",
    { ns: "middleware" }
  );
  const ns_app_ = be_(
    () => "app",
    { ns: "app" }
  );
  equal(ns_middleware_(middleware_ctx), "middleware");
  equal(ns_app_(middleware_ctx), "app");
});
test("route_ctx_", () => {
  const route_ctx = route_ctx_(middleware_ctx_());
  const ns_blank_ = be_(
    () => "",
    { ns: "" }
  );
  const ns_route_ = be_(
    () => "route",
    { ns: "route" }
  );
  const ns_middleware_ = be_(
    () => "middleware",
    { ns: "middleware" }
  );
  const ns_app_ = be_(
    () => "app",
    { ns: "app" }
  );
  equal(ns_blank_(route_ctx), "");
  equal(ns_route_(route_ctx), "route");
  equal(ns_middleware_(route_ctx), "middleware");
  equal(ns_app_(route_ctx), "app");
});
test.run();
