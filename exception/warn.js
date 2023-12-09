import console from "../utils/log/console.js"
/**
 * 控制台输出警告
 * @param  {...any} msg 自定义异常信息
 */
export function warn(...msg) {
	const pre = '[Free warn]:';
	console.warn(pre,...msg);
}