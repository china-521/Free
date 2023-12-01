import {
	getElement
} from '../element/getElement.js';

/**
 * 利用事件委派绑定事件
 * @param {String} el 父元素选择器
 * @param {String} type 事件类型
 * @param {Function} callback 回调函数
 * @param {String} selector 子元素选择器
 */
export function eventDelegation({
	el,
	type,
	callback,
	selector
}) {
	el = getElement(el);
	//若没有传递子元素选择器，则给 el 元素绑定事件。 
	if (!selector) {
		el.addEventListener(type, callback);
	} else {
		el.addEventListener(type, function (event) {
			// 获取点击的目标事件源
			const target = event.target;
			// 判断选择器与目标元素是否相符合
			if (target.matches(selector)) {
				callback.call(target, event);
			}
		});
	}
}