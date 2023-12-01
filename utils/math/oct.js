import {
	isNumber
} from "../type/isNumber.js"
/**
 * 十进制转八进制
 * @param {Number} num 十进制数字 
 * @return {String}
 */
export function oct(num) {
	if (!isNumber(num, true, null, arguments)) {
		return;
	}
	return num.toString(8);
}