import config from "../../config/index.js";
import {
	exception
} from "../../exception/exception.js";
/**
 * 检查CSS样式名称是否合法
 * @param {String} val 样式名称 
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isStyleName(val, show, msg, params) {
	let styles = window.getComputedStyle(document.documentElement, null);
	let flag = (val in styles);
	if (!flag && show) {
		if (msg) {
			exception(val, null, msg);
		}
		if (params) {
			exception(val, config.errorMessageKey.styleNameArgument, null, params);
		}
		exception(val, config.errorMessageKey.styleName);
	}
	return flag;
}