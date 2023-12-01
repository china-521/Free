import {
	isArray
} from "../../utils/type/isArray.js"
import {
	isObject
} from "../../utils/type/isObject.js"

/**
 * 对象或数组的浅拷贝
 * @param {Object/Array} target 
 * @return
 */
export function shallowCopy(target) {
	if (isObject(target, false) || isArray(target, false)) {
		// 创建一个容器
		const result = isArray(target, false) ? [] : {};
		// 遍历 target 数据
		for (let key in target) {
			// 判断当前对象身上是否包含该属性(不能拷贝原型对象上的属性)
			if (target.hasOwnProperty(key)) {
				// 将属性设置到 result 结果数据中
				result[key] = target[key];
			}
		}
		return result;
	} else {
		return target;
	}
}