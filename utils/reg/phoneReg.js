
/**
 * 手机号正则
 * @param {String} value 手机号码 
 * @param {RegExp} reg 正则表达式 
 * @returns {Boolean}
 */
export function phoneReg(value,reg){
	if(reg){
		return reg.test(value.trim());
	}
	return /^1[3-9][0-9]{9}$/.test(value.trim());
}