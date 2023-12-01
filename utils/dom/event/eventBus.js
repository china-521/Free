/**
 * 功能说明：
 * 		- 全局事件总线
 *      -绑定事件，分发事件，解绑事件，自定义事件名称，代码解耦。
 * 参数说明：
 *      @param {Object} callbacks 包含所有功能的事件总线对象
 *      @param {String} type 自定义事件名称
 *      @param {Function} callback 回调函数
 *      @param {*} data  回调函数传入的数据
 *      @param {String} eventName 需要销毁的事件名称
 */

let callbacks = {};

/**
 * 事件绑定
 * @param {String} type 事件类型 
 * @param {Function} callback 回调函数
 */
function $on(type, callback) {
	// 判断
	if (callbacks[type]) {
		// 如果 callbacks 属性中存在该类型事件
		callbacks[type].push(callback);
	} else {
		// 如果 callbacks 属性中不存在该类型事件
		callbacks[type] = [callback];
	}
}

/**
 * 事件分发
 * @param {String} type 事件类型 
 * @param {*} data 方法执行的参数
 */
function $emit(type, data) {
	// 判断
	if (callbacks[type] && callbacks[type].length > 0) {
		// 遍历数组
		callbacks[type].forEach(callback => {
			// 执行回调
			callback(data);
		});
	}
}

/**
 * 销毁事件
 * @param {String} eventName 事件名称
 */
function $off(eventName) {
	// 若传入了 eventName 事件名称
	if (eventName) {
		// 只是删除 eventName 对应的事件回调
		delete callbacks[eventName]
	} else {
		callbacks = {};
	}
}



export default {
	callbacks,
	$on,
	$emit,
	$off
}