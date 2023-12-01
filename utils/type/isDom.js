import {
	exception
} from "../../exception/exception.js";
/**
 * 检查是否是Dom类型
 * @param {any} val 任意值
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isDom(val, show, msg, params) {
	let flag = (typeof HTMLElement === 'object') ?
		(function () {
			return val instanceof HTMLElement;
		})() :
		(function () {
			return val && typeof val === 'object' && val.nodeType === 1 && typeof val.nodeName === 'string';
		})();
	if (!flag && show) {
		if (msg) {
			exception(val, 'Dom', msg);
		}
		if (params) {
			exception(val, 'DomArgument', null, params);
		}
		exception(val, 'Dom');
	}
	return flag;
}