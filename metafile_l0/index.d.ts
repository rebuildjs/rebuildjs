import type { Metafile } from 'esbuild'
export type rebuildjs_metafile_T = Metafile&{
	inputs:Metafile['inputs']
	outputs:{
		[path:string]:Metafile['outputs'][string]&{
			esbuild_cssBundle?:string
			cssBundle_content?:string[]
		}
	}
	rebuildjs_target?:'browser'|'server'
	build_id?:string
}
