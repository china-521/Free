import {
	isArray
} from "../type/isArray.js"
/**
 * 数组求和
 * @param {Array<Number>} arr 
 * @return {Number}
 */
export function sum(arr) {
	arr = arr || [];
	if (!isArray(arr,true,null,arguments)) {
		return;
	}
	let initValue = 0;
	return arr.reduce((accumulator, currentValue) => accumulator + currentValue, initValue);
}