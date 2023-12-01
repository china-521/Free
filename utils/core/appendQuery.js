import {
	isPlainObject
} from "../type/isPlainObject.js";
import {
	isString
} from "../type/isString.js";

/**
 * 向url追加query参数
 * @param {String} url
 * @param {Object} query 
 * @return {String}
 */
export function appendQuery(url, query) {
	if (!url) {
		return;
	}
	if (!isString(url, true, null, arguments)) {
		return;
	}
	if (!query) {
		return url;
	}
	if (!isPlainObject(query, true, null, arguments)) {
		return;
	}

	let queryStr = "";
	Object.keys(query).forEach((key, index) => {
		if (index === 0) {
			queryStr += key.concat('=').concat(query[key]);
		} else {
			queryStr += "&".concat(key).concat("=").concat(query[key]);
		}
	});
	if (url.includes('?')) {
		url += queryStr;
	} else {
		url += "?".concat(queryStr);
	}
	return url;
}