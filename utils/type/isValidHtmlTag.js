import {
	exception
} from "../../exception/exception.js";
/**
 * 检查是否是合法的 html标签
 * @param {String} val html标签 
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isValidHtmlTag(val, show, msg, params) {
	// 使用正则表达式匹配标签名称
	let reg = /^<[a-zA-Z](.*?)>$/;
	let flag = reg.test(val);
	if (!flag && show) {
		if (msg) {
			exception(val, 'htmlTag', msg);
		}
		if (params) {
			exception(val, 'htmlTagArgument', null, params);
		}
		exception(val, 'htmlTag');
	}
	return flag;
}