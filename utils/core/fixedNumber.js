/**
 * 固定位数（位数不够，前面补充自定义数字）
 *  @param {Number} num：被操作数
 *  @param {Number} n： 固定的总位数
 *  @param {Number} num1：位数不足时要补充的数
 *  @returns {String}
 */

import { stringify } from "./stringify";

export function fixedNumber(num,n,num1){
	if(stringify(num).split('').length > n){
		return stringify(num);
	}
	num1 = num1 || 0;
	return (Array(n).join(num1) + num).slice(-n);
}