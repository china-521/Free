import {
	extend
} from "../../extend/extend.js"

/**
 * 拼接消息
 * @param {String} pre 信息前缀 
 * @param {String} medium 信息中缀
 * @param {String} keySuf 消息名称的后缀
 * @param {Object} typeObject 信息类型对象
 * @return {Object}
 */
function concat(pre, medium, keySuf, typeObject) {
	let result = {};
	Object.keys(typeObject).forEach(item => {
		result[keySuf ? item + keySuf : item] = pre + medium + typeObject[item];
	});
	return result;
}


const pre = "The input type does not match. ";

let medium = "Please enter ";

// 消息类型对象
const typeObject = {
	Array: 'a Array',
	AsyncFunction: 'a AsyncFunction',
	Boolean: 'a Boolean',
	Date: 'a Date',
	Defined: 'a defined value',
	Dom: 'a Dom',
	emptyArray: 'a empty Array',
	emptyString: 'a empty String',
	emptyObject: 'a empty Object',
	notEmptyArray: 'a not empty Array',
	notEmptyString: 'a not empty String',
	notEmptyObject: 'a not empty Object',
	Function: 'a Function',
	Integer: 'an Integer',
	Json: '"a Json',
	Map: 'a Map',
	NaN: 'a NaN',
	NodeList: 'a NodeList',
	Null: 'a Null',
	Number: 'a Number',
	Object: 'an Object',
	RegExp: 'a RegExp',
	String: 'a String',
	Undefined: 'an Undefined',
	Set: 'a Set',
	Window: 'a Window',
	Free: 'a Free',
	styleName: 'a correct style name',
	style: 'a correct style',
	event: 'a correct event name',
	htmlTag: 'a correct HTML Tag',
	plainObject: 'a plain Object',
	htmlDocument: 'a document',
	extendParam: 'an object or function'
};

const typeMsg = concat(pre, medium, null, typeObject);

medium = 'The argument {index} must ';

const typeArgumentMsg = concat(pre, medium, 'Argument', typeObject);

const ip = 'Please enter the IP address in the correct format';
const platform = 'Sorry, your browser does not support the platform attribute';
const domIsNull = 'The target DOM Element is null';

const errorMessage = {
	ip,
	platform,
	domIsNull
};

extend(typeMsg,errorMessage);
extend(typeArgumentMsg,errorMessage);
export default errorMessage;