import {
	isDom
} from "../../type/isDom.js";
import {
	isFree
} from "../../type/isFree.js"
import {
	getElement
} from "./getElement.js";

/**
 * 比较并移除元素节点
 * @param {Array} sources 来源元素 
 * @param {Array} targets 目标元素
 */
function compareAdnRemove(sources, targets) {
	for (let i = 0, size = sources.length; i < size; i++) {
		for (let j = 0, len = targets.length; j < len; j++) {
			if (sources[i] === targets[j]) {
				sources[i].remove();
				break;
			}
		}
	}
}


/**
 * 移除元素节点
 * @param {String/DOM} selector 选择器或DOM元素 
 */
export function _remove(el, selector) {
	if (el && !selector) {
		if (isDom(el)) {
			el.remove();
			return;
		}

		const nodes = getElement(el, true);

		if (!nodes || !nodes.length) {
			return;
		}

		for (let i = 0, len = nodes.length; i < len; i++) {
			nodes[i].remove();
		}

	} else if (!el && selector) {
		if (isDom(selector)) {
			selector.remove();
			return;
		}

		const nodes = getElement(selector, true);

		if (!nodes || !nodes.length) {
			return;
		}

		for (let i = 0, len = nodes.length; i < len; i++) {
			nodes[i].remove();
		}
	} else if (el && selector) {

		let parents = getElement(el, true);

		let nodes = getElement(selector, true);

		if (!nodes || !nodes.length) {
			if (isDom(nodes)) {
				nodes = [].concat(nodes);
			}
		}

		if (!parents || !parents.length) {
			if (isDom(parents)) {
				let childrens = parents.childNodes;
				compareAdnRemove(nodes, childrens);
				return;
			}
			for (let i = 0, len = nodes.length; i < len; i++) {
				nodes[i].remove();
			}
		} else {
			let childrens = [];
			for (let i = 0, len = parents.length; i < len; i++) {
				childrens = parents[i].childNodes;
				if (!childrens.length) {
					continue;
				}
				compareAdnRemove(nodes, childrens);
			}
		}
	}
}


/**
 * 移除元素节点
 * @param {String/DOM} selector 选择器或DOM元素 
 */
export function remove(selector) {
	if (!isFree(this)) {
		return this;
	}

	if (!selector) {
		let els = this.toArray();
		for (let i = 0, len = els.length; i < len; i++) {
			els[i].remove();
		}
	} else {
		let childrens = [];
		const parents = this.toArray();

		if (isDom(selector)) {
			const nodes = [].concat(selector);
			for (let i = 0, len = parents.length; i < len; i++) {
				childrens = parents[i].childNodes;
				if (!childrens.length) {
					continue;
				}
				compareAdnRemove(nodes, childrens);
			}
			return;
		}

		const nodes = getElement(selector, true);

		if (!nodes || !nodes.length) {
			return;
		}

		if (!parents || !parents.length) {

			for (let i = 0, len = nodes.length; i < len; i++) {
				nodes[i].remove();
			}
		} else {
			for (let i = 0, len = parents.length; i < len; i++) {
				childrens = parents[i].childNodes;
				if (!childrens.length) {
					continue;
				}
				compareAdnRemove(nodes, childrens);
			}
		}
	}
}