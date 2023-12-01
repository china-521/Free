import {
	equals
} from "../core/equals.js";
import {
	isArray
} from "../type/isArray.js";

/**
 * 查找指定元素在数组中的索引，如果没有找到，则返回 -1
 * @param {Array} arr 数组
 * @param {any} target 待查找元素 
 * @param {Boolean} strict  开启严格模式，true：对于引用类型将比对内容，false：对于引用类型将比对地址值 
 * @return {Array} 索引数组
 */
export function search(arr, target, strict) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (!arr.length) {
		return -1;
	}
	
	for (let i = 0, len = arr.length; i < len; i++) {
		if(strict){
			if(equals(arr[i],target)){
				return i;
			}
		}else {
			if(arr[i] === target){
				return i;
			}
		}
	}
	return -1;
}