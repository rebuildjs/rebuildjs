/// <reference types="bun-types" />
/// <reference types="./index.d.ts" />
import { file, Glob } from 'bun'
import { ext_R_mime } from 'ctx-core/http'
import { extname, join } from 'node:path'
import { browser_path_ } from '../app/index.js'
import { app_ctx } from '../ctx/index.js'
/**
 * @param {static_middleware__config_T}[config]
 * @returns {Promise<{get:(path:string, handler:Function)=>void}>}
 */
export async function static_middleware__routes_(config) {
	const routes = []
	const glob = new Glob('**')
	for await (const relative_path of glob.scan(browser_path_(app_ctx))) {
		const url_path = join('/', relative_path)
		const content_type = ext_R_mime[extname(relative_path)] ?? 'text/plain'
		const path = join(browser_path_(app_ctx), relative_path)
		const headers = (config?.headers_ ?? (()=>({})))(
			url_path,
			content_type,
			path)
		routes.push({
			url_path,
			handler: ()=>{
				const file_ref = file(path)
				return new Response(file_ref.size ? file_ref.stream() : '', {
					headers: {
						'Content-Type': content_type,
						...headers,
					}
				})
			}
		})
	}
	return routes
}
