export declare function waitfor<V>(
	fn:()=>Promise<V>|V,
	timeout:number,
	period?:number
):Promise<V>&{ cancel: ()=>Promise<V> }
