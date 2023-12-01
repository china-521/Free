// Free
import Free from "../main/main.js";

// 扩展方法
import {
	extend
} from "../extend/extend.js";

// 方法合集
import config from "../config/config.js";
import ajaxUtils from "./utils/ajaxUtils.js";
import arrayUtils from "./utils/arrayUtils.js";
import coreUtils from "./utils/coreUtils.js";
import dateUtils from "./utils/dateUtils.js";
import domUtils from "./utils/domUtils.js";
import effectUtils from "./utils/effectUtils.js";
import extendUtils from "./utils/extendUtils.js";
import exceptionUtils from "./utils/exceptionUtils.js";
import logUtils from "./utils/logUtils.js";
import mathUils from "./utils/mathUils.js";
import objectUtils from "./utils/objectUtils.js";
import regUtils from "./utils/regUtils.js";
import stringUtils from "./utils/stringUtils.js";
import storageUtils from "./utils/storageUtils.js";
import typeUtils from "./utils/typeUtils.js";

// 扩展到 Free 本身
extend(ajaxUtils, Free, true);
extend(arrayUtils, Free, true);
extend({
	info: config.freeInfo
}, Free, true);
extend({
	nodeType: config.nodeType
}, Free, true);
extend({
	colorMap: config.colorMap
}, Free, true);
extend(coreUtils.toFunction, Free, true);
extend(dateUtils, Free, true);
extend(domUtils.toFunction, Free, true);
extend(effectUtils, Free, true);
extend(extendUtils, Free, true);
extend(exceptionUtils, Free, true);
extend(logUtils, Free, true);
extend(mathUils, Free, true)
extend(objectUtils, Free, true);
extend(regUtils, Free, true);
extend(stringUtils, Free, true);
extend(storageUtils, Free, true);
extend(typeUtils, Free, true);

// 扩展到 Free 的原型对象
extend({
	info: config.freeInfo
}, Free)
extend({
	nodeType: config.nodeType
}, Free);
extend(coreUtils.toProperty, Free);
extend(domUtils.toPrototype, Free);

export default Free;