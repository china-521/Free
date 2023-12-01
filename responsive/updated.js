import {
	isFunction
} from "../utils/type/isFunction.js";
import {
	error
} from "../exception/error.js";
/**
 * 挂载updated()
 */
export function updated() {
	const updated = this.$options.updated;
	if(!updated){
		return;
	}
	if (!isFunction(updated)) {
		error('updated must be a Function');
	}
	this._updated = updated;
}