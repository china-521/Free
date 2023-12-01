import {
	error
} from "../../exception/error.js"
import {
	isNotEmptyString
} from "../type/isNotEmptyString.js"
import {
	isNotEmptyObject
} from "../type/isNotEmptyObject.js"
import {
	extend
} from "../../extend/extend.js"

/**
 *  发送 ajax 请求
 *  @param {String} method 请求方式
 *  @param {String} url 接口地址
 *  @param {Object} params 请求参数
 *  @param {Object} data  请求体
 *  @param {Object} headers 请求头
 *      
 */
export function $axios({
	method,
	url,
	params,
	data
}) {
	// method大写化
	if (method) {
		if (isNotEmptyString(method)) {
			method = method.toUpperCase();
		} else {
			error('The input types do not match. The method must be a String type');
		}
	} else {
		error('Method cannot be empty');
	}

	if (url) {
		if (!isNotEmptyString(url)) {
			error('The input types do not match. The url must be a String type');
		}
	} else {
		error('url cannot be empty');
	}
	// 返回值
	return new Promise((resolve, reject) => {
		// 1.创建对象
		const xhr = new XMLHttpRequest();
		// 2.初始化
		// 处理 params 对象(包含 url 参数)
		let str = '';
		for (let k in params) {
			str += `${k}=${params[k]}&`;
		}
		// 截取 url 参数后边的 & 符
		str = str.slice(0, -1);
		// 设置 url 参数
		xhr.open(method, url + '?' + str);
		// 3.发送请求
		if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
			// 设置 Content-type mime 类型(请求头类型)
			xhr.setRequestHeader('Content-type', 'application/json');
			// 设置请求体
			xhr.send(JSON.stringify(data));
		} else {
			xhr.send();
		}
		// 设置响应结果的类型为 JSON
		xhr.responseType = 'json';
		// 4.处理结果
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					// 成功的状态
					resolve({
						status: xhr.status,
						statusText: xhr.statusText,
						data: xhr.response,
						config: {
							url: url,
							method: method,
							params: params
						}
					});
				} else {
					reject(error('Request failed with status code:' + xhr.status));
				}
			}
		};
	});
}

/**
 * 
 * @param {String} url 
 * @param {Object} options 请求体 或 params
 * @returns 
 */
export function DELETE(url, options) {
	// 发送 ajax 请求 GET	
	let config = isNotEmptyObject(options) ? Object.assign(options, {
		method: 'DELETE',
		url: url
	}) : {
		method: 'DELETE',
		url: url
	};
	return $axios(config);
}

/**
 * 
 * @param {String} url 
 * @param {Object} options 请求体 或 params
 * @returns 
 */
export function GET(url, options) {
	// 发送 ajax 请求 GET
	let config = isNotEmptyObject(options) ? Object.assign(options, {
		method: 'GET',
		url: url
	}) : {
		method: 'GET',
		url: url
	};
	return $axios(config);
}

/**
 * 
 * @param {String} url 
 * @param {Object} options 请求体 或 params
 * @returns 
 */
export function POST(url, options) {
	// 发送 ajax 请求 GET
	let config = isNotEmptyObject(options) ? Object.assign(options, {
		method: 'POST',
		url: url
	}) : {
		method: 'POST',
		url: url
	};
	return $axios(config);
}

/**
 * 
 * @param {String} url 
 * @param {Object} options 请求体 或 params
 * @returns 
 */
export function PUT(url, options) {
	// 发送 ajax 请求 GET
	let config = isNotEmptyObject(options) ? Object.assign(options, {
		method: 'PUT',
		url: url
	}) : {
		method: 'PUT',
		url: url
	};
	return $axios(config);
}

const temp = {
	get:GET,
	post:POST,
	put:PUT,
	delete:DELETE
};

extend(temp, $axios, true);
