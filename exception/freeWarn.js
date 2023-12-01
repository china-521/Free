import warnMessage from "../config/configs/warnMessage.js";
import {
	warn
} from "./warn.js";

/**
 * 
 * @param {any} val 
 * @param {String} warnType 
 * @param {any} msg 
 */
export function freeWarn(val, warnType, msg) {
	if (!warnType && !msg) {
		return;
	}

	let warnMsg = "";

	if (msg) {
		warnMsg = msg;
	} else {
		if (warnType in warnMessage) {
			warnMsg = warnMessage[warnType];
		}
	}
	warn(warnMsg + '\n', val);
}