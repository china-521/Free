import {
	format
} from "./format.js";
/**
 * 判断是否是瑞年
 * @param {String/Number/Object} date 日期
 * @return {Boolean} 
 */
export function isLeapYear(date) {
	date = format(date).year;
	return (date % 4 === 0 && date % 100 !== 0) || date % 400 === 0;
}