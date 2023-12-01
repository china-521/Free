import {
	isString
} from '../type/isString.js';
/**
 * 
 * 字符串大小写转换
 * 转换模式: 1: 全大写 ，2：全小写，3：首字母大写 ，4:首字母小写
 * 			5：首字母大写其余全小写，6：首字母小写其余全大写
 * 			7：尾字母大写，8：尾字母小写
 * 			9：尾字母大写其余全小写，10：尾字母小写其余全大写
 * 
 * @param {String} str 字符串 
 * @param {Number} mode  转换模式
 * @return {String}
 */
export function toggleCase(str, mode) {
	if(!str){
		return;
	}
	if (!isString(str,true,null,arguments)) {
		return;
	}
	switch (mode) {
		case 1:
			return str = str.toUpperCase();
		case 2:
			return str = str.toLowerCase();
		case 3:
			return str = str[0].toUpperCase() + str.substring(1);
		case 4:
			return str = str[0].toLowerCase() + str.substring(1);
		case 5:
			return str = str[0].toUpperCase() + str.substring(1).toLowerCase();
		case 6:
			return str = str[0].toLowerCase() + str.substring(1).toUpperCase();
		case 7:
			return str = str.substring(0, str.length - 1) + str[str.length - 1].toUpperCase();
		case 8:
			return str = str.substring(0, str.length - 1) + str[str.length - 1].toLowerCase();
		case 9:
			return str = str.substring(0, str.length - 1).toLowerCase() + str[str.length - 1].toUpperCase();
		case 10:
			return str = str.substring(0, str.length - 1).toUpperCase() + str[str.length - 1].toLowerCase();
		default:
			return str;
	}
}