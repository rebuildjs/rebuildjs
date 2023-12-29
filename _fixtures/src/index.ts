import { is_entry_file_ } from 'ctx-core/fs'
import { browser__build, server__build } from '../../build/index.js'
is_entry_file_(import.meta.url, process.argv[1])
	.then(async is_entry_file=>{
		if (is_entry_file) {
			await server__build()
			await browser__build()
		}
	})
