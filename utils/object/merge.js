import {
	flatten
} from '../array/flatten.js';

/**
 * 合并多个对象，返回一个合并后对象(不改变原对象)
 * @param  {...any} multiObject 多个对象
 * @return {Object} 
 */
export function merge(...multiObject) {
	// 声明一个空对象
	const result = {};
	if (multiObject.length === 0) {
		return result;
	}
	// 数组扁平化
	multiObject = flatten(multiObject);
	// 遍历所有的参数对象
	multiObject.forEach(obj => {
		// 获取当前对象所有的属性
		Object.keys(obj).forEach(key => {
			// 监测 result 中是否存在 key 属性
			if (result.hasOwnProperty(key)) {
				result[key] = [].concat(result[key], obj[key]);
			} else {
				// 如果没有，则直接写入
				result[key] = obj[key];
			}
		})
	});
	return result;
}