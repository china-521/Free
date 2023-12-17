import config from "../../../config/index.js";
import { exception } from "../../../exception/exception.js";
import { isDom } from "../../type/isDom";
import {
	isFree
} from "../../type/isFree.js";
import {
	getElement
} from "../element/getElement.js";

/**
 * 得到第一个匹配元素的html内容
 * @param {String/DOM} 元素选择器或DOM元素
 * @param {any} val 
 */
export function $html(el, val) {
	if(!el && !val){
		return;
	}else if(!el && val){
		return;
	}else if(el && !val){
		el = getElement(el);
		if(!isDom(el)){
			exception(el,config.errorMessageKey.domIsNull);
		}
		return el.innerHTML;
	}else {
		el = getElement(el);
		if(!isDom(el)){
			exception(el,config.errorMessageKey.domIsNull);
		}
		el.innerHTML = val;
	}
}


/**
 * 得到第一个匹配元素的html内容
 * @param {any} val 
 */
export function html(val) {
	if (!isFree(this)) {
		return this;
	}

	const el = this.get(0);

	if (!el && !val) {
		return;
	} else if (!el && val) {
		return this;
	} else if (el && !val) {
		return el.innerHTML;
	} else {
		el.innerHTML = val;
	}
	return this;
}