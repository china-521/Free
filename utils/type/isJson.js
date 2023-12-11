import {
	exception
} from "../../exception/exception.js"
import {
	isNull
} from "./isNull.js";
import config from "../../config/index.js";
/**
 * 检查是否是 JSON 类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isJson(val, show, msg, params) {
	let flag = false;
	try {
		JSON.parse(val);
		val || isNull(val) ? flag = true : flag = false;
	} catch (e) {
		if (show) {
			if (msg) {
				exception(val, null, msg);
			}
			if (params) {
				exception(val, config.errorMessageKey.JsonArgument, null, params);
			}
			exception(val, config.errorMessageKey.Json);
		}
	}
	return flag;
}