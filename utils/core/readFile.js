import {
	error
} from "../../exception/error.js";


let result = {};
let status = 300;
let url = "";

/**
 * 
 * @param {String} url 
 * @param {} data 
 * @returns 
 */
function propertiesHandle(url, data) {
	if(data && data.length){
		// 处理 json
		if (/.json$/.test(url)) {
			data = JSON.parse(data);
		}
	}
	return data;
}

/**
 * 读取文件
 * @param {String} url 文件路径或者在线url
 * @return {Object}
 */
function read(url) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open("get", url);
		request.send(null);
		request.onload = function () {
			if (request.status === 200) {
				result = propertiesHandle(url, request.response);
				status = request.status;
				url = request.responseURL;
				resolve({
					result,
					status,
					url
				});
			} else {
				reject(error('Failed to read. Please check whether the configuration file exists or the path is correct\n' + 'Request failed with status code:' + request.status));
			}
		};
	});
}

export default {
	result,
	status,
	url,
	read
}