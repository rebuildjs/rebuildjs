/// <reference lib="es2022" />
import { sleep } from 'ctx-core/function'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { browser__metafile0, server__metafile0 } from '../../_fixtures/metafiles.js'
import { app_ctx } from '../ctx/index.js'
import { browser__metafile__set } from '../rebuildjs_browser/index.js'
import { server__metafile__set } from '../rebuildjs_server/index.js'
import { metafile__wait } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('metafile__wait|success', async ()=>{
	browser__metafile__set(app_ctx, undefined)
	server__metafile__set(app_ctx, undefined)
	let promise0_resolved = false
	metafile__wait(200).then(()=>promise0_resolved = true)
	equal(promise0_resolved, false)
	server__metafile__set(app_ctx, server__metafile0)
	equal(promise0_resolved, false)
	browser__metafile__set(app_ctx, browser__metafile0)
	await sleep(0)
	equal(promise0_resolved, true)
})
test('metafile__wait|failure', async ()=>{
	browser__metafile__set(app_ctx, undefined)
	server__metafile__set(app_ctx, undefined)
	let err:Error|undefined = undefined
	try {
		await metafile__wait(0)
	} catch (_err) {
		err = _err as Error
	}
	equal(err?.message, 'metafile__wait|browser__metafile & server__metafile timeout')
	equal((err?.cause as Error)?.message, 'Timeout 0ms')
})
test.run()
