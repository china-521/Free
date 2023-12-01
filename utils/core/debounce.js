/**
 * 函数防抖
 * 创建一个防抖方法，该方法会从上一次被调用后，延迟 time 毫秒后调用
 * @param {Function} callback
 * @param {Number} time  时间间隔
 */
export function debounce(callback, time) {
	time = time || 0;
	// 定时器标识
	let timer = null;
	// 返回一个方法
	return function (Event) {
		// 关闭上一次的定时器
		clearTimeout(timer);
		// 启动定时器
		timer = setTimeout(() => {
			// 执行回调
			callback(this, Event);
		}, time)
	}
}