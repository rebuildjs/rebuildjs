"use strict";
import { sleep } from "ctx-core/function";
import { test } from "uvu";
import { equal } from "uvu/assert";
import { browser_metafile0, server_metafile0 } from "../_fixtures/index.js";
import { browser__metafile__set } from "../browser/index.js";
import { app_ctx } from "../ctx/index.js";
import { server__metafile__set } from "../server/index.js";
import { metafile__wait } from "./index.js";
test.after.each(() => {
  app_ctx.s.app.clear();
});
test("metafile__wait|success", async () => {
  browser__metafile__set(app_ctx, void 0);
  server__metafile__set(app_ctx, void 0);
  let promise0_resolved = false;
  metafile__wait(200).then(() => promise0_resolved = true);
  equal(promise0_resolved, false);
  server__metafile__set(app_ctx, server_metafile0);
  equal(promise0_resolved, false);
  browser__metafile__set(app_ctx, browser_metafile0);
  await sleep(0);
  equal(promise0_resolved, true);
});
test("metafile__wait|failure", async () => {
  browser__metafile__set(app_ctx, void 0);
  server__metafile__set(app_ctx, void 0);
  let err = void 0;
  try {
    await metafile__wait(0);
  } catch (_err) {
    err = _err;
  }
  equal(err?.message, "metafile__wait|browser & server metafile timeout");
  equal(err?.cause?.message, "Timeout 0ms");
});
test.run();
