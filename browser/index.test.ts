import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { app_ctx } from '../ctx/index.js'
import { browser__metafile$_ } from './index.js'
test('server__metafile', async ()=>{
	equal(browser__metafile$_(app_ctx)._, undefined)
})
test.run()
