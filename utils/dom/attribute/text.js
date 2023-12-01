import {
	isDom
} from "../../type/isDom.js";
import {
	isFree
} from "../../type/isFree.js";
import {
	getElement
} from "../element/getElement.js";
import {
	exception
} from "../../../exception/exception.js";
/**
 * 1. 如果不传递参数，则获取元素的文本内容
 * 2. 如果传递参数，则修改元素的文本内容
 * 
 * @param {DOM} el DOM元素
 * @param {any} val 任意类型数据
 */
export function _text(el, val) {
	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!val) {
		return el.innerText;
	}
	el.innerText = val;
}

/**
 * 1. 如果不传递参数，则获取元素的文本内容
 * 2. 如果传递参数，则修改元素的文本内容
 * @param {any} val 任意类型数据
 * @return {String}
 */
export function text(val) {
	if (!isFree(this)) {
		return this;
	}

	let text = '';

	this.toArray().forEach(el => {
		text += _text(el, val);
	});
	return text;
}