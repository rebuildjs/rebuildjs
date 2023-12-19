import { memo_, rmemo__wait } from 'ctx-core/rmemo'
import { browser__metafile_ } from '../browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__metafile_ } from '../server/index.js'
export async function metafile__wait(timeout = 5000) {
	await rmemo__wait(memo_(()=>
		server__metafile_(app_ctx) && browser__metafile_(app_ctx)),
	val=>val !== undefined,
	timeout
	).catch(err=>{
		throw Error('browser & server metafile timeout', { cause: err })
	})
}
