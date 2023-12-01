import attribute from "../attribute/attribute.js"
import {
	isDom
} from "../../type/isDom.js"
import {
	getElement
} from "../element/getElement.js"
import {
	exception
} from "../../../exception/exception.js"
import event from "./event.js"
import {
	isFree
} from "../../type/isFree.js"

/**
 * 
 * @param {DOM/String} el  DOM元素或者元素选择器 
 * @param {Boolean} disable 是否禁用拖拽,默认false
 * @param {Boolean} preventDefault 开启阻止默认行为，默认true开启，如果为false，则拖拽元素无法放置
 * @param {Function} dragCallback  拖拽过程中的回调事件
 * @param {Function} dragStartCallback 拖拽开始的回调事件
 * @param {Function} dragEndCallback 拖拽结束的回调事件
 * @param {Function} dragOverCallback 拖拽元素被拖拽到目标元素上触发的回调事件
 * @param {Function} dragEnterCallback 拖拽元素进入目标元素时触发的回调事件
 * @param {Function} dragLeaveCallback 拖拽元素离开目标元素时触发的回调事件
 * @param {Function} dropCallback 拖拽元素放置在目标元素上触发的回调事件
 */
export function _drag({
	el,
	preventDefault = true,
	disable,
	dragCallback,
	dragStartCallback,
	dragEndCallback,
	dragEnterCallback,
	dragLeaveCallback,
	dragOverCallback,
	dropCallback
}) {

	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	// 设置开启拖拽属性
	attribute.set(el, {
		draggable: true
	});

	// 拖拽的几个事件

	if (dragCallback) {
		event.add(el, 'drag', (e) => {
			dragCallback(e);
		});
	}

	if (dragStartCallback) {
		event.add(el, 'dragstart', (e) => {
			if (disable) {
				e.preventDefault();
			} else {
				dragStartCallback(e);
			}
		});
	}

	if (dragEndCallback) {
		event.add(el, 'dragend', (e) => {
			dragEndCallback(e);
		});
	}

	if (dragOverCallback) {
		event.add(el, 'dragover', (e) => {
			if (preventDefault) {
				// 阻止默认行为以允许放置
				e.preventDefault();
			}
			dragOverCallback(e);
		});
	}

	if (dragEnterCallback) {
		event.add(el, 'dragenter', (e) => {
			dragEnterCallback(e);
		});
	}

	if (dragLeaveCallback) {
		event.add(el, 'dragleave', (e) => {
			dragLeaveCallback(e);
		});
	}

	if (dropCallback) {
		event.add(el, 'drop', (e) => {
			if (preventDefault) {
				// 阻止默认行为（会作为某些元素的链接打开）
				e.preventDefault();
			}
			dropCallback(e);
		});
	}
}

/**
 * @param {Boolean} batch 开启批量模式，为选中的所有元素开启拖拽，默认是false
 * @param {Boolean} disable 是否禁用拖拽,默认false
 * @param {Boolean} preventDefault 开启阻止默认行为，默认true开启，如果为false，则拖拽元素无法放置
 * @param {Function} dragCallback  拖拽过程中的回调事件
 * @param {Function} dragStartCallback 拖拽开始的回调事件
 * @param {Function} dragEndCallback 拖拽结束的回调事件
 * @param {Function} dragOverCallback 拖拽元素被拖拽到目标元素上触发的回调事件
 * @param {Function} dragEnterCallback 拖拽元素进入目标元素时触发的回调事件
 * @param {Function} dragLeaveCallback 拖拽元素离开目标元素时触发的回调事件
 * @param {Function} dropCallback 拖拽元素放置在目标元素上触发的回调事件
 */
export function drag({
	batch,
	preventDefault = true,
	disable,
	dragCallback,
	dragStartCallback,
	dragEndCallback,
	dragEnterCallback,
	dragLeaveCallback,
	dragOverCallback,
	dropCallback
}) {

	if (!isFree(this)) {
		return this;
	}

	if (batch) {
		this.toArray().forEach(el => {
			_drag({
				el,
				preventDefault,
				disable,
				dragCallback,
				dragStartCallback,
				dragEndCallback,
				dragEnterCallback,
				dragLeaveCallback,
				dragOverCallback,
				dropCallback
			});
		});
	} else {
		let el = this.get(0);
		_drag({
			el,
			preventDefault,
			disable,
			dragCallback,
			dragStartCallback,
			dragEndCallback,
			dragEnterCallback,
			dragLeaveCallback,
			dragOverCallback,
			dropCallback
		});
	}
	return this;
}