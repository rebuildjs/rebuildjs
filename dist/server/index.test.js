"use strict";
import { ctx_ } from "ctx-core/be";
import { deep_equal } from "ctx-core/deep_equal";
import * as rmemo from "ctx-core/rmemo";
import { rmemo__wait } from "ctx-core/rmemo";
import esmock from "esmock";
import { test } from "uvu";
import { equal, throws } from "uvu/assert";
import { server_metafile0, server_metafile1, server_metafile2 } from "../_fixtures/index.js";
import { cwd__set, dist_path_, dist_path__set, is_prod__set, server_path_ } from "../app/index.js";
import { app_ctx, middleware_ctx_ } from "../ctx/index.js";
import {
  server__css$_,
  server__css_,
  server__cssBundle$_,
  server__cssBundle_,
  server__cssBundle__relative_path$_,
  server__cssBundle__relative_path_,
  server__metafile__set,
  server__metafile_path$_,
  server__metafile_path_,
  server__output$_,
  server__output_,
  server__output__relative_path$_,
  server__output__relative_path_,
  server__output__relative_path__set
} from "./index.js";
test.after.each(() => {
  app_ctx.s.app.clear();
});
test("server__metafile_path", () => {
  dist_path__set(app_ctx, "/test/dist");
  is_prod__set(app_ctx, true);
  equal(server__metafile_path$_(app_ctx)._, "/test/dist/server/metafile.json");
  equal(server__metafile_path_(app_ctx), "/test/dist/server/metafile.json");
  is_prod__set(app_ctx, false);
  equal(server__metafile_path$_(app_ctx)._, "/test/dist/server--dev/metafile.json");
  equal(server__metafile_path_(app_ctx), "/test/dist/server--dev/metafile.json");
  dist_path__set(app_ctx, "/test/dist2");
  equal(server__metafile_path$_(app_ctx)._, "/test/dist2/server--dev/metafile.json");
  equal(server__metafile_path_(app_ctx), "/test/dist2/server--dev/metafile.json");
  is_prod__set(app_ctx, true);
  equal(server__metafile_path$_(app_ctx)._, "/test/dist2/server/metafile.json");
  equal(server__metafile_path_(app_ctx), "/test/dist2/server/metafile.json");
  throws(() => server__metafile_path$_(ctx_()));
  throws(() => server__metafile_path_(ctx_()));
});
test("server__metafile", async () => {
  let file_exists__path = void 0;
  let readFile_path = void 0;
  let _server__metafile$_;
  let _server__metafile_;
  let _server__metafile__set;
  is_prod__set(app_ctx, true);
  dist_path__set(app_ctx, "/cwd/dist0");
  {
    ({
      server__metafile$_: _server__metafile$_,
      server__metafile_: _server__metafile_,
      server__metafile__set: _server__metafile__set
    } = await esmock("./index.js", {}, {
      "ctx-core/rmemo": rmemo,
      "ctx-core/fs": {
        file_exists_: async (path) => {
          file_exists__path = path;
          return true;
        }
      },
      "node:fs/promises": {
        readFile: async (path) => {
          readFile_path = path;
          switch (path) {
            case "/cwd/dist0/server/metafile.json":
              return Buffer.from(JSON.stringify(server_metafile0), "utf-8");
            case "/cwd/dist1/server/metafile.json":
              return Buffer.from(JSON.stringify(server_metafile1), "utf-8");
          }
        }
      }
    }));
  }
  equal(_server__metafile$_(app_ctx)._, void 0);
  equal(_server__metafile_(app_ctx), void 0);
  await rmemo__wait(_server__metafile$_(app_ctx), (m) => m, 100);
  equal(_server__metafile$_(app_ctx)._, server_metafile0);
  equal(_server__metafile_(app_ctx), server_metafile0);
  equal(file_exists__path, "/cwd/dist0/server/metafile.json");
  equal(readFile_path, "/cwd/dist0/server/metafile.json");
  equal(_server__metafile$_(app_ctx)._, server_metafile0);
  equal(_server__metafile_(app_ctx), server_metafile0);
  dist_path__set(app_ctx, "/cwd/dist1");
  await rmemo__wait(_server__metafile$_(app_ctx), (m) => deep_equal(m, server_metafile1), 100);
  equal(_server__metafile$_(app_ctx)._, server_metafile1);
  equal(_server__metafile_(app_ctx), server_metafile1);
  equal(file_exists__path, "/cwd/dist1/server/metafile.json");
  equal(readFile_path, "/cwd/dist1/server/metafile.json");
  dist_path__set(app_ctx, "/cwd/dist0");
  await rmemo__wait(_server__metafile$_(app_ctx), (m) => deep_equal(m, server_metafile0), 100);
  equal(_server__metafile$_(app_ctx)._, server_metafile0);
  equal(_server__metafile_(app_ctx), server_metafile0);
  equal(file_exists__path, "/cwd/dist0/server/metafile.json");
  equal(readFile_path, "/cwd/dist0/server/metafile.json");
  _server__metafile__set(app_ctx, server_metafile2);
  equal(_server__metafile$_(app_ctx)._, server_metafile2);
  equal(_server__metafile_(app_ctx), server_metafile2);
  dist_path__set(app_ctx, "/cwd/dist1");
  let error_msg = void 0;
  try {
    await rmemo__wait(_server__metafile$_(app_ctx), (m) => deep_equal(m, server_metafile1), 100);
  } catch (e) {
    error_msg = e.message;
  }
  equal(_server__metafile$_(app_ctx)._, server_metafile2);
  equal(_server__metafile_(app_ctx), server_metafile2);
  equal(error_msg, `Timeout 100ms`);
  throws(() => _server__metafile$_(ctx_()));
  throws(() => _server__metafile_(ctx_()));
  throws(() => _server__metafile__set(ctx_(), server_metafile0));
});
test("server__output__relative_path", () => {
  const middleware_ctx = middleware_ctx_();
  equal(server__output__relative_path$_(middleware_ctx)._, void 0);
  equal(server__output__relative_path_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR0SVR0.js");
  equal(server__output__relative_path$_(middleware_ctx)._, "dist/server--dev/index.server-SVR0SVR0.js");
  equal(server__output__relative_path_(middleware_ctx), "dist/server--dev/index.server-SVR0SVR0.js");
  throws(() => server__output__relative_path$_(app_ctx));
  throws(() => server__output__relative_path_(app_ctx));
  throws(() => server__output__relative_path__set(app_ctx, "dist/server--dev/index.HASH.js"));
});
test("server__output", () => {
  const middleware_ctx = middleware_ctx_();
  is_prod__set(app_ctx, false);
  equal(server__output$_(middleware_ctx)._, void 0);
  equal(server__output_(middleware_ctx), void 0);
  server__metafile__set(app_ctx, server_metafile0);
  equal(server__output$_(middleware_ctx)._, void 0);
  equal(server__output_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR0SVR0.js");
  equal(server_metafile0.outputs["dist/server--dev/index.server-SVR0SVR0.js"], {
    "imports": [],
    "exports": [],
    "entryPoint": "src/app/index.server.ts",
    "cssBundle": "dist/server--dev/index.server-SVR0SVR0.css",
    "inputs": {
      "../input/path0": {
        "bytesInOutput": 98
      }
    },
    "bytes": 98
  });
  equal(server__output$_(middleware_ctx)._, server_metafile0.outputs["dist/server--dev/index.server-SVR0SVR0.js"]);
  equal(server__output_(middleware_ctx), server_metafile0.outputs["dist/server--dev/index.server-SVR0SVR0.js"]);
  throws(() => server__output$_(app_ctx));
  throws(() => server__output_(app_ctx));
});
test("server__cssBundle__relative_path", () => {
  const middleware_ctx = middleware_ctx_();
  is_prod__set(app_ctx, false);
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, void 0);
  equal(server__cssBundle__relative_path_(middleware_ctx), void 0);
  server__metafile__set(app_ctx, server_metafile0);
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, void 0);
  equal(server__cssBundle__relative_path_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR0SVR0.js");
  equal(server_metafile0.outputs["dist/server--dev/index.server-SVR0SVR0.js"].cssBundle, "dist/server--dev/index.server-SVR0SVR0.css");
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, "dist/server--dev/index.server-SVR0SVR0.css");
  equal(server__cssBundle__relative_path_(middleware_ctx), "dist/server--dev/index.server-SVR0SVR0.css");
  server__metafile__set(app_ctx, server_metafile1);
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, void 0);
  equal(server__cssBundle__relative_path_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR1SVR1.js");
  equal(server_metafile1.outputs["dist/server--dev/index.server-SVR1SVR1.js"].cssBundle, "dist/server--dev/index.server-SVR1SVR1.css");
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, "dist/server--dev/index.server-SVR1SVR1.css");
  equal(server__cssBundle__relative_path_(middleware_ctx), "dist/server--dev/index.server-SVR1SVR1.css");
  server__metafile__set(app_ctx, server_metafile2);
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, void 0);
  equal(server__cssBundle__relative_path_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR2SVR2.js");
  equal(server_metafile2.outputs["dist/server--dev/index.server-SVR2SVR2.js"].cssBundle, void 0);
  equal(server__cssBundle__relative_path$_(middleware_ctx)._, void 0);
  equal(server__cssBundle__relative_path_(middleware_ctx), void 0);
  throws(() => server__cssBundle__relative_path$_(app_ctx));
  throws(() => server__cssBundle__relative_path_(app_ctx));
});
test("server__cssBundle", () => {
  const middleware_ctx = middleware_ctx_();
  is_prod__set(app_ctx, false);
  cwd__set(app_ctx, "/cwd");
  equal(dist_path_(app_ctx), "/cwd/dist");
  equal(server_path_(app_ctx), "/cwd/dist/server--dev");
  equal(server__cssBundle$_(middleware_ctx)._, void 0);
  equal(server__cssBundle_(middleware_ctx), void 0);
  server__metafile__set(app_ctx, server_metafile0);
  equal(server__cssBundle$_(middleware_ctx)._, void 0);
  equal(server__cssBundle_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR0SVR0.js");
  equal(server_metafile0.outputs["dist/server--dev/index.server-SVR0SVR0.js"].cssBundle, "dist/server--dev/index.server-SVR0SVR0.css");
  equal(server__cssBundle$_(middleware_ctx)._, "/cwd/dist/server--dev/index.server-SVR0SVR0.css");
  equal(server__cssBundle_(middleware_ctx), "/cwd/dist/server--dev/index.server-SVR0SVR0.css");
  server__metafile__set(app_ctx, server_metafile1);
  equal(server__cssBundle$_(middleware_ctx)._, void 0);
  equal(server__cssBundle_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR1SVR1.js");
  equal(server_metafile1.outputs["dist/server--dev/index.server-SVR1SVR1.js"].cssBundle, "dist/server--dev/index.server-SVR1SVR1.css");
  equal(server__cssBundle$_(middleware_ctx)._, "/cwd/dist/server--dev/index.server-SVR1SVR1.css");
  equal(server__cssBundle_(middleware_ctx), "/cwd/dist/server--dev/index.server-SVR1SVR1.css");
  server__metafile__set(app_ctx, server_metafile2);
  equal(server__cssBundle$_(middleware_ctx)._, void 0);
  equal(server__cssBundle_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR2SVR2.js");
  equal(server_metafile2.outputs["dist/server--dev/index.server-SVR2SVR2.js"].cssBundle, void 0);
  equal(server__cssBundle$_(middleware_ctx)._, void 0);
  equal(server__cssBundle_(middleware_ctx), void 0);
  throws(() => server__cssBundle$_(app_ctx));
  throws(() => server__cssBundle_(app_ctx));
});
test("server__css", () => {
  const middleware_ctx = middleware_ctx_();
  is_prod__set(app_ctx, false);
  cwd__set(app_ctx, "/cwd");
  equal(dist_path_(app_ctx), "/cwd/dist");
  equal(server_path_(app_ctx), "/cwd/dist/server--dev");
  equal(server__css$_(middleware_ctx)._, void 0);
  equal(server__css_(middleware_ctx), void 0);
  server__metafile__set(app_ctx, server_metafile0);
  equal(server__css$_(middleware_ctx)._, void 0);
  equal(server__css_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR0SVR0.js");
  equal(server_metafile0.outputs["dist/server--dev/index.server-SVR0SVR0.js"].cssBundle, "dist/server--dev/index.server-SVR0SVR0.css");
  equal(server__css$_(middleware_ctx)._, "/index.server-SVR0SVR0.css");
  equal(server__css_(middleware_ctx), "/index.server-SVR0SVR0.css");
  server__metafile__set(app_ctx, server_metafile1);
  equal(server__css$_(middleware_ctx)._, void 0);
  equal(server__css_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR1SVR1.js");
  equal(server_metafile1.outputs["dist/server--dev/index.server-SVR1SVR1.js"].cssBundle, "dist/server--dev/index.server-SVR1SVR1.css");
  equal(server__css$_(middleware_ctx)._, "/index.server-SVR1SVR1.css");
  equal(server__css_(middleware_ctx), "/index.server-SVR1SVR1.css");
  server__metafile__set(app_ctx, server_metafile2);
  equal(server__css$_(middleware_ctx)._, void 0);
  equal(server__css_(middleware_ctx), void 0);
  server__output__relative_path__set(middleware_ctx, "dist/server--dev/index.server-SVR2SVR2.js");
  equal(server_metafile2.outputs["dist/server--dev/index.server-SVR2SVR2.js"].cssBundle, void 0);
  equal(server__css$_(middleware_ctx)._, void 0);
  equal(server__css_(middleware_ctx), void 0);
  throws(() => server__css$_(app_ctx));
  throws(() => server__css_(app_ctx));
});
test.run();
