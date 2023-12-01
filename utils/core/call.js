/**
 *  改变方法this指向，执行方法并返回结果
 *  即执行Fn,使this为obj，并将后面的n个参数传给fn(功能等同于方法对象的call方法),如果obj为null，则 this 指向全局对象
 * @param {Function} Fn   要执行的方法
 * @param {Object} obj    方法运行时this指向的对象
 * @param {...any} args   方法运行时的参数(可多个)
 * @returns {any}
 */
export function call(Fn, obj, ...args) {
	// 判断
	if (obj === undefined || obj === null || obj === NaN) {
		obj = globalThis;
	}
	// 为 obj 添加临时的方法
	obj.temp = Fn;
	// 调用 temp 方法
	let result = obj.temp(...args);
	// 删除 temp 方法
	delete obj.temp;
	// 返回执行结果
	return result;
}