export declare function file_exists_(path:string):Promise<boolean|undefined>
export {
	file_exists_ as path__exists_
}
export declare function file_exists__waitfor(
	path:string,
	timeout?:number,
	period?:number
):Promise<void>
