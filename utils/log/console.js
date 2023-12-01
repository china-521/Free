/**
 * 用来接收日志
 * @param {any} msg 消息内容 
 */

let console = {};
console.log = console.warn = console.debug = console.info = console.error = console.time = console.dir = console.profile = console.clear = console.exception = console.trace = console.assert = function (...msg) {
	return msg;
};
console.log(window.console);
export default window.console ? window.console : console;