import { isString } from "../type/isString";

/**
 * 去除字符串中所有空格
 * @param {String} str 字符串 
 * @return {String}
 */
export function trimAll(str) {
	if(!str){
		return;
	}
	if(!isString(str,true,null,arguments)){
		return;
	}
	return str.replace(/\s/g, '');
}