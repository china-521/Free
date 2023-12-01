import {
	isArray
} from "../type/isArray.js"
import {
	isObject
} from "../type/isObject.js"
import {
	isString
} from "../type/isString.js"
import {
	equals
} from "./equals.js";

/**
 * 判断某个属性是否属于某个对象或数组或字符串
 * @param {any} source 主元素
 * @param {any} item  要搜索的元素
 * @returns {Boolean}
 */
export function contains(source, item) {
	if (isArray(source)) {
		for (let i = 0; i < source.length; i++) {
			if (equals(source[i], item)) {
				return true;
			}
		}
		return false;
	} else if (isObject(source)) {
		return item in source;
	} else if (isString(source)) {
		return source.indexOf(item) > -1;
	} else {
		return false;
	}
}