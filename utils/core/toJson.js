import {
	decycle
} from './decycle.js'
import {
	isArray
} from '../../utils/type/isArray.js'
import {
	isObject
} from '../../utils/type/isObject.js'

/**
 * 将数组或对象转换为 JSON 字符串
 * @param {Object/Array} val 
 * @returns String
 */
export function toJson(val) {
	return (isObject(val) || isArray(val)) ? JSON.stringify(decycle(val)) : JSON.stringify(val);
}