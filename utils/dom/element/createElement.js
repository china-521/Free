import {
	flatten
} from "../../array/flatten.js";
import {
	isDom
} from "../../type/isDom.js";
import {
	isNotEmptyArray
} from "../../type/isNotEmptyArray.js";
import {
	isNotEmptyString
} from "../../type/isNotEmptyString.js";
import attributeUtils from "../attribute/attribute.js"
import {
	setStyle
} from "../css/css.js"
import {
	_text
} from "../attribute/text.js";
import eventUtils from "../event/event.js"
import {
	isString
} from "../../type/isString.js";
import {
	isNumber
} from "../../type/isNumber.js";
import {
	isPlainObject
} from "../../type/isPlainObject.js";


/**
 * 创建DOM元素
 * @param {DOM} el DOM元素
 * @param {Object} attribute 为元素添加的属性对象
 * @param {Object} style 为元素添加的样式对象
 * @param {Array/DOM/String} children 元素的子元素(可以是一个DOM数组，或者html字符串数组，或者一个html字符串或者一个DOM元素)
 * @param {any} text 元素的文本
 * @param {String} event 事件名称
 * @param {Function} callback 事件执行的回调函数
 * @param {Boolean/Object} options 事件配置选项
 * @return {DOM}
 */
function handleElement({
	el,
	attribute,
	style,
	children,
	text,
	event,
	callback,
	options
}) {
	attributeUtils.set(el, attribute);
	setStyle(el, style);
	eventUtils.add(el, event, callback, options);
	_text(el, text);
	if (isNotEmptyArray(children)) {

		children = flatten(children);

		const fragment = document.createDocumentFragment();

		for (let i = 0, len = children.length; i < len; i++) {
			if (isDom(children[i])) {
				fragment.appendChild(children[i].cloneNode(true));
			} else {
				el.innerHTML = el.innerHTML + children[i];
			}
		}
		el.appendChild(fragment);
	} else {
		if (isDom(children)) {
			el.appendChild(children.cloneNode(true));
		} else if (isNotEmptyString(children)) {
			el.innerHTML = el.innerHTML + children;
		}
	}
	return el;
}


/**
 * 创建DOM元素
 * @param {Object} param 配置对象 
 * @param {String} tag 标签名
 * @param {Boolean} append 是否插入父元素
 * @param {String/DOM}  parent 父元素选择器或者父元素DOM
 * @param {Number} count 创建元素的数量
 * @param {Object} attribute 为元素添加的属性对象
 * @param {Object} style 为元素添加的样式对象
 * @param {Array/DOM/String} children 元素的子元素(可以是一个DOM数组，或者html字符串数组，或者一个html字符串或者一个DOM元素)
 * @param {any} text 元素的文本
 * @param {String} event 事件名称
 * @param {Function} callback 事件执行的回调函数
 * @param {Boolean/Object} options 事件配置选项
 * @return {DOM/NodeList}
 */
export function createElement({
	tag,
	append,
	parent,
	count,
	attribute,
	style,
	children,
	text,
	event,
	callback,
	options
}) {
	if (!tag) {
		return;
	}

	if (!isString(tag, true, null, arguments)) {
		return;
	}

	count = count || 1;

	if (!isNumber(count, true, null, arguments)) {
		return;
	}

	style = style || {};

	attribute = attribute || {};
	
	if (!isPlainObject(style, true, null, arguments) || !isPlainObject(attribute, true, null, arguments)) {
		return;
	}

	if (count <= 1) {
		const el = document.createElement(tag);
		const element = handleElement({
			el,
			attribute,
			style,
			children,
			text,
			event,
			callback,
			options
		});
		if (append && parent) {
			if (isDom(parent)) {
				parent.appendChild(element);
			} else if (isNotEmptyString(parent)) {
				parent = document.querySelector(parent);
				parent.appendChild(element);
			}
		}
		return el;
	}
	const fragment = document.createDocumentFragment();
	const els = [];
	for (let i = 0; i < count; i++) {
		const el = document.createElement(tag);
		const element = handleElement({
			el,
			attribute,
			style,
			children,
			text,
			event,
			callback,
			options
		});
		els.push(element);
	}
	if (append && parent) {
		for (let i = 0, len = els.length; i < len; i++) {
			fragment.appendChild(els[i]);
		}
		if (isDom(parent)) {
			parent.appendChild(fragment);
		} else if (isNotEmptyString(parent)) {
			parent = document.querySelector(parent);
			parent.appendChild(fragment);
		}
	}
	return els;
}