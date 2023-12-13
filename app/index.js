import { be_lock_memosig_triple_, be_memo_pair_, be_memosig_triple_, be_sig_triple_ } from 'ctx-core/rmemo'
import { join, relative, resolve } from 'path'
import { app_ctx__be_config } from '../ctx/index.js'
export const [
	port$_,
	port_,
	port__set,
] = be_sig_triple_(()=>
	process.env.PORT
		? parseInt(process.env.PORT)
		: 3000,
{ ...app_ctx__be_config, id: 'port' })
export const [
	cwd$_,
	cwd_,
	cwd__set,
] = be_sig_triple_(()=>
	resolve('.'),
{ ...app_ctx__be_config, id: 'cwd' })
export const [
	is_prod$_,
	is_prod_,
	is_prod__set,
] = be_lock_memosig_triple_(()=>
	process.env.NODE_ENV === 'production',
{ ...app_ctx__be_config, id: 'is_prod' })
export const [
	public_path$_,
	public_path_,
	public_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(cwd_(ctx), 'public'),
{ ...app_ctx__be_config, id: 'public_path' })
export const [
	dist_path$_,
	dist_path_,
	dist_path__set,
] = be_memosig_triple_(ctx=>
	join(cwd_(ctx), 'dist'),
{ ...app_ctx__be_config, id: 'dist_path' })
export const [
	src_path$_,
	src_path_,
	src_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(cwd_(ctx), 'src'),
{ ...app_ctx__be_config, id: 'src_path' })
export const [
	src__relative_path$_,
	src__relative_path_,
] = be_memo_pair_(ctx=>
	relative(cwd_(ctx), src_path_(ctx)),
{ ...app_ctx__be_config, id: 'src__relative_path' })
export const [
	app_path$_,
	app_path_,
	app_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(src_path_(ctx), 'app'),
{ ...app_ctx__be_config, id: 'app_path' })
export const [
	app__relative_path$_,
	app__relative_path_,
] = be_memo_pair_(ctx=>
	relative(cwd_(ctx), app_path_(ctx)),
{ ...app_ctx__be_config, id: 'app__relative_path' })
export const [
	browser__relative_path$_,
	browser__relative_path_,
] = be_memo_pair_(ctx=>
	join('dist', is_prod_(ctx) ? 'browser' : 'browser__relative_path'),
{ ...app_ctx__be_config, is: 'browser_relative_path' })
export const [
	browser_path$_,
	browser_path_,
	browser_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(cwd_(ctx), browser__relative_path_(ctx)),
{ ...app_ctx__be_config, id: 'browser_path' })
export const [
	server__relative_path$_,
	server__relative_path_,
] = be_memo_pair_(ctx=>
	join('dist', is_prod_(ctx) ? 'server' : 'dev-server'),
{ ...app_ctx__be_config, id: 'server__relative_path' })
export const [
	server_path$_,
	server_path_,
	server_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(cwd_(ctx), server__relative_path_(ctx)),
{ ...app_ctx__be_config, id: 'server_path' })
