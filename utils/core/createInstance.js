/**
 * 创建Fn构造函数的实例对象
 * @param {Function} Fn
 * @param {...any} args
 * @return {Object}
 */

export function createInstance(Fn, ...args) {
	if(!Fn){
		return void 0;
	}
	// 创建一个新对象
	const obj = {};
	// 修改函数内部 this 指向新对象并执行
	const result = Fn.call(obj, ...args);
	// 修改新对象的原型对象
	obj.__proto__ = Fn.prototype;
	// 返回新对象
	return result instanceof Object ? result : obj;
}