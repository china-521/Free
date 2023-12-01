import {
	isDom
} from "../../type/isDom.js";
import {
	flatten
} from "../../array/flatten.js";
import {
	isFree
} from "../../type/isFree.js";
import {
	isNotEmptyString
} from "../../type/isNotEmptyString.js"
import {
	isNotEmptyArray
} from "../../type/isNotEmptyArray.js";
import {
	getElement
} from "../element/getElement.js";
import {
	exception
} from "../../../exception/exception.js";
import {
	isPlainObject
} from "../../type/isPlainObject.js";
/**
 * 获取元素上的属性个数
 * @param {DOM} el DOM元素 
 * @return {Number}
 */
export function size(el) {
	if (!el) {
		return 0;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	return el.attributes.length;
}

/**
 * 为 DOM 元素设置属性
 * @param {DOM} el DOM元素 
 * @param {Object} attribute 属性对象
 */
export function set(el, attribute) {

	if (!el || !attribute) {
		return false;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!isPlainObject(attribute, true, null, arguments)) {
		return;
	}
	Object.keys(attribute).forEach(key => {
		el.setAttribute(key, attribute[key]);
	});
	return true;
}

/**
 * 获取元素属性
 * @param {DOM} el DOM元素 
 * @param  {...String} attributes 属性名
 * @return {Object}
 */
export function get(el, ...attributes) {

	if (!el || !attributes) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	attributes = flatten(attributes);
	let result = {};
	if (attributes.length) {
		result = [];
		attributes.forEach(attribute => {
			if (el.getAttribute(attribute)) {
				result.push(el.getAttribute(attribute));
			}
		});
	} else {
		const keyList = keys(el);
		keyList.forEach(key => {
			result[key] = el.attributes.getNamedItem(key).value;
		});
	}
	return result;
}

/**
 * 移除元素属性
 * @param {DOM} el DOM元素 
 * @param  {...String} attributes 属性名
 * @return {Object}
 */
export function remove(el, ...attributes) {

	if (!el || !attributes) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	attributes = flatten(attributes);
	let result = {};
	attributes.forEach(attribute => {
		if (has(el, attribute)) {
			const value = el.getAttribute(attribute);
			result[attribute] = value;
			el.removeAttribute(attribute);
		}
	});
	return result;
}

/**
 * 判断指定的attribute是否在DOM元素中
 * @param {DOM} el DOM元素 
 * @param {String} attribute 属性名
 * @return {Boolean}
 */
export function has(el, attribute) {

	if (!el || !attribute) {
		return false;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	return el.hasAttribute(attribute);
}

/**
 * 取出DOM元素中的所有属性的名称
 * @param {DOM} el DOM元素
 * @return {Array}
 */
export function keys(el) {
	let result = [];

	if (!el) {
		return result;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	const attributes = Object.values(el.attributes);
	attributes.forEach(attribute => {
		result.push(attribute.name);
	});
	return result;
}

/**
 * 取出DOM元素中的所有属性对象
 * @param {DOM} el DOM元素
 * @return {Array}
 */
export function values(el) {

	if (!el) {
		return [];
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	return Object.values(el.attributes);
}

/**
 * 清除DOM元素中的所有属性的名称
 * @param {DOM} el DOM元素
 * @return {Object}
 */
export function clear(el) {

	if (!el) {
		return {};
	}

	return remove(el, keys(el));
}

/**
 * 设置属性值
 * @param {String} type 操作类型，
 * @param {String/Object/Array} attribute 属性名称或属性对象或属性数组
 * @param {String} value 属性值
 * @return 
 */
export function attr(type, attribute, value) {

	if (!isFree(this)) {
		return this;
	}

	const types = {
		size: 'size',
		get: 'get',
		set: 'set',
		remove: 'remove',
		clear: 'clear',
		has: 'has',
		keys: 'keys',
		values: 'values'
	};

	type = type || types.get;

	if (type === types.get) {
		return isNotEmptyString(attribute) ? get(this.get(0), attribute.split(' ')) : get(this.get(0));
	} else if (type === types.size) {
		return size(this.get(0));
	} else if (type === types.set) {
		if (isNotEmptyString(attribute) && value) {
			let obj = {};
			obj[attribute] = value;
			this.toArray().forEach(el => {
				set(el, obj);
			});
		} else if (isPlainObject(attribute)) {
			this.toArray().forEach(el => {
				set(el, attribute);
			});
		}
	} else if (type === types.remove) {
		if (isNotEmptyString(attribute)) {
			this.toArray().forEach(el => {
				remove(el, attribute.split(' '));
			});
		} else if (isPlainObject(attribute)) {
			this.toArray().forEach(el => {
				remove(el, Object.keys(attribute));
			});
		} else if (isNotEmptyArray(attribute)) {
			this.toArray().forEach(el => {
				remove(el, attribute);
			});
		}
	} else if (type === types.clear) {
		this.toArray().forEach(el => {
			clear(el);
		});
	} else if (type === types.has) {
		return has(this.get(0), attribute);
	} else if (type === types.keys) {
		return keys(this.get(0));
	} else if (type === types.values) {
		return values(this.get(0));
	} else {
		return get(this.get(0));
	}
}

export default {
	size,
	set,
	get,
	remove,
	has,
	keys,
	values,
	clear,
	attr
}