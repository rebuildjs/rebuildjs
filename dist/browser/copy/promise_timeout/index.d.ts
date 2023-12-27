export declare function promise_timeout<O>(
	promise:(()=>Promise<O>)|Promise<O>,
	ms:number,
	error?:Error
):Promise<O>
