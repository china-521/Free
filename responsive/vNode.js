import {
	call
} from "../utils/core/call.js";
import {
	contains
} from "../utils/core/contains.js";
import {
	isEmpty
} from "../utils/core/isEmpty.js";
import attribute from "../utils/dom/attribute/attribute.js";
import {
	createElement
} from "../utils/dom/element/createElement.js"
import event from "../utils/dom/event/event.js";
import { isPlainObject } from "../utils/type/isPlainObject.js";

/**
 * 
 * @param {String} tag 标签名 
 * @param {Object} attributes 属性，用来设置元素的属性
 * @param {String} text 标签中的文本 
 * @returns 
 */
export function render(tag,attributes,text) {
	// vNode = call(vNodeToRealNode, this, vNode);
	// call(appendNode,this,vNode);
	// return vNode;

	const el = document.createElement(tag);

	if(isPlainObject(options)) {
		
	}

	return el;
}

/**
 * 添加虚拟DOM
 * @param {Object} vNode 虚拟DOM
 */
export function appendNode(vNode){
	if (vNode.level === 1) {
		this.$el.remove();
		vNode.parent.appendChild(vNode.el);
	} else {
		vNode.parent.appendChild(vNode.el);
	}
	if (vNode.children.length) {
		vNode.children.forEach(item => {
			call(appendNode,this,item);
		});
	}
}

/**
 * 虚拟DOM 转 真实 DOM
 * @param {Object} vNode 虚拟DOM 
 * @param {Object} parent 父节点
 */
export function vNodeToRealNode(vNode, parent) {
	vNode = call(parseVNode, this, vNode);
	let el;
	if (vNode.level === 1) {
		console.log(this)
		const rootParentElement = this.$el.parentNode;
		vNode.parent = rootParentElement;
		el = createElement({
			tag: vNode.tag,
			attribute: vNode.attributes
		});
		setAttributes(el, vNode.attributes);
		call(eventBind, this, el, vNode.events);
		vNode.el = el;
	} else {
		el = createElement({
			tag: vNode.tag,
			attribute: vNode.attributes
		});
		setAttributes(el, vNode.attributes);
		call(eventBind, this, el, vNode.events);
		vNode.el = el;
	}
	if (vNode.children.length) {
		vNode.children.forEach(item => {
			item.parent = el;
			vNodeToRealNode(item, el);
		});
	}
	return vNode;
}

/**
 * 解析虚拟DOM
 * @param {Object} vNode 虚拟DOM 
 * @return {Object}
 */
export function parseVNode(vNode) {
	Object.keys(vNode).forEach(key => {
		if (key === 'children' && vNode[key].length) {
			vNode[key].forEach(item => {
				call(parseVNode, this, item);
			});
		}
	});
	return call(parseDynamicAttribute, this, vNode);
}

/**
 * 解析动态属性
 * @param {Object} vNode 虚拟DOM节点 
 * @return {Object} 
 */
export function parseDynamicAttribute(vNode) {
	const attributes = vNode.attributes;
	const _data = this._data;
	const _methods = this._methods;
	Object.keys(attributes).forEach(key => {
		if (isDynamicAttribute(key)) {
			let vmKey = attributes[key];
			if (contains(_data, vmKey)) {
				vNode.attributes[key.replace(/^\:/, '')] = _data[vmKey];
				delete vNode.attributes[key];
			} else {
				vNode.attributes[key.replace(/^\:/, '')] = attributes[key];
				delete vNode.attributes[key];
			}
		} else if (isEvent(key)) {
			let vmKey = attributes[key];
			if (contains(_methods, vmKey)) {
				const eventName = key.replace(/^\@/, "");
				vNode.events[eventName] = vmKey;
				delete vNode.attributes[key];
			}
		}
	});
	return vNode;
}

/**
 * 事件绑定
 * @param {DOM} el DOM元素 
 * @param {Object} events 事件对象
 */
export function eventBind(el, events) {
	const methods = this._methods;
	if (isEmpty(events)) {
		return;
	}
	Object.keys(events).forEach(eventName => {
		if (contains(methods, events[eventName])) {
			event.add(el, eventName, () => {
				call(methods[events[eventName]], this);
			});
		}
	});
}

/**
 * 设置属性
 * @param {DOM} el DOM元素 
 * @param {Object} attributes 事件对象
 */
export function setAttributes(el, attributes) {
	if (isEmpty(attributes)) {
		return;
	}
	attribute.set(el, attributes);
}

/**
 * 判断是否是动态属性 
 * @param {String} attributeName 属性名称
 * @return {Boolean}
 */
export function isDynamicAttribute(attributeName) {
	return /^\:/.test(attributeName);
}

/**
 * 判断是否是事件绑定 
 * @param {String} attributeName 属性名称
 * @return {Boolean}
 */
export function isEvent(attributeName) {
	return /^\@/.test(attributeName);
}

/**
 * 创建DOM节点树
 * @param {DOM} el DOM元素
 * @param {Object} parent 父元素虚拟DOM对象
 * @returns {Object}
 */
export function vNode(el, parent) {
	let targetVNode = {
		tag: '',
		el: '',
		parent: '',
		html: '',
		attributes: [],
		children: [],
		expression: [],
		events: {},
		type: 1,
		level: 0
	};
	if (el.nodeType === 1) {
		targetVNode.tag = el.localName;
		targetVNode.html = el.innerHTML;
		targetVNode.attributes = toAttributeObj(Array.from(el.attributes));
		targetVNode.type = el.nodeType;
		if (parent) {
			targetVNode.level = parent.level + 1;
		} else {
			targetVNode.level += 1;
		}
		if (el.childNodes.length > 0) {
			el.childNodes.forEach(item => {
				targetVNode.children.push(vNode(item, targetVNode));
			});
		}
	} else if (el.nodeType === 3) {
		targetVNode.tag = el.nodeName.replace('#', '');
		targetVNode.html = el.data;
		targetVNode.attributes = {};
		targetVNode.children = el.childNodes;
		targetVNode.type = el.nodeType;
		if (parent) {
			targetVNode.level = parent.level + 1;
		} else {
			targetVNode.level += 1;
		}
	}
	return targetVNode;
}

/**
 * 将属性数组转换为属性对象
 * @param {Array} attributes DOM属性数组
 * @returns {Object} 
 */
function toAttributeObj(attributes) {
	let result = {};
	if (!attributes) {
		return result;
	}
	attributes.forEach(attribute => {
		result[attribute.localName] = attribute.value;
	});
	return result;
}