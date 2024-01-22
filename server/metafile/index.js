import { be_memo_pair_, nullish__none_, rmemo__wait } from 'ctx-core/rmemo'
import { browser__metafile_ } from '../rebuildjs_browser/index.js'
import { app_ctx } from '../ctx/index.js'
import { server__metafile_ } from '../rebuildjs_server/index.js'
export const [
	metafile__build_id$_,
	metafile__build_id_,
] = be_memo_pair_((ctx, build_id$)=>
	nullish__none_([server__metafile_(ctx), browser__metafile_(ctx)],
		(server__metafile, browser__metafile)=>
			server__metafile.build_id === browser__metafile.build_id
				? server__metafile.build_id
				: build_id$.val),
{ id: 'metafile__build_id', ns: 'app' })
export async function metafile__wait(timeout = 5000) {
	await rmemo__wait(
		metafile__build_id$_(app_ctx),
		metafile__build_id=>
			metafile__build_id != null,
		timeout
	).catch(err=>{
		throw Error(
			'metafile__wait|browser__metafile & server__metafile timeout',
			{ cause: err })
	})
}
