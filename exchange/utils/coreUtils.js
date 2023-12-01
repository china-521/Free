import {
	addMethod
} from "../../utils/core/addMethod.js"
import {
	apply
} from "../../utils/core/apply.js"
import {
	appendQuery
} from "../../utils/core/appendQuery.js"
import {
	bind
} from "../../utils/core/bind.js"
import {
	call
} from "../../utils/core/call.js"
import {
	checkPlatform
} from "../../utils/core/checkPlatForm.js"
import {
	contains
} from "../../utils/core/contains.js"
import {
	colorNameToHex
} from "../../utils/core/colorNameToHex.js"
import {
	colorNameToRgb
} from "../../utils/core/colorNameToRgb.js"
import {
	createInstance
} from "../../utils/core/createInstance.js"
import {
	debounce
} from "../../utils/core/debounce.js"
import {
	decycle
} from "../../utils/core/decycle.js"
import {
	deepCopy
} from "../../utils/core/deepCopy.js"
import {
	equals
} from "../../utils/core/equals.js"
import {
	fixedNumber
} from "../../utils/core/fixedNumber.js"
import {
	get
} from "../../utils/core/get.js"
import {
	getQuery
} from "../../utils/core/getQuery.js"
import {
	hash
} from "../../utils/core/hash.js"
import {
	hashCode
} from "../../utils/core/hashCode.js"
import {
	hexToColorName
} from "../../utils/core/hexToColorName.js"
import {
	hexToRgb
} from "../../utils/core/hexToRgb.js"
import {
	importLink
} from "../../utils/core/importLink.js"
import {
	ipToNumber
} from "../../utils/core/ipToNumber.js"
import {
	isDarkMode
} from "../../utils/core/isDarkMode.js"
import {
	isEmpty
} from "../../utils/core/isEmpty.js"
import {
	isMobile
} from "../../utils/core/isMobile.js"
import {
	instanceOf
} from "../../utils/core/instanceOf.js"
import {
	keys
} from "../../utils/core/keys.js"
import {
	list
} from "../../utils/core/list.js"
import {
	map
} from "../../utils/core/map.js"
import {
	parseJson
} from "../../utils/core/parseJson.js"
import {
	proxy,proxyData,createProxyHandler
} from "../../responsive/proxy.js"
import {
	randomColor
} from "../../utils/core/randomColor.js"
import readFile from "../../utils/core/readFile.js"
import {
	rgbToColorName
} from "../../utils/core/rgbToColorName.js"
import {
	rgbToHex
} from "../../utils/core/rgbToHex.js"
import {
	shallowCopy
} from "../../utils/core/shallowCopy.js"
import {
	size
} from "../../utils/core/size.js"
import Stack from "../../utils/core/stack.js"
import {
	stringify
} from "../../utils/core/stringify.js"
import {
	throttle
} from "../../utils/core/throttle.js"
import {
	toArray
} from "../../utils/core/toArray.js"
import {
	toJson
} from "../../utils/core/toJson.js"
import {
	uuid
} from "../../utils/core/uuid.js"
export default {
	toFunction: {
		addMethod,
		apply,
		appendQuery,
		bind,
		call,
		checkPlatform,
		contains,
		colorNameToHex,
		colorNameToRgb,
		createInstance,
		createProxyHandler,
		debounce,
		decycle,
		deepCopy,
		equals,
		fixedNumber,
		getQuery,
		hash,
		hashCode,
		hexToColorName,
		hexToRgb,
		importLink,
		instanceOf,
		ipToNumber,
		isDarkMode,
		isEmpty,
		isMobile,
		keys,
		list,
		map,
		parseJson,
		proxy,
		proxyData,
		randomColor,
		readFile,
		rgbToColorName,
		rgbToHex,
		shallowCopy,
		Stack,
		stringify,
		throttle,
		toJson,
		uuid
	},
	toProperty: {
		size,
		get,
		toArray
	},
}