import {
	contains
} from "../core/contains.js";
import {
	exception
} from "../../exception/exception.js";
import config from "../../config/index.js";
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
	let eventName;
	if (!reg.test(val)) {
		eventName = 'on' + val;
	}
	let flag = contains(document.documentElement, eventName);
	if (!flag && show) {
		if (msg) {
			exception(val, config.errorMessageKey.event, msg);
		}
		if (params) {
			exception(val, config.errorMessageKey.eventArgument, null, params);
		}
		exception(val, config.errorMessageKey.event);
	}
	return flag;
}