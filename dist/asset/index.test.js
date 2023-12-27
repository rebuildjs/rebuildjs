"use strict";
import { ctx_, ns_ctx_ } from "ctx-core/be";
import { test } from "uvu";
import { equal, throws } from "uvu/assert";
import { app_ctx, middleware_ctx_, route_ctx_ } from "../ctx/index.js";
import { asset_path_, asset_path_a_, assets$_, assets_, assets__assign, assets__new, assets__set } from "./index.js";
test.after.each(() => {
  app_ctx.s.app.clear();
});
test("asset_path_", async () => {
  equal(await asset_path_(mod_("./path.png")), "/path.png");
});
test("asset_path_a_", async () => {
  equal(await asset_path_a_(
    mod_("./path0.png"),
    mod_("./path1.png"),
    mod_("./path2.png"),
    mod_("./path3.png")
  ), [
    "/path0.png",
    "/path1.png",
    "/path2.png",
    "/path3.png"
  ]);
});
test("assets", () => {
  const route_ctx = route_ctx_(middleware_ctx_());
  const assets = assets__new(
    { css_a: ["/foo.css"], script_a: ["/foo.js"] },
    void 0
  );
  assets__set(route_ctx, assets);
  equal(assets_(route_ctx), assets);
  equal(assets$_(route_ctx)(), assets);
  throws(() => assets$_(ctx_()));
  throws(() => assets$_(middleware_ctx_()));
  throws(() => assets_(ctx_()));
  throws(() => assets_(middleware_ctx_()));
  throws(() => assets__set(ctx_(), assets));
  throws(() => assets__set(middleware_ctx_(), assets));
});
test("assets__assign", async () => {
  assets__assign(route_ctx_(middleware_ctx_()), assets__new());
  throws(() => assets__assign(ctx_()));
  throws(() => assets__assign(ns_ctx_(ctx_())));
  throws(() => assets__assign(middleware_ctx_()));
  throws(() => assets__assign(app_ctx, assets__new()));
});
test("assets__new", async () => {
  equal(
    assets__new(
      { script_a: ["/foo.js"] },
      { css_a: ["/foo.css"] },
      { script_a: ["/bar.js"], css_a: ["/bar.css"] },
      {},
      { script_a: [], css_a: [] },
      { script_a: void 0, css_a: void 0 }
    ),
    {
      css_a: ["/foo.css", "/bar.css"],
      script_a: ["/foo.js", "/bar.js"]
    }
  );
});
test.run();
async function mod_(out_path) {
  return { default: out_path };
}
