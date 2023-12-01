import {
	ipReg
} from "../reg/ipReg.js";
import {
	error
} from "../../exception/error.js";
/**
 * ip地址转数字
 * @param {String} ip ip地址 
 * @returns {Number}
 */
export function ipToNumber(ip) {
	if (!ip) {
		return void 0;
	}
	if (!ipReg(ip)) {
		error(null, 'ip');
	}
	let ipFragments = ip.split('.');
	let ipNumber = 0;
	ipFragments.reverse().forEach((ipFragment, index) => {
		ipNumber += ipFragment * Math.pow(256, index);
	});
	return ipNumber;
}