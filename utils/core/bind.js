/******************************************【bind方法】****************************************/
/**
 *  改变方法this指向，并返回一个新的方法
 *  给Fn绑定this为obj，并指定参数为后面的n个参数(功能等同于方法对象的bind方法)
 *  @param {Function} Fn   要执行的方法
 *  @param {Object} obj    方法运行时this指向的对象
 *  @param {...any} args   方法运行时的传入的参数
 *  @returns {Function}
 */
import {
	call
} from "./call.js";
export function bind(Fn, obj, ...args) {
	// 返回一个新的方法
	return function (...args2) {
		// 执行 call 方法
		return call(Fn, obj, ...args, ...args2);
	}
}