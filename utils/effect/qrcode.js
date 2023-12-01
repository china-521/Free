import {
	isDom
} from "../type/isDom.js"
import {
	isString
} from "../type/isString.js";
import {
	isNumber
} from "../type/isNumber.js"
import {
	importLink
} from "../core/importLink.js"
import {
	contains
} from "../core/contains.js";
import {
	getElement
} from "../dom/element/getElement.js";
import {
	exception
} from "../../exception/exception.js";
import {
	createElement
} from "../dom/element/createElement.js"
import {
	setStyle
} from "../dom/css/css.js";
import {
	isPlainObject
} from "../type/isPlainObject.js";


/**
 *  生成二维码
 * @param {String/DomObject} el 存放二维码的容器
 * @param {String} text 二维码携带的数据
 * @param {Number} width 二维码的宽度
 * @param {Number} height 二维码的高度
 *  @param {String} style  二维码图片样式
 * @param {String} colorDark 二维码的黑色像素
 * @param {String} colorLight 二维码的白色像素
 * @param {String} correctLevel 二维码的纠错能力
 * @param {String} logoSrc 二维码logo路径
 */
export function qrcode({
	el,
	text,
	width,
	height,
	style,
	colorDark,
	colorLight,
	correctLevel,
	logoSrc,
}) {

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	// 创建放置二维码的容器
	const id = 'free-qrcode-container';
	const container = createElement({
		tag: 'div',
		append: true,
		parent: el,
		attribute: {
			id
		},
	});

	text = text || "";
	width = width || 100;
	height = height || 100;
	colorDark = colorDark || "#000000";
	colorLight = colorLight || "#ffffff";
	correctLevel = correctLevel || "H";

	if (!isNumber(width, true, null, arguments) || !isNumber(height, true, null, arguments)) {
		return;
	}

	if (!isString(colorDark, true, null, arguments) ||
		!isString(colorLight, true, null, arguments) ||
		!isString(correctLevel, true, null, arguments)) {
		return;
	}

	importLink('js', {
		type: 'text/javascript'
	}, ['https://wk-china.gitee.io/qrcode-min/qrcode-min.js']);


	const idSelector = `#${id}`
	const canvasSelector = `${idSelector} canvas`;
	const qrImgSelector = `${idSelector} img[alt="Scan me!"]`;

	let count = 0;
	let timer = setInterval(() => {
		// 定义纠错能力
		let correctLevelObject = {};
		if (window.QRCode) {
			// 清除旧的二维码
			clearInterval(timer);
			correctLevelObject = {
				L: window.QRCode.CorrectLevel.L,
				M: window.QRCode.CorrectLevel.M,
				Q: window.QRCode.CorrectLevel.Q,
				H: window.QRCode.CorrectLevel.H
			};

			if (!contains(correctLevelObject, correctLevel)) {
				exception(correctLevel, null,'The entered correctlevel is illegal. You can select from the following specified values: [L, M, Q, H]');
			}

			let qr = new QRCode(container, {
				text: text,
				width: width,
				height: height,
				render: 'canvas',
				colorDark: colorDark,
				colorLight: colorLight,
				correctLevel: correctLevelObject[`${correctLevel}`]
			});
			
			// 设置二维码样式
			if(style && isPlainObject(style,true,null,arguments)){
				setStyle(qrImgSelector, style);
			}

			// 添加logo
			if (logoSrc) {
				// 获取画布
				let canvas = getElement(canvasSelector);
				// 获取生成的二维码图片
				let qrImg = getElement(qrImgSelector);
				// 设置logo参数
				let logoWidth = width / 4;
				let logoHeight = height / 4;
				let logoX = (width - logoWidth) / 2;
				let logoY = (height - logoHeight) / 2;
				if (canvas.getContext) {
					let ctx = canvas.getContext('2d');
					let img = new Image();
					img.src = logoSrc;
					img.onload = function () {
						// 清空上一次残留的logo
						ctx.clearRect(logoX, logoY, logoWidth, logoHeight);
						// 将logo绘制到二维码上
						ctx.drawImage(img, logoX, logoY, logoWidth, logoHeight);
						// 将logo和二维码结合生成新的图片
						qrImg.src = canvas.toDataURL();
					}
				}
			}
		} else {
			count++;
			if (count > 1000) {
				clearInterval(timer);
			}
		}
	}, 20);
}