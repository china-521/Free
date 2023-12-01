import {
	exception
} from "../../exception/exception.js";
import {
	getType
} from "./getType.js";
/**
 * 检查是否是对象类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isObject(val, show, msg, params) {
	let flag = (getType(val) === 'Object' || typeof val === 'object') && getType(val) !== 'Null';
	if (!flag && show) {
		if (msg) {
			exception(val, 'Object', msg);
		}
		if (params) {
			exception(val, 'ObjectArgument', null, params);
		}
		exception(val, 'Object');
	}
	return flag;
}