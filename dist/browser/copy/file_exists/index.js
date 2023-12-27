console.log('file_exists_/index.js', {
	access: (await import('node:fs/promises')).access,
	readFile: (await import('node:fs/promises')).readFile,
})
// /**
//  * @param {string}path
//  * @private
//  */
export async function file_exists_(path) {
}
