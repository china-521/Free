import console from "./console.js";
import {
	toCssText
} from "../dom/css/css.js"
import {
	isNotEmptyObject
} from "../type/isNotEmptyObject.js";
import {
	isNotEmptyArray
} from "../type/isNotEmptyArray.js"
import {
	isNumber
} from "../type/isNumber.js"
import {
	stringify
} from "../core/stringify.js"
import {
	isArray
} from "../type/isArray.js";
/**
 * 输出日志
 * @param {any} context 日志内容 
 * @param {Object} style 日志样式对象
 * @param {Boolean} inspect 开启inspect检查
 * @param {Number} delay 延迟时间
 */
export function log(context, style, inspect, delay) {
	if (isNotEmptyObject(style)) {
		isNumber(delay) ? setTimeout(() => {
			console[inspect ? 'dir' : 'log'](inspect ? context : '%c%s', toCssText(style), stringify(context));
		}, delay) : console[inspect ? 'dir' : 'log'](inspect ? context : '%c%s', toCssText(style), stringify(context));
	} else {
		isNumber(delay) ? setTimeout(() => {
			console[inspect ? 'dir' : 'log'](context);
		}, delay) : console[inspect ? 'dir' : 'log'](context);
	}
}

/**
 * 输出日志-至尊版
 * 为日志批量设置样式
 * @param {Array} context 日志内容，传递一个内容数组
 * @param {Array} styles 日志样式对象，传递一个样式数组
 * @param {Boolean} inspect 开启inspect检查
 * @param {Number} delay 延迟时间
 */
export function logPlus(contexts, styles, inspect, delay) {
	let text = '';
	if (!styles) {
		log(contexts, styles, inspect, delay);
	} else if (isNotEmptyArray(contexts) && isNotEmptyArray(styles)) {
		if (inspect) {
			log(contexts,styles,inspect,delay);
		} else {
			const reg = /^\s*$/;
			let contextCount = contexts.length;
			let styleCount = styles.length;
			// 处理样式数量和日志数量不一致
			if (contextCount > styleCount) {
				for (let i = 0; i < contextCount - styleCount; i++) {
					styles.push({
						color: 'black'
					});
				}
			} else if (contextCount < styleCount) {
				for (let i = 0; i < styleCount - contextCount; i++) {
					styles.pop();
				}
			}
			contexts.forEach(context => {
				if (!context) {
					// text += stringify(context);
					text = text.concat('%c',context);
				} else if (reg.test(context)) {
					text += '%c' + stringify(context);
				} else {
					text = text.concat('%c', stringify(context));
				}
			});
			// 样式转化
			styles.forEach((style, index) => {
				styles[index] = toCssText(style);
			});
			delay ? setTimeout(() => {
				console.log(text, ...styles);
			}, delay) : console.log(text, ...styles);
		}
	} else if (isNotEmptyArray(contexts) && isNotEmptyObject(styles)) {
		if (!inspect) {
			contexts.forEach(context => {
				text = text.concat(stringify(context));
			});
			log(text, styles, inspect, delay);
		} else {
			log(contexts, styles, inspect, delay);
		}
	} else if (!isArray(contexts) && isNotEmptyArray(styles)) {
		log(contexts, styles[0], inspect, delay);
	} else {
		log(contexts, styles, inspect, delay);
	}
}