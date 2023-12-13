import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { app_ctx } from '../ctx/index.js'
import { server__metafile$_ } from './index.js'
test('server__metafile', async ()=>{
	equal(server__metafile$_(app_ctx)._, undefined)
})
test.run()
