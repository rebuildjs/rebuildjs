import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { asset_path_, asset_path_a_ } from './index.js'
test('asset_path_', async ()=>{
	equal(await asset_path_(mod_('./path.png')), '/path.png')
})
test('asset_path_a_', async ()=>{
	equal(await asset_path_a_(
		mod_('./path0.png'),
		mod_('./path1.png'),
		mod_('./path2.png'),
		mod_('./path3.png'),
	), [
		'/path0.png',
		'/path1.png',
		'/path2.png',
		'/path3.png',
	])
})
test.run()
async function mod_(out_path:string) {
	return { default: out_path }
}
