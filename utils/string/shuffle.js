import {
	isString
} from "../type/isString.js"
import {
	shuffle as arrayShuffle
} from "../array/shuffle.js"
import {
	toString
} from "../array/toString.js";

/**
 * 字符串随机排列
 * @param {Array} str 
 * @return {Array}
 */
export function shuffle(str) {
	if (!str) {
		return;
	}
	if (!isString(str, true, null, arguments)) {
		return;
	}
	return toString(arrayShuffle([...str]));
}