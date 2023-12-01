import {
	hash
} from "./hash.js"

/**
 *  计算字符串的 hashCode
 * @param {String} val 
 * @returns {Number}
 */
function get(val) {
	let hash = 0;
	let h = hash;
	if (h === 0 && val.length > 0) {
		val = [...val];
		val.forEach((v, index) => {
			v = v.charCodeAt();
			h += v * Math.pow(31, (val.length - 1 - index));
		});
		hash = h;
	}
	return h;
}


/**
 * 计算 hashCode
 * @param {any} val 任意类型 
 * @returns {String}
 */
export function hashCode(val) {
	if (!val) {
		return undefined;
	}
	const hashValue = hash(val);
	return get(hashValue);
}