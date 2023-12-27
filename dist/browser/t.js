import esmock from 'esmock'
// fail
// await esmock.p('./index.js', import.meta.url, {}, {
// success
// await esmock.p('./all/file_exists/index.js', import.meta.url, {}, {
// success
// await esmock.p('./copy/file_exists/index.js', import.meta.url, {}, {
// fail
await esmock.p('./t0.js', import.meta.url, {}, {
	'node:fs/promises': {
		access: 'ESMOCK_access',
		readFile: 'ESMOCK_readFile',
	}
})
