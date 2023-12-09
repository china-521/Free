import config from "../config/index.js"
import {
	warn
} from "./warn.js";

/**
 * 警告日志，主要用于Free内部的警告信息
 * @param {String} warnType 警告类型 
 * @param {any} msg 自定义警告信息
 * @param {any} val 警告输出值
 */
export function freeWarn(warnType, msg,...val) {
	if (!warnType && !msg) {
		return;
	}

	let warnMsg = "";

	if (msg) {
		warnMsg = msg;
	} else {
		if (warnType in config.warnMessage) {
			warnMsg = config.warnMessage[warnType];
		}
	}
	warn(warnMsg + '\n', ...val);
}