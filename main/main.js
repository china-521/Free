import {
	isDom
} from "../utils/type/isDom.js"
import {
	isString
} from "../utils/type/isString.js"
import {
	isPlainObject
} from "../utils/type/isPlainObject.js"
import {
	responsive
} from "../responsive/responsive.js"

/**
 * Free 对象/方法
 * @param {String/Object/Function} selector 选择器
 * @returns 
 */
function Free(selector) {
	return new Free.fn.init(selector);
}

let _$ = window.$;
let __ = window._;
let _Free = window.Free;

/**
 * 释放 Free、_、$的使用权，避免冲突
 * @param {Boolean} deep 是否放弃Free和_的使用权，true：放弃；false：不放弃，仅仅放弃$的使用权
 * @returns {Object} Free 
 */
Free.noConflict = function (deep) {

	if (window.$ === Free) {
		window.$ = _$;
	}

	if (deep && window.Free) {
		window.Free = _Free;
	}

	if (deep && window._) {
		window._ = __;
	}

	return Free;
}

// 开启日志提示
Free.logTip = true;


// 用户 Free 对象的初始化
Free.fn = Free.prototype;

/**
 * 用于构造Free实例
 * @param {any} selector 选择器
 */
let init = Free.fn.init = function (selector) {
	if (!selector) {
		return this;
	} else if (isDom(selector)) {
		this[0] = selector;
		this.length = 1;
	} else if (isString(selector)) {
		const eles = document.querySelectorAll(selector);
		Array.prototype.push.apply(this, eles);
		this.selector = selector;
	} else if (isPlainObject(selector)) {
		responsive(this, selector);
	}
	return this;
}

init.prototype = Free.fn;

// 将Free挂载到window对象上
window.$ = window._ = window.Free = Free;

// 对外暴露Free
export default Free;