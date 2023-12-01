import {
	isFunction
} from "../type/isFunction.js";

/**
 * 为一个对象添加方法，可以实现方法的重载
 * @param {Object} obj 挂载对象
 * @param {String} name 方法名
 * @param {Function} fn 方法
 */
export function addMethod(obj, name, fn) {
	if (!obj || !name || !fn) {
		return;
	}
	const older = obj[name];
	obj[name] = function (...args) {
		if (args.length === fn.length) {
			return fn.apply(this, args);
		} else if (isFunction(older)) {
			return older.apply(this, args);
		}
	}
}