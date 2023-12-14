import { file_exists_ } from '@ctx-core/fs'
import { neq_ } from 'ctx-core/function'
import { rmemo__wait } from 'ctx-core/rmemo'
import { browser__metafile$_, browser__metafile_path_ } from '../browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__metafile$_, server__metafile_path_ } from '../server/index.js'
export async function metafile__wait() {
	if (!await file_exists_(server__metafile_path_(app_ctx))) {
		throw new Error(`${server__metafile_path_(app_ctx)} does not exist`)
	}
	if (!await file_exists_(browser__metafile_path_(app_ctx))) {
		throw new Error(`${browser__metafile_path_(app_ctx)} does not exist`)
	}
	const neq_undefined = val=>val !== undefined
	await rmemo__wait(
		server__metafile$_(app_ctx),
		neq_(undefined))
	await rmemo__wait(browser__metafile$_(app_ctx), neq_undefined)
}
