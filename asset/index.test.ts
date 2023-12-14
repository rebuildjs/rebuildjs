import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { asset_path_ } from './index.js'
test('asset_path_', async ()=>{
	let in_path:string|undefined
	const mod_ = async (path:string)=>{
		in_path = path
		return { default: './path.png' }
	}
	equal(in_path, undefined)
	equal(await asset_path_(mod_('./path.png')), '/path.png')
	equal(in_path, './path.png')
})
test.run()
