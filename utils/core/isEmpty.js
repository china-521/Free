import {
	isPlainObject
} from "../type/isPlainObject";

/**
 * 判断一个对象或数组或字符串是否为空
 * @param { Object/Array/String } val 
 * @returns {Boolean}
 */
export function isEmpty(val) {
	if (!val) {
		return true;
	}
	if (isPlainObject(val)) {
		return Reflect.ownKeys(val).length <= 0;
	}
	return Object.keys(val).length <= 0;
}