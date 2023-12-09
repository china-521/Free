import Free from "../exchange/exchange.js"

// 输出日志
function logTip(open) {
	if (!open) {
		return;
	}
	const info1 = 'Free does not support running under IE browser for the time being.';
	const info2 = [`Free.js ${Free.info.version}`,`${Free.info.gitee}`,`${Free.info.github}`];
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
	const style4 = {
		padding: '5px',
		fontSize: '12px',
		background: 'black',
		background: '#f1c97d',
		marginLeft:1
	};
	Free.logPlus(info1, style1);
	Free.logPlus(info2, [style2, style3,style4]);
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