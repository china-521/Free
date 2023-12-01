import {
	exception
} from "../../exception/exception.js";
import {
	createElement
} from "../dom/element/createElement.js";
import {
	getElement
} from "../dom/element/getElement.js";
import {
	isDom
} from "../type/isDom.js";
import {
	isNumber
} from "../type/isNumber.js";

/**
 * 图片进行马赛克处理
 *  @param {String} src 被处理图像的路径
 *  @param {Number} level 马赛克处理程度
 *  @param {String} el 马赛克存放容器选择器
 *  @param {Boolean} flag  是否保留原始图像，默认false
 */
export function mosaic({
	el,
	src,
	width,
	height,
	level,
	flag
}) {

	el = getElement(el);
	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	if (!src) {
		return;
	}

	level = level || (level === 0 ? 0 : 10);

	if ((width && !isNumber(width, true, null, arguments)) ||
		(height && !isNumber(height, true, null, arguments)) ||
		!isNumber(level, true, null, arguments)) {
		return;
	}

	if(level <= 0){
		level = 1;
	}else if(level >= 15){
		level = 15;
	}

	let canvas = createElement({
		tag: 'canvas',
		append: true,
		parent: el,
		attribute:{
			id: 'Free-mosaic'
		}
	});
	let ctx = null;
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
	}
	let img = new Image();
	img.src = src;
	img.onload = () => {
		img.width = width ? width : img.width;
		img.height = height ? height : img.height;
		//如果保留原始图片则将画布扩大两倍
		canvas.width = flag ? img.width * 2 : img.width;
		canvas.height = img.height;
		draw();
	};
	// 定义方法操作图片
	function draw() {
		// 插入图片
		ctx.drawImage(img, 0, 0);
		let oldImgData = ctx.getImageData(0, 0, img.width, img.height);
		let newImgData = ctx.createImageData(img.width, img.height);

		// 马赛克
		/**
		 * 1.选取一个马赛克矩形
		 * 2.从马赛克矩形中随机抽出一个像素点的信息（rgba）
		 * 3.将整个马赛克矩形中的像素点信息统一调成随机抽出的那个
		 */
		// 设置马赛克矩形尺寸
		let size = level;
		// 选取一个马赛克矩形
		for (let i = 0; i < oldImgData.width / size; i++) {
			for (let j = 0; j < oldImgData.height / size; j++) {
				// （i,j）每个马赛克矩形中的每一个像素的坐标
				// 马赛克矩形坐标:(0,0)----》马赛克矩形中的像素点： (0,0)---》(4,4)
				// 马赛克矩形坐标:(0,1)----》马赛克矩形中的像素点： (0,5)---》(4,9)
				// 马赛克矩形坐标:(1,0)----》马赛克矩形中的像素点： (5,0)---》(9,4)
				// 马赛克矩形坐标:(1,1)----》马赛克矩形中的像素点： (5,5)---》(9,9)

				// 获取单个像素信息(x和y为像素点的坐标)
				let x = i * size + Math.floor(Math.random() * size);
				let y = j * size + Math.floor(Math.random() * size);
				let color = getPxInfo(oldImgData, x, y);

				// 将整个马赛克矩形中的像素点信息统一换成随机抽出的那个
				for (let a = 0; a < size; a++) {
					for (let b = 0; b < size; b++) {
						setPxInfo(newImgData, i * size + a, j * size + b, color);
					}
				}
			}
		}
		// // 清空画布信息
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// 重新写入像素信息
		if (flag) {
			//重新插入原始图片
			ctx.drawImage(img, 0, 0);
			//打码后的图片
			ctx.putImageData(newImgData, img.width, 0);
		} else {
			//画布宽度与打码后的图片保持一致
			canvas.width = img.width;
			ctx.putImageData(newImgData, 0, 0);
		}
		// // 创建方法获取单个点的像素信息
		function getPxInfo(imgdata, x, y) {
			let color = [];
			let data = imgdata.data;
			let w = imgdata.width;
			let h = imgdata.height;
			// (x,y) x*w+y:这里 w 代表的是一行上边像素点的个数，x表示列，y表示行
			// r
			color[0] = data[(y * w + x) * 4];
			// g
			color[1] = data[(y * w + x) * 4 + 1];
			// b
			color[2] = data[(y * w + x) * 4 + 2];
			// a
			color[3] = data[(y * w + x) * 4 + 3];

			return color;
		}
		// // 创建方法修改像素信息
		function setPxInfo(imgdata, x, y, color) {
			let data = imgdata.data;
			let w = imgdata.width;
			let h = imgdata.height;
			// (x,y) x*w+y:这里 w 代表的是一行上边像素点的个数，x表示列，y表示行
			// r
			data[(y * w + x) * 4] = color[0];
			// g
			data[(y * w + x) * 4 + 1] = color[1];
			// b
			data[(y * w + x) * 4 + 2] = color[2];
			// a
			data[(y * w + x) * 4 + 3] = color[3];
			return color;
		}
	}

}