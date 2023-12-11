import config from "../../config/index.js";
import {
	exception
} from "../../exception/exception.js";
import {
	contains
} from "../core/contains.js";
import {
	isStyleName
} from "./isStyleName.js";
/**
 * 检查CSS样式是否合法
 * @param {String} name 样式名称
 * @param {any} val 样式值 
 * @param {Boolean} show 是否开启错误提示，true：开启提示，false：关闭提示
 * @param {any} msg 自定义错误消息
 * @param {Array} params 方法参数数组
 * @return  {Boolean}
 */
export function isStyle(name, val, show, msg, params) {
	let flag = false;

	if (!isStyleName(name)) {
		flag = false;
	} else {
		let el = document.createElement('em');
		let style = `${name}:${val}`;

		el.style.cssText = style;

		style = el.style.cssText;

		if (!style) {
			flag = false;
		}

		if (contains(style, name)) {
			flag = true;
		} else {
			flag = false;
		}

		el = null;
	}

	if (!flag && show) {
		let obj = {};
		obj[name] = val;
		if (msg) {
			exception(obj, null, msg);
		}
		if (params) {
			exception(obj, config.errorMessageKey.styleArgument, null, params);
		}
		exception(obj, config.errorMessageKey.style);
	}
	return flag;
}