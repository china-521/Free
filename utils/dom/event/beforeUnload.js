import {
	call
} from "../../core/call.js";
import {
	isFunction
} from "../../type/isFunction.js";

/**
 * 页面重新加载事件
 * @param {Function} callback 回调函数 
 */
export function beforeUnload(callback){
	if (!callback) {
		return;
	}
	if (!isFunction(callback, true, null, arguments)) {
		return;
	}
	window.addEventListener('beforeunload', (e) => {
		call(callback,this,e);
	});
}