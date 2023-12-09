import config from "../../../config/index.js"
import {
	isFree
} from "../../type/isFree.js"
import {
	isString
} from "../../type/isString.js"
import {
	isPlainObject
} from "../../type/isPlainObject.js"
import {
	isDom
} from "../../type/isDom.js"
import {
	isStyle
} from "../../type/isStyle.js"
import {
	contains
} from "../../core/contains.js"
import {
	isEmpty
} from "../../core/isEmpty.js"
import {
	isNotEmptyString
} from "../../type/isNotEmptyString.js"
import {
	isNotEmptyObject
} from "../../type/isNotEmptyObject.js"
import {
	trimAll
} from "../../string/trimAll.js"
import {
	getElement
} from "../element/getElement.js"
import {
	exception
} from "../../../exception/exception.js"
/**
 * 为特殊的样式自动添加单位，例如width
 * @param {Object} css CSS对象
 * @return {Object}
 */
function addUnit(css) {
	if (!isPlainObject(css)) {
		return {};
	}
	const px = config.style.px;
	const pureNumberReg = /^\d+$/;
	Object.keys(css).forEach(styleName => {
		if (contains(px, styleName) && pureNumberReg.test(css[styleName])) {
			css[styleName] = css[styleName] + 'px';
		}
	});
	return css;
}

/**
 * 解析样式名称，将样式名称中包含大写的字母处理为 '-' + 字母小写的格式
 * 例如 'backgroundColor' ===> 'background-color'
 * @param {String} name 样式名称 
 * @return {String}
 */
function parseStyleName(name) {
	const reg = /[A-Z]/g;
	if (!reg.test(name)) {
		return name;
	}
	const matchResult = name.match(reg);
	matchResult.forEach(result => {
		name = name.replace(result, '-' + result.toLowerCase());
	});
	return name;
}

/**
 * 获取元素的cssText
 * @param {DOM/String} el DOM元素 
 * @return {String}
 */
export function getCssText(el) {
	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	return el.style.cssText;
}

/**
 * 将 cssText 字符串 解析为 样式对象
 * @param {String} cssText cssText
 * @return {Object}
 */
export function parseCssText(cssText) {
	if (!cssText) {
		return;
	}
	if (!isNotEmptyString(cssText, true, null, arguments)) {
		return;
	}
	let result = {};
	cssText.split(";").filter(style => {
		return !isEmpty(style) && contains(style, ':') && isStyle(style.split(':')[0].trim(), style.split(':')[1]);
	}).forEach(css => {
		let cssArr = css.split(':');
		result[trimAll(cssArr[0])] = cssArr[1];
	});
	return result;
}

/**
 * 将 样式对象 转换为 cssText 字符串
 * @param {Object} style 样式对象 
 * @return {String}
 */
export function toCssText(style) {
	if (!style) {
		return;
	}
	if (!isPlainObject(style, true, null, arguments)) {
		return;
	}
	let result = '';

	// 为特殊样式自动添加单位
	style = addUnit(style);

	Object.keys(style).forEach(styleName => {
		// 拷贝一份样式值
		const value = style[styleName];
		styleName = parseStyleName(styleName);
		if (isStyle(styleName, value)) {
			result += `${styleName}:${value};`;
		}
	});

	return result;
}


/**
 * 将样式对象转换为 cssTextremind
 * @param {Object} style 样式对象 
 * @param {String} olderCssText cssText，如果不存在，则直接将style对象转换为cssText,如果存在，则和 style 进行比对，将重复的样式替换掉，返回一个新的cssText
 * @return {String}
 */
export function _toCssText(style, olderCssText) {
	style = style || {};

	if (!isPlainObject(style, true, null, arguments)) {
		return;
	}

	// 特殊样式自动添加单位
	style = addUnit(style);

	if (isNotEmptyObject(style) && isNotEmptyString(olderCssText)) {
		let olderStyle = parseCssText(olderCssText);
		Object.keys(style).forEach(styleName => {
			// 拷贝一份样式值
			const styleValue = style[styleName];
			// 处理 css 中的元素样式名称
			styleName = parseStyleName(styleName);
			// 如果是合法的 CSS 样式，才能进行下一步处理
			if (isStyle(styleName, styleValue)) {
				olderStyle[styleName] = styleValue;
			}
		});
		style = olderStyle;
	}
	return toCssText(style);
}

/**
 * 获取元素指定的样式
 * @param {DOM/String} el DOM元素 
 * @param {String} name 样式名称
 * @return { String }
 */
export function getStyle(el, name) {
	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	const styles = window.getComputedStyle(el, null);

	return styles.getPropertyValue(name);
}

/**
 * 为元素设置样式
 * @param {DOM/String} el DOM元素 
 * @param {Object} css 样式对象 
 * @return {String}
 */
export function setStyle(el, css) {
	if (!el || !css) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!isPlainObject(css, true, null, arguments)) {
		return;
	}
	const cssText = _toCssText(css, getCssText(el));
	el.style.cssText = cssText;
	return cssText;
}

/**
 * 为元素设置css样式
 * @param {any} name 样式名称(String)或样式对象(Object)
 * @param {any} [value] 样式值(String或Number)
 * @return {Free}
 */
export function css(name, value) {
	if (!isFree(this)) {
		return this;
	}

	if (!name) {
		return this;
	}
	// 如果key为字符串类型，且value不存在，则读取样式
	if (isString(name) && !value) {
		return getStyle(this[0], name);
	}

	// 如果key为字符串，且 value 存在，则为元素设置样式（设置单个样式）
	else if (isString(name) && value) {
		const css = {};
		css[name] = value;
		this.toArray().forEach(el => {
			setStyle(el, css);
		});
	}

	// 如果key为对象类型，则为元素设置样式（设置多个样式）
	else if (isPlainObject(name)) {
		this.toArray().forEach(el => {
			setStyle(el, name);
		});
	}
	return this;
}