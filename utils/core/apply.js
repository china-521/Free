/**
 *  改变方法this指向，执行方法并返回结果
 *  即执行Fn,使this为obj，并将args数组中的元素传给fn(功能等同于方法对象的apply方法),如果obj为null，则 this 指向全局对象
 *  @param {Function} Fn   要执行的方法
 *  @param {Object} obj   方法运行时this指向的对象
 *  @param {...any} args   方法运行时的传入的参数 
 */

export function apply(Fn, obj, ...args) {
	// 判断对象是否存在
	if (obj === undefined || obj === null || obj === NaN) {
		obj = globalThis;
	}
	// 为 obj 添加临时的方法
	obj.temp = Fn;
	// 执行方法
	let result = obj.temp(...args);
	// 删除临时属性
	delete obj.temp;
	// 返回结果
	return result;
}