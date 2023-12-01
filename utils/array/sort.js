import {
	isArray
} from "../type/isArray.js";

/**
 * 本地比较
 * @param {any} a 参数1
 * @param {any} b 参数2
 * @return {Number} 
 */
function localeCompare(a, b) {
	return a.localeCompare(b);
}


/**
 *	对数组进行排序,默认按照编码大小排序
 *	通过传递一个函数实现按字典排序：(a, b) => a.localeCompare(b)
 * @param {Array} arr  待排序数组
 * @param {Boolean} locale true：按照字典排序，false：按照编码排序
 * @param {Boolean} flag  false：递增排序，true：递减排序
 */
export function sort(arr, local, flag) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	if (local) {
		return flag ? arr.sort(localeCompare).reverse() : arr.sort(localeCompare);
	}
	return flag ? arr.sort().reverse() : arr.sort();
}