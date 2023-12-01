/**
 * 生成指定区间内的随机数
 * @param {Number} begin 起始值
 * @param {Number} end  终止值
 * @return {Number}
 * 
 */

export function random(begin, end) {
	if (!begin && !end) {
		return Math.random();
	} else if (begin && !end) {
		return Math.random() * begin;
	} else if (!begin && end) {
		return Math.random() * end;
	} else if (begin && end) {
		return Math.random() * (end - begin) + begin;
	}
}