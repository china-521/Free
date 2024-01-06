import {
	fixedNumber
} from "../core/fixedNumber.js";

/**
 * 格式化日期
 * @param {Number} date 数字格式的日期 
 * @return {String}
 */
function fixedDate(date) {
	return fixedNumber(date, 2, 0);
}

/**
 * 日期格式化
 * @param {String/Number} date 日期字符串或时间戳 
 * @param {String} format 格式
 * @return {Object/String/Number}
 */
export function format(date, format) {
	if (!date) {
		return;
	}
	let time = new Date(date); // 初始化日期
	let year = time.getFullYear();
	let month = time.getMonth() + 1;
	let day = time.getDate();
	let hour = time.getHours();
	let minute = time.getMinutes();
	let second = time.getSeconds();
	let milliSecond = time.getMilliseconds();
	let result = {
		year,
		month,
		day,
		hour,
		minute,
		second,
		milliSecond
	};
	if (!format) {
		return result;
	} else {
		month = fixedDate(month);
		day = fixedDate(day);
		hour = fixedDate(hour);
		minute = fixedDate(minute);
		second = fixedDate(second);
		format = format.trim();
		if(format === 'yyyy-MM-dd HH:mm:ss'){
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		}else if (format === 'YYYY-MM-DD hh:mm:ss') {
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		} else if (format === 'YYYY/MM/DD hh:mm:ss') {
			return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
		} else if (format === 'YYYY-MM-DD') {
			return year + '-' + month + '-' + day;
		} else if (format === 'YYYY/MM/DD') {
			return year + '/' + month + '/' + day;
		} else if (format === 'hh:mm:ss') {
			return hour + ':' + minute + ':' + second;
		} else if (format === 'hh-mm-ss') {
			return hour + '-' + minute + '-' + second;
		} else if (format === 'hh/mm/ss') {
			return hour + '/' + minute + '/' + second;
		} else {
			return date;
		}
	}
}