import {
	exception
} from "../../../exception/exception.js"
import {
	isAsyncFunction
} from "../../type/isAsyncFunction.js"
import {
	isDocument
} from "../../type/isDocument.js"
import {
	isDom
} from "../../type/isDom.js"
import {
	isFunction
} from "../../type/isFunction.js"
import {
	isNotEmptyString
} from "../../type/isNotEmptyString.js"
import {
	isWindow
} from "../../type/isWindow.js"
import {
	getElement
} from "../element/getElement.js"

/**
 * 为DOM元素绑定事件
 * @param {DOM/String} el DOM元素或选择器
 * @param {String} eventName 事件名称，如需绑定多个事件，请用空格分开事件名
 * @param {Function} fn 执行的函数
 * @param {Boolean/Object} options 可选配置项 
 */
function add(el, eventName, fn, options) {
	if (!el || !eventName || !fn) {
		return;
	}

	if (!isNotEmptyString(eventName, true, null, arguments)) {
		return;
	}

	if (!isFunction(fn) && !isAsyncFunction(fn)) {
		return;
	}

	eventName = eventName.replace('on', '');

	el = getElement(el);

	if (!isDom(el) && !isWindow(el) && !isDocument(el)) {
		exception(el, 'domIsNull');
	}

	eventName.split(' ').forEach(event => {
		el.addEventListener(event, fn, options);
	});
}

/**
 * 为多个DOM元素绑定事件
 * @param {DOM/String} el DOM元素或选择器
 * @param {String} eventName 事件名称，如需绑定多个事件，请用空格分开事件名
 * @param {Function} fn 执行的函数
 * @param {Boolean/Object} options 可选配置项 
 */
function addAll(el, eventName, fn, options) {
	if (!el || !eventName || !fn) {
		return;
	}

	if (!isNotEmptyString(eventName, true, null, arguments)) {
		return;
	}

	if (!isFunction(fn, true, null, arguments)) {
		return;
	}

	eventName = eventName.replace('on', '');

	let elements = getElement(el, true);

	if (elements) {
		elements.forEach(element => {
			eventName.split(' ').forEach(event => {
				element.addEventListener(event, fn, options);
			});
		});
	}
}


/**
 * 为DOM元素移除事件
 * @param {DOM/string} el DOM元素或选择器
 * @param {String} eventName 事件名称,如需移除多个事件，请用空格分开事件名
 * @param {Function} fn 执行的函数
 * @param {Boolean/Object} options 可选配置项 
 */
function remove(el, eventName, fn, options) {
	if (!el || !eventName || !fn) {
		return;
	}

	if (!isNotEmptyString(eventName, true, null, arguments)) {
		return;
	}

	if (!isFunction(fn, true, null, arguments)) {
		return;
	}

	eventName = eventName.replace('on', '');

	el = getElement(el);

	if (!isDom(el) && !isWindow(el) && !isDocument(el)) {
		exception(el, 'domIsNull');
	}

	eventName.split(" ").forEach(event => {
		el.removeEventListener(event, fn, options);
	});
}
/**
 * 为DOM元素移除事件
 * @param {DOM/String} el DOM元素或选择器
 * @param {String} eventName 事件名称，如需绑定多个事件，请用空格分开事件名
 * @param {Function} fn 执行的函数
 * @param {Boolean/Object} options 可选配置项 
 */
function removeAll(el, eventName, fn, options) {
	if (!el || !eventName || !fn) {
		return;
	}

	if (!isNotEmptyString(eventName, true, null, arguments)) {
		return;
	}

	if (!isFunction(fn, true, null, arguments)) {
		return;
	}

	eventName = eventName.replace('on', '');

	let elements = getElement(el, true);

	if (elements) {
		elements.forEach(element => {
			eventName.split(' ').forEach(event => {
				element.removeEventListener(event, fn, options);
			});
		});
	}
}


export default {
	add,
	addAll,
	remove,
	removeAll
}