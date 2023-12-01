import errorMessage from "../config/configs/errorMessage.js"
import {
	equals
} from "../utils/core/equals.js"
import {
	error
} from "./error.js"
import {
	getType
} from "../utils/type/getType.js"
import {
	toJson
} from "../utils/core/toJson.js"
import {
	isPlainObject
} from "../utils/type/isPlainObject.js"
import {
	isEmpty
} from "../utils/core/isEmpty.js"

/**
 * 输出异常,并指出错误的数据和数据类型
 * @param {any} val 任意值 
 * @param {String} errorType 错误类型， 从 config.errorMessage 中的错误类型中进行比对
 * @param {any} msg 自定义错误信息
 */
export function exception(val, errorType, msg, params) {
	if (!errorType && !msg) {
		return;
	}

	let errorMsg = "";

	if (msg) {
		errorMsg = msg;
	} else {
		if (errorType in errorMessage) {
			errorMsg = errorMessage[errorType];
		}
		if (params) {
			const param = handleParams(val, params);
			errorMsg = errorMsg.replace(/\{(.*?)\}/, (key, index) => {
				return param.index ? param.index : '';
			});
		}
	}
	error(errorMsg + '\n\t[Error Type]:' + `${getType(val)} ~ ${toJson(val)}`);
}

/**
 * 处理参数
 * @param {any} val 
 * @param {Array} params 
 * @returns 
 */
function handleParams(val, params) {
	params = params || [];
	let result = {};
	params = Array.from(params);
	if (params.length === 1 && isPlainObject(params[0])) {
		const obj = params[0];
		Object.keys(obj).forEach(key => {
			if (equals(val, obj[key])) {
				result['index'] = '"' + key + '"';
				result['value'] = val;
			}
		});
		if (isEmpty(result)) {
			result['index'] = 1;
			result['value'] = val;
		}
	} else {
		for (let i = 0, len = params.length; i < len; i++) {
			if (equals(val, params[i])) {
				result['index'] = i + 1;
				result['value'] = val;
				break;
			}
		}
	}
	return result;
}