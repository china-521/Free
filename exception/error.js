import config from "../config/index.js"
import {
	contains
} from "../utils/core/contains.js";
/**
 * 用来抛出一个异常
 * @param {*} msg 自定义异常信息 
 * @param {String} errorType 错误类型， 从 config.errorMessage 中的错误类型中进行比对
 */
export function error(msg, errorType) {
	const pre = '[Free Error]:';
	if (errorType && contains(config.errorMessage, errorType)) {
		msg = config.errorMessage[errorType];
	}
	throw new Error(pre + msg);
}