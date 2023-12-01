import {
	error
} from "../exception/error.js"
import {
	isFunction
} from "../utils/type/isFunction.js"
import {
 	proxyData
} from "./proxy.js"
import {
	isPlainObject
} from "../utils/type/isPlainObject.js"

/**
 * 挂载配置对象中的数据
 */
export function data() {
	const data = this.$options.data;
	if (!data) {
		this._data = {};
	}
	if (isFunction(data)) {
		const _data = data();
		if (!isPlainObject(_data, true, "The return value of data must be an plain object")) {
			return;
		}
		this._data = _data;
	} else if (isPlainObject(data)) {
		this._data = data;
	} else {
		error('Data must be an Object or a Function');
	}
	proxyData(this._data,this);
}