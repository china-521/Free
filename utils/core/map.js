/**
 * 
 * 创建一个新数组，其结果是 该数组中的每个元素是调用一次提供的方法后的返回值
 * 即返回一个由回调方法的返回值组成的新数组
 * @param {Array} arr
 * @param {Function} callback
 * @returns {Array}
 */
export function map(arr, callback) {
	if (arr && callback) {
		// 声明一个空数组
		let result = [];
		// 遍历数组
		for (let i = 0; i < arr.length; i++) {
			// 执行回调
			result.push(callback(arr[i], i));
		}
		// 返回结果
		return result;
	}
	return void 0;
}