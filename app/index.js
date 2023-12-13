import { be_lock_memosig_triple_, be_memosig_triple_, be_sig_triple_ } from 'ctx-core/rmemo'
import { join, resolve } from 'path'
import { app_ctx__be_config } from 'relysjs'
export const [
	port$_,
	port_,
	port__set,
] = be_sig_triple_(()=>
	process.env.PORT
		? parseInt(process.env.PORT)
		: 3000,
app_ctx__be_config)
export const [
	cwd$_,
	cwd_,
	cwd__set,
] = be_sig_triple_(()=>
	resolve('.'),
app_ctx__be_config)
export const [
	is_prod$_,
	is_prod_,
	is_prod__set,
] = be_lock_memosig_triple_(()=>
	process.env.NODE_ENV === 'production',
app_ctx__be_config
)
export const [
	dist_path$_,
	dist_path_,
	dist_path__set,
] = be_memosig_triple_(ctx=>
	join(cwd_(ctx), 'dist'),
app_ctx__be_config)
export const [
	public_path$_,
	public_path_,
	public_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(cwd_(ctx), 'public'),
app_ctx__be_config)
export const [
	src_path$_,
	src_path_,
	src_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(cwd_(ctx), 'src'),
app_ctx__be_config)
export const [
	app_path$_,
	app_path_,
	app_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(src_path_(ctx), 'app'),
app_ctx__be_config)
export const [
	browser_path$_,
	browser_path_,
	browser_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(dist_path_(ctx), is_prod_(ctx) ? 'browser' : 'dev-browser'),
app_ctx__be_config)
export const [
	server_path$_,
	server_path_,
	server_path__set,
] = be_lock_memosig_triple_(ctx=>
	join(dist_path_(ctx), is_prod_(ctx) ? 'server' : 'dev-server'),
app_ctx__be_config)
