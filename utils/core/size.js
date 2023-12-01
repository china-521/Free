import { isFree } from "../type/isFree.js"
/**
 *  获取 Free 对象中元素的个数。(该方法只对Free对象生效)
 * @returns {Number}
 */
export function size(){
	if(isFree(this)){
		return this.length;
	}
	return 0;
}