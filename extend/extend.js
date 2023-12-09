import Free from '../main/main.js'
import config from '../config/index.js'
import {
	isObject
} from '../utils/type/isObject.js'
import {
	isFunction
} from '../utils/type/isFunction.js'
import {
	exception
} from '../exception/exception.js'
import {
	freeWarn
} from '../exception/freeWarn.js'
import {
	isEmpty
} from '../utils/core/isEmpty.js'

/**
 * 扩展Free对象身上的方法
 * @param {Object/Function} instance  配置对象/函数
 * @param {Object/Function} target 目标对象/函数，默认是Free
 * @param {Boolean} flag 设置扩展模式，false：如果目标是对象则扩展到目标对象上，如果目标是函数，则扩展到目标的原型对象上
 * @returns {Object}
 */
export function extend(instance, target, flag) {
	target = target || Free;
	let extendResult = {
		instance: instance,
		target: target,
		conflictInstance: {},
		state: false,
	};
	if (!instance) {
		return extendResult;
	}
	if (!isObject(instance) && !isFunction(instance)) {
		exception(instance, 'extendParamArgument',null,arguments);
	}
	if (!isObject(target) && !isFunction(target)) {
		exception(target, 'extendParamArgument',null,arguments);
	}
	if (isObject(instance) && isObject(target)) {
		if (isEmpty(instance)) {
			return extendResult;
		}
		Object.keys(instance).forEach(key => {
			if (key in target) {
				extendResult.conflictInstance[key] = instance[key];
			} else {
				target[key] = instance[key];
				extendResult.state = true;
			}
		});
	} else if (isFunction(instance) && isObject(target)) {
		const funName = instance.name;
		if (funName in target) {
			extendResult.conflictInstance[funName] = instance;
		} else {
			target[funName] = instance;
			extendResult.state = true;
		}
	} else if (isObject(instance) && isFunction(target)) {
		if (isEmpty(instance)) {
			return extendResult;
		}
		Object.keys(instance).forEach(key => {
			if (key in target.prototype) {
				extendResult.conflictInstance[key] = instance[key];
			} else {
				if (flag) {
					target[key] = instance[key];
				} else {
					target.prototype[key] = instance[key];
				}
				extendResult.state = true;
			}
		});
	} else if (isFunction(instance) && isFunction(target)) {
		const funName = instance.name;
		if (funName in target.prototype) {
			extendResult.conflictInstance[funName] = instance;
		} else {
			if (flag) {
				target[funName] = instance;
			} else {
				target.prototype[funName] = instance;
			}
			extendResult.state = true;
		}
	}
	if (!isEmpty(extendResult.conflictInstance)) {
		freeWarn(config.warnMessageKey.extendConflict,null,extendResult);
	}
	return extendResult;
}