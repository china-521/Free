import attribute from "../utils/dom/attribute/attribute.js"
import event from "../utils/dom/event/event.js";
import {
	_remove
} from "../utils/dom/element/remove.js"
import {
	isNumber
} from "../utils/type/isNumber.js";
import {
	isNaN
} from "../utils/type/isNaN.js"
import Watch from "./template.js";
import {
	call
} from "../utils/core/call.js";
import {
	isArray
} from "../utils/type/isArray.js";


/**
 * 内置指令
 */
export const directs = {
	'vModel': 'v-model',
	'vModel.Number': 'v-model.number',
	'vFor': 'v-for'
};

/**
 * 解析指令
 * @param {DOM} el DOM 元素 
 */
export function parseDirect(el) {
	call(vModel, this, el);
	call(vFor, this, el)
}


/**
 * 双向绑定
 * @param {DOM} el DOM元素
 */
export function vModel(el) {
	if (attribute.has(el, directs.vModel)) {
		let vmKey = attribute.get(el, directs.vModel)[0];
		vmKey = vmKey.trim();
		let watcher = new Watch(this, vmKey, el, 'value');
		watcher.listen();
		el.value = this[vmKey];
		event.add(el, 'input', () => {
			this[vmKey] = el.value;
		});
		attribute.remove(el, directs.vModel);
	} else if (attribute.has(el, directs["vModel.Number"])) {
		let vmKey = attribute.get(el, directs["vModel.Number"])[0];
		vmKey = vmKey.trim();
		let watcher = new Watch(this, vmKey, el, 'value');
		watcher.listen();
		el.value = this[vmKey];
		const numberEndReg = /\d$/;
		event.add(el, 'input', () => {
			let val;
			const value = el.value;
			if (value && numberEndReg.test(value)) {
				val = parseFloat(value);
			}

			if (isNumber(val) && !isNaN(val)) {
				this[vmKey] = val;
			} else {
				const numberBeginReg = /^\d/;
				if (!numberBeginReg.test(value)) {
					this[vmKey] = value;
				}
			}
		});
		attribute.remove(el, directs["vModel.Number"]);
	}
}

/**
 * 循环指令
 * @param {DOM} el DOM元素
 */
export function vFor(el) {
	if (attribute.has(el, directs.vFor)) {

		const reg = /(?<= in\s).*/;

		let vmKey = attribute.get(el, directs.vFor)[0];

		vmKey = (vmKey.match(reg)[0]).trim();

		let value = this._data[vmKey];
		if (!value) {
			attribute.remove(el, directs.vFor);
			return;
		}

		const parent = el.parentNode;
		const fragment = new DocumentFragment();

		const childNodes = parent.childNodes;
		if (childNodes && childNodes.length) {
			for (let i = 0, len = childNodes.len; i < len; i++) {
				if (attribute.has(childNodes[i], 'key')) {
					childNodes[i].remove();
				}
			}
		}

		attribute.set(el, {
			key: 0
		});

		if (isArray(value)) {
			for (let i = 0, len = value.length; i < len; i++) {
				let tempNode = el.cloneNode(true);
				attribute.set(tempNode, {
					key: i + 1
				});
				fragment.appendChild(tempNode);
			}
			parent.appendChild(fragment);
		} else if (isNumber(value)) {
			for (let i = 0; i < value; i++) {
				let tempNode = el.cloneNode(true);
				attribute.set(tempNode, {
					key: i + 1
				});
				fragment.appendChild(tempNode);
			}
			parent.appendChild(fragment);
		}
		attribute.remove(el, directs.vFor);
	}
}