import { isDom } from "../../type/isDom";
import { isNotEmptyString } from "../../type/isNotEmptyString";

/**
 * 获取DOM元素
 * @param {String/DOM} selector 元素选择器或者DOM元素 
 * @param {Boolean} all 开启批量获取模式，当且仅当元素数量大于1
 */
export function getElement(selector,all){
	if(isDom(selector)){
		return selector;
	}else if(isNotEmptyString(selector)){
		if(selector === 'window'){
			return window;
		}else if(selector === 'document'){
			return document;
		}
		return all ? document.querySelectorAll(selector) : document.querySelector(selector);
	}else {
		return selector;
	}
}