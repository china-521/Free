import {
	exception
} from "../../exception/exception.js";
import {
	isEmpty
} from "../core/isEmpty.js";
import {
	isArray
} from "./isArray.js";
import config from "../../config/index.js";
/**
 * 检查是否是空数组类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isEmptyArray(val, show, msg, params) {
	let flag = (isArray(val) && isEmpty(val));
	if (!flag && show) {
		if (msg) {
			exception(val, null, msg);
		}
		if (params) {
			exception(val, config.errorMessageKey.emptyArrayArgument, null, params);
		}
		exception(val, config.errorMessageKey.emptyArray);
	}
	return flag;
}