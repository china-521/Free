import {
	isNumber
} from "../type/isNumber.js"
/**
 * 十进制转十六进制
 * @param {Number} num 十进制数字 
 * @return {String}
 */
export function hex(num) {
	if (!isNumber(num, true, null, arguments)) {
		return;
	}
	return num.toString(16);
}