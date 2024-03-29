import { is_entry_file_ } from 'ctx-core/fs'
import { rebuildjs_browser__build, rebuildjs_server__build } from '../../server/build/index.js'
if (is_entry_file_(import.meta.url, process.argv[1])) {
	await rebuildjs_server__build()
	await rebuildjs_browser__build()
}
