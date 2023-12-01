import event from "../utils/dom/event/event.js"
import attribute from "../utils/dom/attribute/attribute.js"
import {
	parseDirect
} from "./direct.js"
import {
	contains
} from "../utils/core/contains.js"
import {
	isEvent
} from "../utils/type/isEvent.js"
import {
	call
} from "../utils/core/call.js"

/**
 * 获取方法中的参数
 * @param {String} fn 函数字符串
 * @param {Free} Free
 * @return {Array} 
 */
function getParams(fn, root) {
	// 提取出方法的参数值
	const paramsReg = /(?<=\().*?(?=\))/g;
	// 判断是否是字符串
	const isStrReg = /'/;
	// 提取出参数
	return fn.match(paramsReg)[0].split(',')
		.map(v => {
			if (!isStrReg.test(v)) {
				// 判断参数是否存在于 data
				if (contains(root._data, v)) {
					v = root._data[v];
				} else {
					v = Number(v);
				}

			}
			return v;
		});
}

/**
 * 获取函数名
 * @param {String} fn 函数字符串 
 * @returns {String}
 */
function getFunctionName(fn) {
	// 提取出方法名称
	const funNameReg = /.*(?=\()/g;
	return fn.match(funNameReg).filter(v => {
		return v;
	})[0];
}

/**
 * 渲染数据
 * @param {DOM} el 容器元素
 * @param {Object} data data数据
 */
function renderData(el, data) {
	const reg = /\{\{(.*?)\}\}/g;
	if (el.nodeType === 1) {
		if (el.childNodes.length > 0) {
			el.childNodes.forEach(item => {
				call(renderData, this, item, data);
			});
		}
	} else if (el.nodeType === 3) {
		let text = el.textContent;
		el.textContent = text.replace(reg, (match, key) => {
			key = key.trim();
			let watcher = new Watch(this, key, el, 'textContent');
			watcher.listen();
			return contains(data, key) ? data[key] : key;
		});
	}
}

/**
 * 渲染指令
 * @param {DOM} el 
 */
function renderDirect(el) {
	if (el.nodeType !== 1) {
		return;
	}
	if (el.childNodes.length <= 0) {
		return;
	}
	el.childNodes.forEach((item, index) => {
		if (item.nodeType === 1) {
			call(parseDirect, this, item);
			if (item.childNodes.length > 0) {
				call(renderDirect, this, item);
			}
		}
	});
}

/**
 * 事件绑定
 * @param {DOM} el 容器元素
 * @param {Object} methods 方法
 */
function eventBind(el, methods) {
	if (el.nodeType !== 1) {
		return;
	}
	if (el.childNodes.length <= 0) {
		return;
	}
	// 监测开头是 @ 的属性值的 key
	const eventReg = /^\@/;
	// 提取出事件名称
	const eventNameReg = /(?<=\@).*/g;
	// 监测是否携带参数
	const hasParamsReg = /[a-zA-Z]\((.*?)\)/;
	const methodNames = [];
	Object.values(methods).forEach(method => {
		methodNames.push(method.name);
	});
	el.childNodes.forEach((item, index) => {
		if (item.nodeType === 1) {
			const attributes = attribute.get(item);
			Object.keys(attributes).forEach(key => {
				// 去除属性空格
				attributes[key] = attributes[key].trim();
				// 首先匹配 @开头的属性,并处理为事件名称
				let eventName;
				if (eventReg.test(key)) {
					eventName = key.match(eventNameReg)[0];
				}
				// 如果是合法的事件则进行绑定
				if (eventName && isEvent(eventName)) {
					// 监测方法是否携带参数
					let params = [];
					let hasParam = hasParamsReg.test(attributes[key]);
					if (hasParam) {
						// 提取出参数
						params = getParams(attributes[key], root);
						// 提取出方法名
						attributes[key] = getFunctionName(attributes[key]);
					}

					if (contains(methodNames, attributes[key])) {
						event.add(item, eventName, () => {
							call(methods[attributes[key]], this, ...params);
						});
					}

					// 移除事件绑定属性
					attribute.remove(item, '@' + eventName);
				}
			});
			if (item.childNodes.length > 0) {
				call(eventBind, this, item, methods);
			}
		}
	});
}

/**
 * 渲染模板
 */
export function renderTemplate() {
	let el = this.$el;
	let data = this._data;
	let methods = this._methods;
	call(renderData, this, el, data);
	call(renderDirect, this, el);
	call(eventBind, this, el, methods);
}

/**
 * 更新模板
 * @param {Free} vm Free对象
 * @param {String} key 数据的key
 * @param {DOM} node DOM元素
 * @param {String} attr 监测的属性
 */
class Watch {
	constructor(vm, key, node, attr) {
		this.vm = vm;
		this.key = key;
		this.node = node;
		this.attr = attr;
	};
	update() {
		this.node[this.attr] = this.vm[this.key];
	};
	listen() {
		if (this.vm.$watchEvent[this.key]) {
			this.vm.$watchEvent[this.key].push(this);
		} else {
			this.vm.$watchEvent[this.key] = [];
			this.vm.$watchEvent[this.key].push(this);
		}
	}
}
export default Watch;