import {
	isArray
} from "../type/isArray.js"
import {
	isPlainObject
} from "../type/isPlainObject.js"
import {
	isNumber
} from "../type/isNumber.js"
import {
	isDom
} from "../type/isDom.js"
import {
	isFunction
} from "../type/isFunction.js"
import {
	toJson
} from "./toJson.js"
import {
	isWindow
} from "../type/isWindow.js"
/**
 * 将任意类型数据转换为字符串
 * @param {any} val 数据源
 * @returns {String}
 */
export function stringify(val) {
	if (!val) {
		val = val + '';
	} else if (isArray(val)) {
		val = val.toString();
	} else if (isPlainObject(val)) {
		val = toJson(val);
	} else if (isNumber(val)) {
		val = val.toString();
	} else if (isWindow(val)) {
		val = toJson(val);
	} else if (isDom(val)) {
		let tempNode = document.createElement('div');
		tempNode.appendChild(val.cloneNode(true));
		val = tempNode.innerHTML;
		tempNode = null;
	} else if (isFunction(val)) {
		val = val.toString();
	} else {
		val = val.toString();
	}
	return val;
}