import event from "../event/event.js"
import {
	getElement
} from "../element/getElement.js"
import {
	isDom
} from "../../type/isDom.js";
import {
	isNumber
} from "../../type/isNumber.js"
import {
	exception
} from "../../../exception/exception.js";
import {
	isWindow
} from "../../type/isWindow.js"

/**
 * 整屏翻页效果
 * @param {String/Object} el 滚动目标选择器
 * @param {Number} height 自定义滚动距离
 * @param {String/Object} button 激活滚动按钮选择器
 * @param {Boolean} flag 切换滚动距离
 * @param {Boolean} 
 *     
 */
export function pageDown({
	el,
	height,
	button,
	flag
}) {
	el = el || 'html';

	let target = getElement(el);

	if (!isDom(target) && !isWindow(target)) {
		exception(el, 'domIsNull');
	}

	if (height && !isNumber(height, true, null, arguments)) {
		return;
	}

	let clientHeight = document.documentElement.clientHeight;

	event.add('window', 'resize', () => {
		clientHeight = document.documentElement.clientHeight;
	});

	event.add(button, 'click', function () {
		let scrollHeight = 0;
		if (!height) {
			scrollHeight = flag ? window.screen.height : clientHeight;
		} else {
			scrollHeight = height;
		}
		target.scrollTo({
			top: scrollHeight,
			behavior: 'smooth'
		});
	});
}