import config from "../../config/index.js";
import {
	exception
} from "../../exception/exception.js";
import {
	getType
} from "./getType.js";
/**
 * 检查是否是 RegExp 类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isRegExp(val, show, msg, params) {
	let flag = getType(val) === 'RegExp';
	if (!flag && show) {
		if (msg) {
			exception(val, null, msg);
		}
		if (params) {
			exception(val, config.errorMessageKey.RegExpArgument, null, params);
		}
		exception(val, config.errorMessageKey.RegExp);
	}
	return flag;
}