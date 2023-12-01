import { isArray } from "../type/isArray.js";
import { isNumber } from "../type/isNumber.js";

/**
 * 删除数组指定位置上的元素
 * @param {Array} arr 数组 
 * @param {Number} index 索引
 * @return {Array} 被删除元素组成的数组
 */
export function del(arr, index) {
	arr = arr || [];
	index = index || 0;
	if(!isArray(arr,true,null,arguments)){
		return;
	}
	if(!isNumber(index,true,null,arguments)){
		return;
	}
	if (arr.length === 0) {
		return [];
	}
	return arr.splice(index, 1);
}