
/**
 * 设置网页标题或者获取网页标题
 * @param {any} val 网页标题
 * @return {String}
 */
export function title(val){
	if(!val){
		return document.title;
	}
	document.title = val;
}