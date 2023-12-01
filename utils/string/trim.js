/**
 * 
 * 去除字符串中空格
 * @param {String} str 字符串 
 * @param {Number} mode 模式 1 所有空格，2 前后空格，3 前空格，4 后空格
 * @return {String}
 */
export function trim(str, mode) {
	if(!str){
		return;
	}
	mode = mode || 2;
	switch (mode) {
		case 1:
			return str.replace(/\s+/g,"");
		case 2:
			return str.replace(/(^\s*) | (\s*$)/g,"");
		case 3:
			return str.replace(/(^\s*)/g,"");
		case 4:
			return str.replace(/(\s*$)/g,"");
		default:
			return str;
	}
}