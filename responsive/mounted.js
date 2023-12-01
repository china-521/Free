import {
	isFunction
} from "../utils/type/isFunction.js";
import {
	error
} from "../exception/error.js";

/**
 * 挂载mounted()
 */
export function mounted() {
	const mounted = this.$options.mounted;
	if(!mounted){
		return;
	}
	if (!isFunction(mounted)) {
		error('mounted must be a Function');
	}
	this._mounted = mounted;
}