import {
	call
} from "../../core/call.js";
import {
	isAsyncFunction
} from "../../type/isAsyncFunction.js"
import {
	isFree
} from "../../type/isFree.js"
import {
	isFunction
} from "../../type/isFunction.js"
import event from "./event.js"

/**
 * 添加点击事件
 * @param {Function} callback 执行的回调方法
 * @param {...any} params 需要在回调中执行的参数
 * @returns {Free}
 */
export function click(callback, ...params) {
	if (!isFree(this) || !callback) {
		return this;
	}

	if (!isFunction(callback) && !isAsyncFunction(callback)) {
		return;
	}
	this.toArray().forEach(el => {
		event.add(el, 'click', (e) => {
			e.data = params;
			call(callback, this, e);
		});
	});
	return this;
}