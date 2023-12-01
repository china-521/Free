import {
	isPlainObject
} from "../utils/type/isPlainObject.js"

/**
 * 创造 handler
 * @param {Object} 代理处理器
 * @returns {Object}
 */
export function createProxyHandler() {
	return {
		get(target, propertyName) {
			return Reflect.get(target, propertyName);
		},
		set(target, propertyName, value) {
			Reflect.set(target, propertyName, value);
		},
		deleteProperty(target, propertyName) {
			return Reflect.deleteProperty(target, propertyName);
		}
	};
}

/**
 * 数据代理
 * @param {Object} target 被代理对象
 * @returns 
 */
export function proxy(target, handler) {
	if (!handler) {
		handler = createProxyHandler();
	}
	return new Proxy(target, handler);
}

/**
 * 代理数据
 * @param {Object} target 代理对象
 * @param {Object} source 被代理对象
 * @return {Free}
 */
export function proxyData(source, target) {
	if (!isPlainObject(source, true, null, arguments)) {
		return;
	}
	Object.keys(source).forEach(key => {
		Object.defineProperty(target, key, {
			configurable: true,
			enumerable: true,
			get() {
				return Reflect.get(source, key);
			},
			set(newVal) {
				Reflect.set(source, key, newVal);
			}
		});
	});
}