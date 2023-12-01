import {
	isString
} from "../type/isString.js";

/**
 * 获取url中的query参数
 * @param {String} url 请求的url 
 * @return {Object}
 */
export function getQuery(url) {
	if (!url) {
		return;
	}
	if (!isString(url, true, null, arguments)) {
		return;
	}
	const reg = /([^?&=]+)=([^?&=]+)/g;
	const obj = {};
	url.replace(reg, function () {
		obj[arguments[1]] = arguments[2];
	});
	return obj;
}