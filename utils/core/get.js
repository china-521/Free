import { isFree } from "../type/isFree.js";
import {
	isNumber
} from "../type/isNumber.js";
/**
 * 取得其中一个匹配的元素。 num表示取得第几个匹配的元素。从0开始，返回的是DOM对象，
 * 如果不传递参数，则返回一个包含所有元素的数组(该方法只对Free对象生效)
 * @param {Number} index 索引 
 * @returns {DOM} 
 */
export function get(index) {
	if(!isFree(this)){
		return this;
	}
	if (!index && !isNumber(index)) {
		return [].slice.call(this);
	}
	return index < 0 ? this[index + this.length] : this[index];
}