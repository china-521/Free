import {
	call
} from "../../core/call.js";
import {
	isFunction
} from "../../type/isFunction.js";

/**
 * 进入页面事件
 * @param {Function} callback 回调函数 
 */
export function enterPage(callback) {
	if (!callback) {
		return;
	}
	if (!isFunction(callback, true, null, arguments)) {
		return;
	}
	window.addEventListener('visibilitychange', (e) => {
		if (e.target.visibilityState === "visible") {
			call(callback,this,e)
		}
	});
}