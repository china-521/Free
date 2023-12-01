  import {
  	isArray
  } from "../type/isArray.js";
  import {
  	isFunction
  } from "../type/isFunction.js";

  /**
   * 从左到右为每个数组元素执行一次回调方法，并把上次回调方法的返回值放在一个暂存器中，传给下次回调方法，
   * 并返回最后一次回调方法的返回值。
   * @param {Array} arr 数组
   * @param {Function} callback 回调方法
   * @param {any} initValue  初始值
   * @return {any}
   */
  export function reduce(arr, callback, initValue) {
  	arr = arr || [];
  	if (!isArray(arr, true, null, arguments)) {
  		return;
  	}
  	if (!callback && !initValue) {
  		return;
  	} else if (!callback && initValue) {
  		return initValue;
  	}
  	if (!isFunction(callback, true, null, arguments)) {
  		return;
  	}

  	if (arr.length === 0) {
  		return;
  	}
  	// 声明变量
  	let result = initValue || ((initValue === 0) ? 0 : '');
  	// 遍历数组
  	for (let i = 0, len = arr.length; i < len; i++) {
  		// 执行回调
  		result = callback && callback(result, arr[i]);
  	}
  	// 返回最终的结果
  	return result;
  }