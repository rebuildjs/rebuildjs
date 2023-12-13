import { rmemo__wait } from 'ctx-core/rmemo'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { app_ctx } from '../ctx/index.js'
import { server__metafile$_ } from './index.js'
test('server__metafile', async ()=>{
	equal(server__metafile$_(app_ctx)._, undefined)
	const val = await rmemo__wait(
		server__metafile$_(app_ctx),
		val=>val !== undefined)
	equal(val, null)
})
test.run()
