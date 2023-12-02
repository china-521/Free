/**
 * 固定位数（位数不够，前面补充自定义数字）
 *  @param {Number} num 被操作数
 *  @param {Number} n  固定的总位数
 *  @param {Number} fillNum 位数不足时要补充的数
 *  @returns {String}
 */

import { stringify } from "./stringify";

export function fixedNumber(num,n,fillNum){
	if(stringify(num).split('').length > n){
		return stringify(num);
	}
	fillNum = fillNum || 0;
	return (Array(n).join(fillNum) + num).slice(-n);
}