import {
	exception
} from "../../exception/exception.js";
import {
	isEmpty
} from "../core/isEmpty.js";
import {
	isObject
} from "./isObject.js";
import config from "../../config/index.js";
/**
 * 检查是否是空对象类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isEmptyObject(val, show, msg, params) {
	let flag = (isObject(val) && isEmpty(val));
	if (!flag && show) {
		if (msg) {
			exception(val, null, msg);
		}
		if (params) {
			exception(val, config.errorMessageKey.emptyObjectArgument, null, params);
		}
		exception(val, config.errorMessageKey.emptyObject);
	}
	return flag;
}