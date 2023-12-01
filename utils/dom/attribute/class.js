import {
	isDom
} from "../../type/isDom.js";
import {
	isString
} from "../../type/isString.js";
import {
	isFree
} from "../../type/isFree.js";
import {
	getElement
} from "../element/getElement.js";
import {
	exception
} from "../../../exception/exception.js";

/**
 * 返回DOM元素上的class的数量
 * @param {DOM} el DOM元素
 * @param {Number}
 */
export function size(el) {
	if (!el) {
		return 0;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	if (!el.attributes.class) {
		return 0;
	}
	return el.attributes.class.value.split(' ').length;
}

/**
 * 获取DOM元素上的class值
 * @param {DOM} el el DOM元素
 * @return {String}
 */
export function get(el) {

	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!el.attributes.class) {
		return;
	}
	return el.attributes.class.value;
}

/** 
 * 判断一个元素中是否含有指定的class属性值 
 * @param {DOM} el DOM元素，如果不传，则判断的是Free对象身上的DOM，如果传递，则判断该DOM
 * @param {String} className 要添加的class值（类名）。字符串形式
 * @return {Boolean}
 */
export function has(el, className) {

	if (!el || !className) {
		return false;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!isString(className)) {
		return false;
	}
	const reg = new RegExp("\\b" + className + "\\b");
	return reg.test(el.className);
}

/** 
 * 为每个匹配的元素添加指定的类名。
 * @param {DOM} el DOM元素，如果不传，则设置的是Free对象身上的DOM，如果传递，则设置该DOM
 * @param {String} className 要添加的class值（类名），一个或多个要添加到元素中的CSS类名，需要用空格分开
 */
export function add(el, className) {
	if (!el || !className) {
		return
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	if (!isString(className, true, null, arguments)) {
		return;
	}
	className.split(' ').forEach(value => {
		if (!has(el, value)) {
			el.classList.add(value);
		}
	});
}

/** 
 * 为每个匹配的元素移除指定的类名。
 * @param {DOM} el DOM元素，如果不传，则设置的是Free对象身上的DOM，如果传递，则设置该DOM
 * @param {String} className 要移除的class值（类名）,一个或多个要移除的 CSS 类名，需要用空格分开
 */
export function remove(el, className) {

	if (!el || !className) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!isString(className, true, null, arguments)) {
		return;
	}

	className.split(' ').forEach(value => {
		if (has(el, value)) {
			el.classList.remove(value);
		}
	})
	if (el.classList.length <= 0 && el.attributes.class) {
		el.removeAttribute('class');
	}
}

/** 
 * 如果元素中具有该类，则删除,如果元素中没有该类，则添加
 * @param {DOM} el DOM元素，如果不传，则设置的是Free对象身上的DOM，如果传递，则设置该DOM  
 * @param {String} className 类名
 */
export function toggle(el, className) {
	if (has(el, className)) {
		return remove(el, className);
	} else {
		return add(el, className);
	}
}

/** 
 * 为每个匹配的元素移除所有的类名。
 * @param {DOM} el DOM元素，如果传入这个DOM元素，则清除该DOM元素上的class，否则清除Free对象上的DOM元素的class
 */
export function clear(el) {

	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (el.attributes.class) {
		el.removeAttribute('class');
	}
}

/**
 * 操作元素的类属性
 * @param {String} type 操作类型，'add'：增加类，'remove'：移除类，'clear'：清空类，'has'：'判断该类是否存在','toggle'：新增或删除类,'size'：返回元素class的数量
 * @param {String} className 类名 
 * @return {Free} Free/Boolean/String
 */
export function _class(type, className) {
	if (!isFree(this)) {
		return this;
	}

	const types = {
		add: 'add',
		get: 'get',
		remove: 'remove',
		clear: 'clear',
		toggle: 'toggle',
		has: 'has',
		size: 'size'
	};

	type = type || types.get;

	if (type === types.get) {
		return get(this.get(0));
	} else if (type === types.add) {
		this.toArray().forEach(el => {
			add(el, className);
		});
	} else if (type === types.remove) {
		this.toArray().forEach(el => {
			remove(el, className);
		});
	} else if (type === types.clear) {
		this.toArray().forEach(el => {
			clear(el);
		});
	} else if (type === types.toggle) {
		this.toArray().forEach(el => {
			toggle(el, className);
		});
	} else if (type === types.has) {
		return has(this.get(0), className);
	} else if (type === types.size) {
		return size(this.get(0));
	}
	return this;
}

export default {
	get,
	add,
	remove,
	clear,
	toggle,
	has,
	size,
	_class
}