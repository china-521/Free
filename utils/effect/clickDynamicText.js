import event from "../dom/event/event.js";
import {
	setStyle
} from "../dom/css/css.js";
import {
	createElement
} from "../dom/element/createElement.js";
import {
	_remove
} from "../dom/element/remove.js";
import {
	randomColor
} from "../core/randomColor.js";
import {
	isArray
} from "../type/isArray.js";
import {
	isString
} from "../type/isString.js";
import {
	isNumber
} from "../type/isNumber.js"

/**
 *  在页面任意位置点击鼠标都会弹出自定义文字，而且内容会不停变化
 *  @param {String/DOM} el : 鼠标点击的容器
 *  @param {Array} text : 文本数组
 *  @param {String} font : 文本样式
 *  @param {Number} top ：弹出的文本距离鼠标点击的向上偏移量
 *  @param {Number} left ：弹出的文本距离鼠标点击的向左偏移量
 *  @param {Number} speed ：文字上升的速度
 *  @param {Number} opacityRate : 透明度变化率，范围是默认值是 120，用来调节文字上升过程中的透明度变化速率
 * 	@param {Number} height : 文字上升高度，默认值是 5
 *  @param {Number} delayTime : 文字延迟上升的时间
 *  @param {Boolean} delay ： 是否开启文字延迟上升，默认是true开启
 */

export function clickDynamicText({
	el,
	text,
	font,
	top,
	left,
	speed,
	opacityRate,
	height,
	delay,
	delayTime
}) {
	el = el || 'html';
	text = text || [];
	font = font || 'bold 16px "微软雅黑","仿宋","楷体"';
	top = top || 25;
	left = left || 20;
	speed = speed || 8;
	opacityRate = opacityRate || 120;
	height = height || 150;
	delayTime = delayTime || 70;
	if (!isArray(text, true, null, arguments)) {
		return;
	}
	if (!isString(font, true, null, arguments)) {
		return;
	}
	if (!isNumber(top, true, null, arguments) ||
		!isNumber(left, true, null, arguments) ||
		!isNumber(speed, true, null, arguments) ||
		!isNumber(opacityRate, true, null, arguments) ||
		!isNumber(height, true, null, arguments) ||
		!isNumber(delayTime, true, null, arguments)) {
		return;
	}
	event.add(el || 'document', 'click', function (event) {
		let baseX = event.pageX;
		let baseY = event.pageY;
		// 创建文本存储容器
		let textContainer = createElement({
			tag: 'span',
			append: true,
			parent: el,
			style: {
				position: 'absolute',
				zIndex: 99999,
				font: font,
				left: `${baseX - left}`,
				top: `${baseY - top}`,
				color: randomColor()
			},
			text: text[Math.floor(Math.random() * text.length)]
		});

		function animal() {
			let increase = 0;
			let timer = setInterval(function () {
				if (++increase == height) {
					clearInterval(timer);
					_remove(el, textContainer);
				}
				setStyle(textContainer, {
					top: baseY - top - increase,
					opacity: (height - increase) / opacityRate
				});
			}, speed);
		}

		if (delay) {
			setTimeout(function () {
				animal();
			}, delayTime);
		} else {
			animal();
		}
	}, true);
}