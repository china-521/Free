/**
 * 获取数据类型
 * @param {any} data 任意数据 
 * @return {String}
 */
export function getType(data) {
	return Object.prototype.toString.call(data).slice(8, -1);
}