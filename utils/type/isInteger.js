import {
	exception
} from "../../exception/exception.js";
import {
	isNumber
} from "../type/isNumber.js"
import config from "../../config/index.js";
/**
 * 检查是否是整数类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isInteger(val, show, msg, params) {
	if (!isNumber(val, false)) {
		if (show) {
			if (msg) {
				exception(val, null, msg);
			}
			if (params) {
				exception(val, config.errorMessageKey.IntegerArgument, null, params);
			}
			exception(val, config.errorMessageKey.Integer);
		}
		return false;
	}
	let flag = (String(val).indexOf('.') === -1);
	if (!flag && show) {
		if (msg) {
			exception(val, null, msg);
		}
		if (params) {
			exception(val, config.errorMessageKey.IntegerArgument, null, params);
		}
		exception(val, config.errorMessageKey.Integer);
	}
	return flag;
}