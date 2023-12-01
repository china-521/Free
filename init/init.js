import Free from "../exchange/exchange.js"

// 输出日志
function logTip(open) {
	if (!open) {
		return;
	}
	const info1 = 'Free does not support running under IE browser for the time being.\n' +
		`Welcome to my blog：${Free.info.blog}  ${Free.info.csdn}`;
	const info2 = [`Free.js ${Free.info.version}`, `${Free.info.doc}`];
	const style1 = {
		color: 'deeppink'
	};
	const style2 = {
		padding: '5px',
		fontSize: '12px',
		background: 'black',
		color: '#f6d79e'
	};
	const style3 = {
		padding: '5px',
		fontSize: '12px',
		background: 'black',
		background: '#f1c97d',
	};
	Free.logPlus(info1, style1);
	Free.logPlus(info2, [style2, style3]);
}

const inBrowser = typeof window !== 'undefined';
if (inBrowser) {
	setTimeout(() => {
		if (Free.logTip) {
			logTip(Free.logTip);
		}
	}, 1);
}

export default Free