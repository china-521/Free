import {
	isPlainObject
} from "../type/isPlainObject.js"
import {
	stringify
} from "../core/stringify.js"
import {
	isArray
} from "../type/isArray.js"
import {
	flatten
} from "../array/flatten.js"
import {
	toJson
} from "../core/toJson.js"
import {
	isJson
} from "../type/isJson.js"
import {
	isWindow
} from "../type/isWindow.js"
import {
	isEmpty
} from "../core/isEmpty.js"

/**
 * 设置本地存储
 * @param {String/Object} key 保存的key， 字符串或者对象 
 * @param {*} value 保存的值
 * @return {Boolean}
 */
export function set(key, value) {
	if (!key) {
		return false;
	}

	if (isPlainObject(key)) {
		Object.keys(key).forEach(v => {
			if (isArray(key[v]) || isPlainObject(key[v]) || isWindow(key[v])) {
				sessionStorage.setItem(v, toJson(key[v]));
			} else {
				sessionStorage.setItem(v, stringify(key[v]));
			}
		});
	} else {
		if (isArray(value) || isPlainObject(value) || isWindow(value)) {
			sessionStorage.setItem(key, toJson(value));
		} else {
			sessionStorage.setItem(key, stringify(value));
		}
	}
	return true;
}

/**
 * 获取本地存储的值
 * @param  {...any} keys 本地存储的 key
 * @return {Object}
 */
export function get(...keys) {
	keys = flatten(keys);
	let result = {};
	for (let i = 0, len = keys.length; i < len; i++) {
		let value = sessionStorage.getItem(keys[i]);
		if (!value) {
			continue;
		}
		if (isJson(value)) {
			value = JSON.parse(value);
		}
		result[keys[i]] = value;
	}
	return result;
}

/**
 * 清空本地存储
 */
export function clear() {
	sessionStorage.clear();
}

/**
 * 移除本地存储的值，返回一个包含所有被移除的属性的对象
 * @param  {...any} keys 本地存储的 key
 * @return {Object}
 */
export function remove(...keys) {
	keys = flatten(keys);
	let result = {};
	for (let i = 0, len = keys.length; i < len; i++) {
		let value = sessionStorage.getItem(keys[i]);
		if (!value) {
			continue;
		}
		if (isJson(value)) {
			value = JSON.parse(value);
		}
		result[keys[i]] = value;
		sessionStorage.removeItem(keys[i]);
	}
	return result;
}

/**
 *  获取本地存储数量
 * 	@returns {Number}
 */

function size() {
	return sessionStorage.length;
}

/**
 * 检查指定的属性是否存在 
 * @param {String} key 属性的key
 * @return {Boolean}
 */
function has(key) {
	return !isEmpty(sessionStorage.getItem(key));
}

/**
 * 获取本地存储的key集合
 * @returns {Array}
 */
function keys() {
	return Object.keys(sessionStorage);
}

/**
 * 获取本地存储的value集合
 * @return {Array}
 */
function values() {
	return Object.values(get(keys()));
}

export default {
	set,
	get,
	clear,
	remove,
	size,
	has,
	keys,
	values,
}