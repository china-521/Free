import {
	call
} from "../../core/call.js";
import {
	isFunction
} from "../../type/isFunction.js";

/**
 * 离开页面事件
 * @param {Function} callback 回调函数 
 */
export function leavePage(callback) {
	if (!callback) {
		return;
	}
	if (!isFunction(callback, true, null, arguments)) {
		return;
	}
	window.addEventListener('visibilitychange', (e) => {
		if (e.target.visibilityState !== "visible") {
			call(callback,this,e)
		}
	});
}