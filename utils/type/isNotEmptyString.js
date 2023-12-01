import {
	exception
} from "../../exception/exception.js";
import {
	isEmpty
} from "../core/isEmpty.js";
import {
	isString
} from "./isString.js";
/**
 * 检查是否是非空字符串类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isNotEmptyString(val, show, msg, params) {
	let flag = (isString(val) && !isEmpty(val));
	if (!flag && show) {
		if (msg) {
			exception(val, 'notEmptyString', msg);
		}
		if (params) {
			exception(val, 'notEmptyStringArgument', null, params);
		}
		exception(val, 'notEmptyString');
	}
	return flag;
}