import {
	isDom
} from "../../type/isDom.js";
import {
	getElement
} from "./getElement.js";
import { exception } from "../../../exception/exception.js";

/**
 * 获取 DOM 元素的outerHTML
 * @param {String/DOM} el DOM元素或选择器
 * @return {String}
 */
export function getOuterHTML(el) {
	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (el.outerHTML) {
		return el.outerHTML;
	} else {
		let container = document.createElement('div');
		container.appendChild(el.cloneNode(true));
		return container.innerHTML;
	}
}