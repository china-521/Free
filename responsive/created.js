import {
	isFunction
} from "../utils/type/isFunction.js";
import {
	error
} from "../exception/error.js";

/**
 * 挂载created()
 */
export function created() {
	const created = this.$options.created;
	if(!created){
		return;
	}
	if (!isFunction(created)) {
		error('created must be a Function');
	}
	this._created = created;
}