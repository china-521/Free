import {
	contains
} from "../core/contains.js";
import {
	exception
} from "../../exception/exception.js";
/**
 * 检查是否是合法的事件
 * @param {String} val 事件名称
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return {Boolean}
 */
export function isEvent(val, show, msg, params) {
	const reg = /^on/;
	if (!reg.test(val)) {
		val = 'on' + val;
	}
	let flag = contains(document.documentElement, val);
	if (!flag && show) {
		if (msg) {
			exception(val, 'event', msg);
		}
		if (params) {
			exception(val, 'eventArgument', null, params);
		}
		exception(val, 'event');
	}
	return flag;
}