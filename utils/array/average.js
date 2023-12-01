import {
	flatten
} from "./flatten.js";
import {
	isArray
} from "../type/isArray.js";
import {
	sum
} from "./sum.js";
/**
 * 数组求平均值
 * @param {Array<Number>} arr 数组
 * @return {Number}
 */
export function average(arr) {
	arr = arr || [];
	if (!isArray(arr, true, null, arguments)) {
		return;
	}
	arr = flatten(arr);
	return arr.length ? sum(arr) / arr.length : 0;
}