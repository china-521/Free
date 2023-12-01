import {
	equals
} from "../core/equals.js";
import {
	isArray
} from "../type/isArray.js";
/**
 * 判断指定元素是否属于某个数组
 * @param {Array} arr 数组 
 * @param {any} item 待判断的元素
 * @param {Boolean} strict 开启严格模式，true：对于引用类型将比对内容，false：对于引用类型将比对地址值 
 * @return {Boolean}
 */
export function contains(arr, item, strict) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	let flag = false;
	if (strict) {
		for (let i = 0, len = arr.length; i < len; i++) {
			if (equals(arr[i], item)) {
				flag = true;
				break;
			}
		}
	} else {
		flag = arr.includes(item);
	}
	return flag;
}