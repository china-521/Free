/**
 * 身份证号码正则
 * @param {String} value 身份证号
 * @param {RegExp} reg 正则表达式 
 * @returns {Boolean}
 */
export function idReg(value,reg){
	if(reg){
		return reg.test(value.trim());
	}
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value.trim());
}