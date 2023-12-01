import {
	flatten
} from "../array/flatten.js";
import attributeUtils from "../dom/attribute/attribute.js"
/**
 * 动态导入js、css、icon、meta
 * @param {String} type 导入类型：js，css，icon 
 * @param {Object} attribute 标签属性
 * @param {...String} urls 多个url，进行批量创建
 * @returns 
 */
export function importLink(type, attribute, ...urls) {
	if (!type || !urls) {
		return;
	}
	urls = flatten(urls);
	let fragment = document.createDocumentFragment();
	if (type.toLowerCase() === 'js'.toLowerCase() || type.toLowerCase() === 'javaScript'.toLowerCase()) {
		urls.forEach(url => {
			const el = document.createElement('script');
			el.src = url;
			el.type = 'text/javascript';
			attributeUtils.set(el, attribute);
			fragment.appendChild(el)
		});
	} else if (type.toLowerCase() === 'css'.toLowerCase()) {
		urls.forEach(url => {
			const el = document.createElement('link');
			el.href = url;
			el.rel = 'stylesheet';
			attributeUtils.set(el, attribute);
			fragment.appendChild(el);
		});
	} else if (type.toLowerCase() === 'icon'.toLowerCase()) {
		urls.forEach(url => {
			const el = document.createElement('link');
			el.href = url;
			el.rel = 'icon';
			attributeUtils.set(el, attribute);
			fragment.appendChild(el);
		});
	} else if (type.toLowerCase() === 'meta'.toLowerCase()) {
		const el = document.createElement('meta');
		attributeUtils.set(el, attribute);
		fragment.appendChild(el);
	}

	if (type.toLowerCase() === 'js'.toLowerCase() || type.toLowerCase() === 'javaScript'.toLowerCase()) {
		const parent = document.querySelector('body');
		parent.appendChild(fragment);
	} else if ((type.toLowerCase() === 'css'.toLowerCase() ||
			type.toLowerCase() === 'icon'.toLowerCase()) ||
		type.toLowerCase() === 'meta'.toLowerCase()) {
		const parent = document.querySelector('head');
		parent.appendChild(fragment);
	}

}