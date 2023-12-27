"use strict";
import { test } from "uvu";
import { equal } from "uvu/assert";
import { app_ctx } from "../ctx/index.js";
import { middleware_ } from "./index.js";
test.after.each(() => {
  app_ctx.s.app.clear();
});
test("middleware", () => {
  const fn = () => {
  };
  equal(middleware_(fn), fn);
});
test.run();
