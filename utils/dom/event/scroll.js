import event from "./event.js"
import {
	throttle
} from "../../core/throttle.js"
import { isNumber } from "../../type/isNumber.js";
/**
 * 实现鼠标滚动触发特定事件
 * 滚动事件分为两个，分别为向上滚动和向下滚动触发
 *  @param {String/dom} el  添加滚动事件的元素选择器（默认是window）
 * 	@param {Boolean} flag 开启函数节流
 *  @param {Number} timer  设置函数节流的时间间隔
 * 	@param {Function} callbackStart  滚动到页面顶端要触发的事件
 *  @param {Function} callbackUp  向上滚动要触发的事件
 * 	@param {Function} callbackDown 向下滚动要触发的事件
 */
export function scroll({
	el,
	flag,
	timer,
	callbackStart,
	callbackUp,
	callbackDown
}) {
	el = el || window;
	timer = timer || 0;
	let threshold = 0;
	if (flag) {
		if(!isNumber(timer,true,null,arguments)){
			return;
		}
		event.add(el, 'scroll', throttle((e) => {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop <= 0) {
				callbackStart && callbackStart(e);
				threshold = scrollTop;
			} else if (scrollTop >= threshold) {
				callbackDown && callbackDown(e);
				threshold = scrollTop;
			} else {
				callbackUp && callbackUp(e);
				threshold = scrollTop;
			}
		}, timer));
	} else {
		event.add(el, 'scroll', (e) => {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop <= 0) {
				callbackStart && callbackStart(e);
				threshold = scrollTop;
			} else if (scrollTop >= threshold) {
				callbackDown && callbackDown(e);
				threshold = scrollTop;
			} else {
				callbackUp && callbackUp(e);
				threshold = scrollTop;
			}
		});
	}
}