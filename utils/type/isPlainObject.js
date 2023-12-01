import {
	exception
} from "../../exception/exception.js";
/**
 * 严格的对象类型检查
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isPlainObject(val, show, msg, params) {
	let flag = Object.prototype.toString.call(val) === '[object Object]';
	if (!flag && show) {
		if (msg) {
			exception(val, 'plainObject', msg);
		}
		if (params) {
			exception(val, 'plainObjectArgument', null, params);
		}
		exception(val, 'plainObject');
	}
	return flag;
}