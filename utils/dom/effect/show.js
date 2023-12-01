import {
	isFree
} from "../../type/isFree.js"

import {
	setStyle
} from "../css/css.js"

/**
 * 设置元素显示
 */
export function show() {
	if (!isFree(this)) {
		return this;
	}
	this.toArray().forEach(el => {
		setStyle(el, {
			display:'block'
		});
	});
}

/**
 * 设置元素隐藏
 */
export function hide() {
	if (!isFree(this)) {
		return this;
	}
	console.log(this)
	this.toArray().forEach(el => {
		setStyle(el, {
			display: 'none'
		});
	});
}