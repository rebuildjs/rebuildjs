"use strict";
import { file_exists_ } from "ctx-core/fs";
import { nullish__none_, tup, waitfor } from "ctx-core/function";
import { be_lock_memosig_triple_, be_memo_pair_, be_sig_triple_ } from "ctx-core/rmemo";
import { readFile } from "node:fs/promises";
import { join, relative } from "path";
import { cwd_, server__relative_path_, server_path_ } from "../app/index.js";
export const [
  server__metafile_path$_,
  server__metafile_path_
] = be_memo_pair_(
  (ctx) => join(server_path_(ctx), "metafile.json"),
  { ns: "app", id: "server__metafile_path" }
);
let server__metafile__waitfor_promise;
export const [
  server__metafile$_,
  server__metafile_,
  server__metafile__set
] = be_lock_memosig_triple_(
  () => void 0,
  async (ctx, server__metafile$) => {
    server__metafile__waitfor_promise?.cancel?.();
    let metafile_path;
    if (!server__metafile$.lock) {
      metafile_path = server__metafile_path_(ctx);
      server__metafile__waitfor_promise = waitfor(
        () => file_exists_(metafile_path),
        200
      ).catch(() => false);
      if (await server__metafile__waitfor_promise && metafile_path === server__metafile_path_(ctx)) {
        server__metafile$._ = await readFile(metafile_path).then((buf) => JSON.parse(buf + ""));
      }
    }
  },
  { ns: "app", id: "server__metafile" }
);
export const [
  server__output__relative_path$_,
  server__output__relative_path_,
  server__output__relative_path__set
] = be_sig_triple_(
  () => void 0,
  { ns: "middleware", id: "server__output__relative_path" }
);
export const [
  server__output$_,
  server__output_
] = be_memo_pair_(
  (ctx) => nullish__none_(
    tup(server__metafile_(ctx), server__output__relative_path_(ctx)),
    (server__metafile, server__output__relative_path) => server__metafile.outputs[server__output__relative_path]
  ),
  { ns: "middleware", id: "server__output" }
);
export const [
  server__cssBundle__relative_path$_,
  server__cssBundle__relative_path_
] = be_memo_pair_(
  (ctx) => server__output_(ctx)?.cssBundle,
  { ns: "middleware", id: "server__cssBundle" }
);
export const [
  server__cssBundle$_,
  server__cssBundle_
] = be_memo_pair_(
  (ctx) => nullish__none_(
    [server__output_(ctx)?.cssBundle],
    (cssBundle) => join(cwd_(ctx), cssBundle)
  ),
  { ns: "middleware", id: "server__cssBundle" }
);
export const [
  server__css$_,
  server__css_
] = be_memo_pair_(
  (ctx) => nullish__none_(
    [server__relative_path_(ctx), server__cssBundle__relative_path_(ctx)],
    (server__relative_path, server__cssBundle__relative_path) => join("/", relative(server__relative_path, server__cssBundle__relative_path))
  ),
  { ns: "middleware", id: "server__css" }
);