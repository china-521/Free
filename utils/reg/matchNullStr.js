/**
 *  匹配空字符串
 * 
 * @param {String} str 字符串
 * @param {RegExp} reg 正则表达式 
 * @returns {Boolean}
 */

export function matchNullStr(str,reg){
	if(reg){
		return reg.test(str);
	}
	let regExp = /^[ ]*$/g;
	let result = regExp.test(str);
	regExp.lastIndex = 0;
	return result;
}