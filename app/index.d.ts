import { be_memo_pair_ } from 'ctx-core/rmemo'
import type { be_lock_memosig_triple_T, be_memo_pair_T, be_sig_triple_T } from 'ctx-core/rmemo'
export const [
	port$_,
	port_,
	port__set
]: be_sig_triple_T<number>
export const [
	cwd$_,
	cwd_,
	cwd__set,
]: be_sig_triple_T<string>
export const [
	is_prod$_,
	is_prod_,
	is_prod__set,
]: be_lock_memosig_triple_T<string>
export const [
	public_path$_,
	public_path_,
	public_path__set,
]:be_lock_memosig_triple_T<string>
export const [
	dist_path$_,
	dist_path_,
	dist_path__set,
]:be_lock_memosig_triple_T<string>
export const [
	src_path$_,
	src_path_,
	src_path__set,
]:be_lock_memosig_triple_T<string>
export const [
	src__relative_path$_,
	src__relative_path_,
]:be_memo_pair_T<string>
export const [
	app_path$_,
	app_path_,
	app_path__set,
]:be_lock_memosig_triple_T<string>
export const [
	app__relative_path$_,
	app__relative_path_,
]:be_memo_pair_T<string>
export const [
	browser__relative_path$_,
	browser__relative_path_,
]:be_memo_pair_T<string>
export const [
	browser_path$_,
	browser_path_,
	browser_path__set,
]:be_lock_memosig_triple_T<string>
export const [
	server__relative_path$_,
	server__relative_path_,
]:be_memo_pair_T<string>
export const [
	server_path$_,
	server_path_,
	server_path__set,
]:be_lock_memosig_triple_T<string>
