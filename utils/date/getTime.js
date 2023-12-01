import {
	getElement
} from "../dom/element/getElement.js"
import {
	fixedNumber
} from "../core/fixedNumber.js"
import {
	isDom
} from "../type/isDom.js"
import {
	exception
} from "../../exception/exception.js"

function handleTime(flag) {
	let timeArr = new Array(0, 0, 0, 0, 0, 0, 0);
	let nowTime = new Date();
	timeArr[0] = nowTime.getFullYear();
	timeArr[1] = nowTime.getMonth() + 1;
	timeArr[2] = nowTime.getDate();
	timeArr[3] = nowTime.getHours();
	timeArr[4] = nowTime.getMinutes();
	timeArr[5] = nowTime.getSeconds();
	timeArr[6] = nowTime.getMilliseconds();
	if (flag) {
		timeArr[1] = fixedNumber(timeArr[1], 2, 0);
		timeArr[2] = fixedNumber(timeArr[2], 2, 0);
		timeArr[3] = fixedNumber(timeArr[3], 2, 0);
		timeArr[4] = fixedNumber(timeArr[4], 2, 0);
		timeArr[5] = fixedNumber(timeArr[5], 2, 0);
		timeArr[6] = fixedNumber(timeArr[6], 3, 0);
	}
	return timeArr;
};

/**
 * 动态返回当前的时间 ,包括年、月、日、时、分、秒、毫秒
 * @param {String} el 时间展示容器
 * @param {String} desc 描述
 * @param {boolean} flag 返回时间的方式，如果为true，返回带有描述性文本格式的时间模板，如果为false，则返回时间数组，用户可操作返回的时间数组。
 */
export function getTime(el, desc, flag = true) {

	if (!el) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}


	if (flag) {
		desc = desc || '';
		setInterval(() => {
			let timeArr = handleTime(flag);
			el.innerText = desc + timeArr[0] + '-' + timeArr[1] + '-' + timeArr[2] + '  ' + timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5];
		}, 0);
	} else {
		return handleTime(flag);
	}
}