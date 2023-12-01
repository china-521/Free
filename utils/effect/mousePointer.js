import config from "../../config/config.js";
import event from "../dom/event/event.js";
import {
	error
} from "../../exception/error.js";
import {
	contains
} from "../core/contains.js";
import {
	setStyle
} from "../dom/css/css.js"

const mousePointers = config.mousePointer;

/**
 * 修改鼠标指针样式
 * @param {String} el 鼠标指针发生改变时进入的元素的选择器  
 * @param {String} pointer 默认鼠标指针形状
 * @param {String} src 自定义鼠标指针图标路径
 * @param {String} offsetX 自定义鼠标指针图标水平偏移量  
 * @param {String} offsetY 自定义鼠标指针图标垂直偏移量
 * @param {Boolean} remind 开启鼠标指针形状名称提示，true开启提示，false关闭提示
 */
export function mousePointer({
	el,
	pointer,
	src,
	offsetX,
	offsetY,
	remind
}) {
	el = el || 'html';
	pointer = pointer || "auto";
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;

	if (remind) {
		console.log("The mouse types you can select are as follows:\n", mousePointers);
	}

	if (src) {
		event.add(el, 'mousemove', () => {
			setStyle(el, {
				cursor: `url(${src}) ${offsetX} ${offsetY},auto`,
			});
		});
	} else {
		if (contains(mousePointers, pointer)) {
			event.add(el, 'mousemove', () => {
				setStyle(el, {
					cursor: mousePointers[pointer]
				});
			});
		} else {
			error('The pointer you entered does not exist');
		}
	}
}