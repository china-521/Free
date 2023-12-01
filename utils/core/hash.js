import {
	isString
} from "../type/isString.js";
import {
	stringify
} from "./stringify.js";

const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

/**
 * 计算hash值
 * @param {any} val 任意类型
 * @param {String}
 */
export function hash(val) {
	if (!val) {
		return undefined;
	}
	if (isString(val)) {
		let hash = 5381;
		let i = val.length - 1;

		if (isString(val)) {
			for (; i > -1; i--) {
				hash += (hash << 5) + val.charCodeAt(i);
			}
		} else {
			for (; i > -1; i--) {
				hash += (hash << 5) + val[i];
			}
		}
		let value = hash & 0x7FFFFFFF;

		let hashValue = '';
		do {
			hashValue += I64BIT_TABLE[value & 0x3F];
		}
		while (value >>= 6);

		return hashValue;
	} else {
		val = stringify(val);
		return hash(val);
	}

}