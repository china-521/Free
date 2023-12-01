import {
	error
} from "../../../exception/error.js"
import {
	isDom
} from "../../type/isDom"
import {
	getElement
} from "../element/getElement.js"
import {
	getStyle
} from "../css/css.js"

/**
 * 简单动画
 * @param {String/DOM} el 选择器/DOM元素
 * @param {String} style 样式名称
 * @param {Number} target 目标值
 * @param {Number} speed 动画速度
 * @param {Function} callback  动画执行完毕要触发的事件
 * @param {Number} interval 动画执行间隔 
 */
export function animation({
	el,
	style,
	target,
	speed,
	callback,
	interval
}) {

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}
	if (style === 'left' || style === 'right' || style === 'top' || style === 'bottom') {
		// 判断用户是否开启定位
		if (getStyle(el, "position") == "static") {
			error("Positioning has not been enabled and cannot be dragged");
		}
	}
	clearInterval(el.timer);
	let current = parseInt(getStyle(el, style));
	if (current < target) {
		speed = speed;
	} else if (current > target) {
		speed = -speed;
	}
	el.timer = setInterval(() => {
		let oldValue = parseInt(getStyle(el, style));
		let newValue = oldValue + speed;
		// 防止div越界
		if (newValue > target && speed > 0) {
			newValue = target;
		} else if (newValue < target && speed < 0) {
			newValue = target;
		}
		el.style[style] = newValue + "px";
		// 当元素移动到边界时，关闭定时器
		if (newValue == target) {
			clearInterval(el.timer);
			//动画执行完毕，调用回调方法(采用“与”的形式是为了使用户在不需要回调方法时，就不用传递回调方法这个参数)
			callback && callback();
		}
	}, interval || 30);
}
