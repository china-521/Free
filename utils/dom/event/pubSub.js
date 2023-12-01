/**
 * 功能说明：
 * 		- 消息订阅与发布
 *      - 实现代码分离，代码解耦
 *      - PubSub: 包含所有功能的订阅/发布消息的管理者
 *      - $subscribe: 订阅消息，指定消息名和订阅者回调函数
 *      - publish: 异步发布消息，指定消息名和数据
 *      - unsubscribe: 取消订阅，根据标识取消某个或某些消息的订阅
 */

// 订阅的唯一索引
let index = 0;
// 频道与回调的容器
let callbacks = {};

/**
 * 订阅频道
 * @param {String} channel 订阅消息名 
 * @param {Function} callback 订阅者回调函数
 * @return {Number} 频道订阅的 index
 */
function $subscribe (channel, callback) {
	// 创建唯一的编号/索引
	let uIndex = 'index:' + index++;
	// 判断 callbacks属性中是否存在 订阅内容
	if (callbacks[channel]) {
		callbacks[channel][uIndex] = callback;
	} else {
		callbacks[channel] = {
			[uIndex]: callback
		}
	}
	// 返回频道订阅的 index
	return uIndex;
}

/**
 * 发布消息
 * @param {String} channel 订阅消息名 
 * @param {any} data 消息的数据
 */
function $publish(channel, data) {
	if (callbacks[channel]) {
		// 获取当前频道中所有的回调
		Object.values(callbacks[channel]).forEach(callback => {
			callback(data);
		});
	}
}

/**
 * 取消订阅
 * @param {Boolean} flag  取消订阅标识   
 */
function $unsubscribe(flag) {
	// 如果flag为 undefined，则清空所有订阅
	if (flag === undefined) {
		callbacks = {};
	} else if (typeof flag === 'string') {
		// 判断是否为 index：开头
		if (flag.indexOf('index:') === 0) {
			// 如果是 则表明是一个订阅索引 (index)
			let callbackObj = Object.values(callbacks).find(obj => obj.hasOwnProperty(flag));
			// 判断
			if (callbackObj) {
				delete callbackObj[flag];
			} else {
				console.error('没有匹配的：' + flag);
			}
		} else {
			// 表明是一个频道的名称
			delete callbacks[flag];
		}
	}
}

export default {
	index,
	callbacks,
	$publish,
	$subscribe,
	$unsubscribe
}