import {
	isDom
} from "../type/isDom.js"
import {
	exception
} from "../../exception/exception.js"
import {
	format
} from "./format.js"
import {
	getElement
} from "../dom/element/getElement.js";
import {
	contains
} from "../core/contains.js";
import {
	fixedNumber
} from "../core/fixedNumber.js";

/**
 * 用于个人网站，个人博客等运行时间的精确记录。
 * @param {String/DOM} el 展示时间的容器
 * @param {String/Number/Date} date 起始日期
 * @param {String} desc 自定义描述文本
 * @param {boolean} flag 如果为true，将默认模板写入指定的容器中，如果为false，则返回时间数组，用户可操作返回的时间数组。
 * @param {String} mode 返回的时间模式， Y模式计算到年份，其他模式只计算到天数，默认是其他模式
 *      
 */

export function runTime({
	el,
	date,
	desc,
	flag,
	mode
}) {

	if (!date) {
		return;
	}

	let time = format(date);
	let year = time.year;
	let month = time.month;
	let day = time.day;
	let hour = time.hour;
	let minute = time.minute;
	let second = time.second;

	if (flag) {
		el = getElement(el);

		if (!isDom(el)) {
			exception(el, "domIsNull");
		}

		desc = desc || '';

		//开始计时
		setInterval(() => {
			
			let runTimeArr = getTime(year, month, day, hour, minute, second, mode);
			runTimeArr[2] = fixedNumber(runTimeArr[2], 2, 0);
			runTimeArr[3] = fixedNumber(runTimeArr[3], 2, 0);
			runTimeArr[4] = fixedNumber(runTimeArr[4], 2, 0);
			el.innerText = desc + handleResult(runTimeArr, mode);

		}, 1000);
	} else {
		return getTime(year, month, day, hour, minute, second, mode);
	}
}

// 转换时间
function handleTime(unitSecond, format) {
	// 创建数组存储 年、日、时、分、秒
	let timeArr = new Array(0, 0, 0, 0, 0);
	// 将秒转换成对应的 年 日 时 分 秒
	let unitYear = 365 * 24 * 60 * 60;
	let unitDay = 24 * 60 * 60;
	let unitHour = 60 * 60;
	let unitMin = 60;
	let unitSec = 0;
	if (!unitSecond) {
		return;
	}
	if ((contains(format, 'Y') || contains(format, 'y')) && unitSecond >= unitYear) {
		timeArr[0] = parseInt(unitSecond / unitYear);
		unitSecond %= unitYear;
	}
	if (unitSecond >= unitDay) {
		timeArr[1] = parseInt(unitSecond / unitDay);
		unitSecond %= unitDay;
	}
	if (unitSecond >= unitHour) {
		timeArr[2] = parseInt(unitSecond / unitHour);
		unitSecond %= unitHour;
	}
	if (unitSecond >= unitMin) {
		timeArr[3] = parseInt(unitSecond / unitMin);
		unitSecond %= unitMin;
	}
	if (unitSecond > unitSec) {
		timeArr[4] = unitSecond;
	}
	return timeArr;
}
// 获取时间
function getTime(year, month, day, hour, minute, second, format) {
	// 初始化起始时间
	let startTime = Math.round(new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime() / 1000);
	// 获取当前时间(中国时区和UTC世界标椎时间相差 8 个小时)
	let nowTime = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
	return handleTime(nowTime - startTime, format);
}
// 处理输出模板格式
function handleResult(runTimeArr, format) {
	if (format === 'Y' || format === 'y') {
		return runTimeArr[0] + '年' + runTimeArr[1] + '天' + runTimeArr[2] + '时' + runTimeArr[3] + '分' + runTimeArr[4] + '秒';
	} else {
		return runTimeArr[1] + '天' + runTimeArr[2] + '时' + runTimeArr[3] + '分' + runTimeArr[4] + '秒';
	}
}