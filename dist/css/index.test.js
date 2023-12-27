"use strict";
import { file_exists_ } from "ctx-core/fs";
import { build } from "esbuild";
import { dirname, join } from "path";
import { test } from "uvu";
import { equal } from "uvu/assert";
import { app_ctx } from "../ctx/index.js";
import { cssjs_esbuild_plugin_, var__css__replace } from "./index.js";
test.after.each(() => {
  app_ctx.s.app.clear();
});
test("var__css__replace", () => {
  equal(
    var__css__replace(
      `div { color: var(--color); font-size: var(--font-size); }`,
      { "--color": "red" },
      { "--font-size": "16px" }
    ),
    `div { color: red; font-size: 16px; }`
  );
});
test("cssjs_esbuild_plugin_", async () => {
  const index_css_ts_path = join(dirname(new URL(import.meta.url).pathname), "../_fixtures/index.css.ts");
  const index_css_js_path = join(dirname(new URL(import.meta.url).pathname), "../_fixtures/index.css.js");
  const entryPoint = await file_exists_(index_css_ts_path) ? index_css_ts_path : index_css_js_path;
  const result = await build({
    entryPoints: [entryPoint],
    plugins: [cssjs_esbuild_plugin_()],
    write: false
  });
  equal(result.outputFiles.map((outputFile) => new TextDecoder().decode(outputFile.contents)), [
    `div {
  color: var(--color);
  font-size: var(--font-size);
}
`
  ]);
});
test.run();
