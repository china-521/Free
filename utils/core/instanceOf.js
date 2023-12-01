
import {
	isFunction
} from "../type/isFunction.js";
import {
	isObject
} from "../type/isObject.js";

/**
 * 判断 第一个参数 是否在 第二个参数的原型链上
 * @param {Object/Function} obj
 * @param {Function} Fn
 * @return {Boolean}
 */
export function instanceOf(obj, Fn) {
	if (!obj || !Fn) {
		return false;
	}
	if (!isObject(obj)) {
		return false;
	}
	if (!isFunction(Fn)) {
		return false;
	}
	// 获取函数的显示原型
	let prototype = Fn.prototype;
	// 获取 obj 的隐式原型对象
	let proto = obj.__proto__;
	// 遍历原型链
	while (proto) {
		// 检测原型对象是否相等
		if (prototype === proto) {
			return true;
		} else {
			proto = proto.__proto__;
		}
	}
	return false;
}