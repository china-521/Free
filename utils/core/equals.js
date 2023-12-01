import {
	isObject
} from "../type/isObject.js";
import {
	isArray
} from "../type/isArray.js";
/**
 * 通过比较内容来判断两个值是否相等
 * @param {Array/Object} val1 
 * @param {Array/Object} val2 
 */
export function equals(val1, val2) {
	if ((!isObject(val1) || !isObject(val2))) {
		return Object.is(val1, val2);
	}
	if (val1 === val2) {
		return true;
	}

	if (isArray(val1) && isArray(val2)) {
		if (val1.length !== val2.length) {
			return false;
		}
		for (let i = 0; i < val1.length; i++) {
			let flag = false;
			for (let j = 0; j < val2.length; j++) {
				const res = equals(val1[i], val2[j]);
				if (res) {
					flag = true;
					break;
				}else {
					flag = false;
				}
			}
			if(!flag){
				return false;
			}
		}
		return true;
	} else if (isObject(val1) && isObject(val2)) {
		const val1Key = Object.keys(val1);
		const val2Key = Object.keys(val2);

		if (val1Key.length !== val2Key.length) {
			return false;
		}

		for (const key of val1Key) {
			if (!val2Key.includes(key)) {
				return false;
			}
			const res = equals(val1[key], val2[key]);
			if (!res) {
				return false;
			}
		}
		return true;
	}
}