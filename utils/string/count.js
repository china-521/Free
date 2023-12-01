 import {
 	isString
 } from "../type/isString.js";

 /**
  * 统计子串在父串中出现的次数
  * @param {String} parent
  * @param {String} sub 
  * @return {String}
  */
 export function count(parent, sub) {
 	if (!parent || !sub) {
 		return 0;
 	}
 	if (!isString(parent, true, null, arguments) || !isString(sub, true, null, arguments)) {
 		return;
 	}
 	if (parent.length < sub.length) {
 		return 0;
 	}
 	let subLength = sub.length;
 	let count = 0;
 	let index = 0;
 	while ((index = parent.indexOf(sub, index)) != -1) {
 		count++;
 		index += subLength;
 	}
 	return count;
 }