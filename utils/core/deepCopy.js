/**
 * 对象或数组的深拷贝(递归拷贝)
 * @param {Array/Object} target 目标对象或数组
 * @param {Map} map 映射(容器)
 * @returns {Array/Object}
 */

import {
	isArray
} from "../../utils/type/isArray.js";
import {
	isObject
} from "../../utils/type/isObject.js";

export function deepCopy(target, map) {
	//检测数据类型
	if (isObject(target) || isArray(target)) {
		// 判断数据之前是否克隆过
		map = map || new Map();
		let hasCopy = map.get(target);
		if (hasCopy) {
			return hasCopy;
		}
		// 判断目标数据的类型
		let isArrayFlag = isArray(target);
		// 创建一个容器
		const result = isArrayFlag ? [] : {};
		// 将新的结果存储到容器中
		map.set(target, result);
		// 如果目标数据是数组
		if (isArrayFlag) {
			// forEach遍历
			target.forEach((item, index) => {
				result[index] = deepCopy(item, map);
			});
		} else {
			// 如果目标数据是对象，获取所有的键名，然后 forEach 遍历
			Object.keys(target).forEach(key => {
				result[key] = deepCopy(target[key], map);
			});
		}
		return result;
	} else {
		return target;
	}
}