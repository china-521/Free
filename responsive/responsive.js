import {
	isFree
} from "../utils/type/isFree.js"
import {
	getElement
} from "../utils/dom/element/getElement.js";
import {
	directs
} from "./direct.js";
import {
	render,
	vNode
} from "./vNode.js";
import {
	renderTemplate
} from "./template.js"
import {
	data
} from "./data.js";
import {
	methods
} from "./methods.js";
import {
	created
} from "./created.js";
import {
	call
} from "../utils/core/call.js";
import {
	observe
} from "./observe.js";
import {
	updated
} from "./updated.js";
import {
	mounted
} from "./mounted.js";

/**
 * 响应式编程入口
 * @param {Free} root  Free对象 
 * @param {Object} options 配置对象
 */
export function responsive(root, options) {
	if (!isFree(root, true, 'The core object of Reactive programming must be Free')) {
		return;
	}
	return call(init, root, options);
}

/**
 * 初始化配置
 * @param {Free} root Free对象 
 */
function init(options) {
	// 挂载配置对象
	this.$options = options;
	// 获取容器
	this.$el = getElement(options.el);
	// 挂载指令
	this._directs = directs;
	// 挂载数据和方法
	call(data, this);
	call(methods, this);
	call(created, this);
	call(updated, this);
	call(mounted, this);
	// 构建DOM树
	this._vNode = vNode(this.$el);
	console.log('====> vNode',this._vNode)
	// 监听更新
	this.$watchEvent = {};
	// 执行created()
	if (this._created) {
		this._created();
	}
	// 监听模板
	call(observe, this);
	// 渲染模板
	call(renderTemplate, this);
	// 执行 mounted 方法
	if (this._mounted) {
		this._mounted();
	}
	return this;
}