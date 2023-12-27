import esmock from 'esmock'
// await esmock.p('./index.js', import.meta.url, {}, {
// await esmock.p('./all/file_exists/index.js', import.meta.url, {}, {
await esmock.p('./t0.js', import.meta.url, {}, {
	'node:fs/promises': {
		access: 'ESMOCK_access',
		readFile: 'ESMOCK_readFile',
	}
})
