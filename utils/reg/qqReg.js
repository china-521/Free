/**
 * qq号正则
 * @param {String} value qq号码 
 * @param {RegExp} reg 正则表达式 
 * @returns {Boolean}
 */
export function qqReg(value,reg){
	if (reg) {
		return reg.test(value.trim());
	} 
	return /^[1-9][0-9]{4,10}$/.test(value.trim());
}