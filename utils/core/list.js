import { isFree } from "../type/isFree.js";
/**
 * 输出 Free 中的方法个数(包括Free函数身上和Free原型对象身上)
 * 该方法只对Free对象生效
 * @returns {Number}
 */
export function list(){
	if(isFree(this)){
		return Object.keys(this).length + Object.keys(this.prototype).length;
	}
	return 0;
}