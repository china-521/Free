import {
	isObject
} from "../utils/type/isObject"
import {
	error
} from "../exception/error.js";
import {
	extend
} from "../extend/extend.js"

/**
 * 挂载方法
 */
export function methods() {
	const methods = this.$options.methods;
	if(!methods){
		this._methods = {};
	}
	if (!isObject(methods)) {
		error('Methods must be an object');
	}
	extend(methods, this, true);
	this._methods = methods;
}