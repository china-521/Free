/**
 * 密码正则
 * @param {String} value 密码 ,以字母开头，长度在6~18之间，只能包含字母、数字和下划线
 * @param {RegExp} reg 正则表达式 
 * @returns {Boolean}
 */
export function passwordReg(value,reg){
	if (reg) {
		return reg.test(value.trim());
	} 
	return /^[a-zA-Z]\w{5,17}$/.test(value.trim());
}