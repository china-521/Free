import {
	isNumber
} from "../type/isNumber.js"
/**
 * 十进制转二进制
 * @param {Number} num 十进制数字 
 * @return {String}
 */
export function bin(num) {
	if (!isNumber(num, true, null, arguments)) {
		return;
	}
	return num.toString(2);
}