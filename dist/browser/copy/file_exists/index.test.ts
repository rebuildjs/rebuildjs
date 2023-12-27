import esmock from 'esmock'
import { unlink, writeFile } from 'fs/promises'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { tempfile_path_ } from '../tempfile_path/index.js'
import { file_exists_, file_exists__waitfor } from './index.js'
test('file_exists_ + file_exists__waitfor|server', async ()=>{
	const tempfile_path = await tempfile_path_()
	equal(await file_exists_(tempfile_path), false)
	await writeFile(tempfile_path, 'test content')
	try {
		await file_exists__waitfor(tempfile_path)
		equal(await file_exists_(tempfile_path), true)
	} finally {
		await unlink(tempfile_path)
	}
})
test('file_exists_ + file_exists__waitfor|browser', async ()=>{
	const { file_exists_, file_exists__waitfor } = await esmock('./index.js', {}, {
		'../process_release_name/index.js': {
			process_release_name: undefined
		}
	})
	const tempfile_path = await tempfile_path_()
	equal(await file_exists_(tempfile_path), false)
	await writeFile(tempfile_path, 'test content')
	let err:Error|undefined = undefined
	try {
		await file_exists__waitfor(tempfile_path, 10)
	} catch(_err) {
		err = _err as Error
	} finally {
		await unlink(tempfile_path)
	}
	equal(await file_exists_(tempfile_path), false)
	equal(err?.message, 'Timeout 10ms')
})
test.run()
