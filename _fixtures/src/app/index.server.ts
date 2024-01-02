import './index.server.css'
import { assets_ } from '../../../asset/index.js'
import { type middleware_ctx_T, route_ctx_ } from '../../../ctx/index.js'
export default (middleware_ctx:middleware_ctx_T)=>{
	return (request:Request)=>{
		const route_ctx = route_ctx_(middleware_ctx)
		return new Response(
			'<!DOCTYPE html>' +
			'<html>' +
			'<head>' +
			assets_(route_ctx).css_a.map(css=>
				'<link rel="stylesheet" type="text/css" href="' + css + '"></link>'
			).join('') +
			assets_(route_ctx).script_a.map(script=>
				'<script type="module" src="' + script + '"></script>'
			).join('') +
			'</head>' +
			'<body>' +
			'<div>' +
			request.url +
			'</div>' +
			'</body>' +
			'</html>',
			{
				headers: {
					'Content-Type': 'text/html;charset=UTF-8'
				}
			})
	}
}
