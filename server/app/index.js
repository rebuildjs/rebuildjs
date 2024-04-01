import { ns_id_be_lock_memosig_triple_, ns_id_be_memo_pair_, ns_id_be_sig_triple_ } from 'ctx-core/rmemo'
import { join, relative, resolve } from 'node:path'
export const [
	port$_,
	port_,
	port__set,
] = ns_id_be_sig_triple_(
	'app',
	'port',
	()=>
		process.env.PORT
			? parseInt(process.env.PORT)
			: 3000)
export const [
	cwd$_,
	cwd_,
	cwd__set,
] = ns_id_be_sig_triple_(
	'app',
	'cwd',
	()=>resolve('.'))
export const [
	is_prod$_,
	is_prod_,
	is_prod__set,
] = ns_id_be_lock_memosig_triple_(
	'app',
	'is_prod',
	()=>process.env.NODE_ENV === 'production')
export const [
	public_path$_,
	public_path_,
	public_path__set,
] = ns_id_be_lock_memosig_triple_(
	'app',
	'public_path',
	ctx=>
		join(cwd_(ctx), 'public'))
export const [
	dist_path$_,
	dist_path_,
	dist_path__set,
] = ns_id_be_lock_memosig_triple_(
	'app',
	'dist_path',
	ctx=>
		join(cwd_(ctx), 'dist'))
export const [
	dist__relative_path$_,
	dist__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'dist__relative_path',
	ctx=>
		relative(cwd_(ctx), dist_path_(ctx)))
export const [
	src_path$_,
	src_path_,
	src_path__set,
] = ns_id_be_lock_memosig_triple_(
	'app',
	'src_path',
	ctx=>
		join(cwd_(ctx), 'src'))
export const [
	src__relative_path$_,
	src__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'src__relative_path',
	ctx=>
		relative(cwd_(ctx), src_path_(ctx)))
export const [
	app_path$_,
	app_path_,
	app_path__set,
] = ns_id_be_lock_memosig_triple_(
	'app',
	'app_path',
	ctx=>
		join(src_path_(ctx), 'app'))
export const [
	app__relative_path$_,
	app__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'app__relative_path',
	ctx=>relative(cwd_(ctx), app_path_(ctx)))
export const [
	browser__relative_path$_,
	browser__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'browser_relative_path',
	ctx=>
		join(dist__relative_path_(ctx), is_prod_(ctx) ? 'browser' : 'browser--dev'))
export const [
	browser_path$_,
	browser_path_,
] = ns_id_be_memo_pair_(
	'app',
	'browser_path',
	ctx=>
		join(cwd_(ctx), browser__relative_path_(ctx)))
export const [
	server__relative_path$_,
	server__relative_path_,
] = ns_id_be_memo_pair_(
	'app',
	'server__relative_path',
	ctx=>
		join(dist__relative_path_(ctx), is_prod_(ctx) ? 'server' : 'server--dev'))
export const [
	server_path$_,
	server_path_,
] = ns_id_be_memo_pair_(
	'app',
	'server_path',
	ctx=>
		join(cwd_(ctx), server__relative_path_(ctx)))
