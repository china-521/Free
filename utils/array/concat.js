import {
	isArray
} from "../type/isArray.js";

/**
 * 数组合并：将 n 个数组或值与当前数组合并生成一个新数组
 * @param {Array} arr 数组 
 * @param {...any} args 参数
 * @return {Array} 
 */
export function concat(arr, ...args) {
	if (!arr) {
		return [];
	}
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	// 声明一个空数组
	const result = [...arr];
	// 遍历数组
	args.forEach(item => {
		// 判断 item 是否为数组
		if (isArray(item)) {
			// 将数组 item 展开再存入
			result.push(...item);
		} else {
			// 将非数组 item 直接存入
			result.push(item);
		}
	});
	// 返回结果
	return result;
}