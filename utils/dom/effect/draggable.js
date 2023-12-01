import {
	isDom
} from "../../type/isDom.js";
import {
	getElement
} from "../element/getElement.js";
import {
	getStyle
} from "../css/css.js"
import {
	warn
} from "../../../exception/warn.js";
import {
	isFree
} from "../../type/isFree.js";
import {
	exception
} from "../../../exception/exception.js";
import {
	isNumber
} from "../../type/isNumber.js";

/**
 *  
 * 元素拖动
 * @param {String / DOM} el 被拖拽元素的选择器 或者 DOM 元素
 * @param {String / DOM} children 被拖拽元素的子元素选择器 或者 DOM 元素
 * @param {String / DOM} selector 碰撞元素的选择器(可有可无) 或者 DOM元素，如果传递，则开启碰撞检测
 * @param {Boolean} flag 是否开启范围限制和磁性吸附,如果为true则开启范围限制，如果不传或者传递的是false则不开启范围限制（默认不开启范围限制）
 * @param {Number} distance 吸附距离(单纯用来拖拽可不用传递，如果考虑碰撞则必须传递)
 * @param {Function} callback 拖拽过程中触发的回调事件
 * @param {Function} enterCallback  碰撞后要设置的回调事件(可有可无),拖拽元素进入到被碰撞元素里面发生的回调事件
 * @param {Function} leaveCallback 碰撞后要设置的回调事件(可有可无),拖拽元素离开被碰撞元素里面发生的回调事件
 */
export function _draggable({
	el,
	children,
	flag,
	distance,
	selector,
	callback,
	enterCallback,
	leaveCallback
}) {
	distance = distance || 20;
	
	if (!isNumber(distance,true,null,arguments)) {
		return;
	}

	el = getElement(el);

	if (!isDom(el)) {
		exception(el, 'domIsNull');
	}

	// 被碰撞的元素
	let bump = getElement(selector);

	if (!isDom(bump)) {
		bump = null;
	}

	// 进入被碰撞元素的标识
	let isEnter = false;

	// 获取子元素
	let child = getElement(children);
	if (!isDom(child)) {
		child = null;
	}

	// 移动方法
	function move(event) {
		// 判断用户是否开启定位
		if (getStyle(el, "position") == "static") {
			warn("Positioning has not been enabled and cannot be dragged");
			return;
		}

		let ol = child ? event.clientX - el.offsetLeft : event.clientX - this.offsetLeft;
		let ot = child ? event.clientY - el.offsetTop : event.clientY - this.offsetTop;

		// 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
		document.onmousemove = function (event) {
			// 获取鼠标坐标
			let x = event.clientX - ol;
			let y = event.clientY - ot;

			// 初始化distance
			let adsorb = 0;
			// 初始化limit
			let limit = flag;
			// 设置范围
			if (limit) {
				// 如果吸附距离有值则开启吸附
				if (distance) {
					adsorb = distance;
				}
				// 如果flag为true则开启范围限制
				if (x < adsorb) {
					x = 0;
				}
				if (x > (document.documentElement.clientWidth - el.offsetWidth - adsorb)) {
					x = document.documentElement.clientWidth - el.offsetWidth;
				}
				if (y < adsorb) {
					y = 0;
				}
				if (y > (document.documentElement.clientHeight - el.offsetHeight - adsorb)) {
					y = document.documentElement.clientHeight - el.offsetHeight;
				}
			}
			// 修改el的位置
			el.style.left = x + "px";
			el.style.top = y + "px";

			// 触发拖拽过程中的事件
			callback && callback(event);

			// 碰撞检测
			if (bump) {
				let Top1 = el.offsetTop;
				let Bottom1 = el.offsetTop + el.offsetHeight;
				let Left1 = el.offsetLeft;
				let Right1 = el.offsetLeft + el.offsetWidth;

				let Top2 = bump.offsetTop;
				let Bottom2 = bump.offsetTop + bump.offsetHeight;
				let Left2 = bump.offsetLeft;
				let Right2 = bump.offsetLeft + bump.offsetWidth;

				if (!(Right1 < Left2 || Left1 > Right2 || Top1 > Bottom2 || Bottom1 < Top2)) {
					if (!isEnter) {
						isEnter = true;
						enterCallback && enterCallback(event);
					}
				} else {
					if (isEnter) {
						isEnter = false;
						leaveCallback && leaveCallback(event);
					}
				}
			}

		};

		// 取消鼠标移动和抬起事件
		document.onmouseup = function () {
			document.onmousemove = document.onmouseup = null;
		};
		return false;
	};

	// 当鼠标在被拖拽元素上按下时，开始拖拽 onmousedown
	child ? child.onmousedown = move : el.onmousedown = move
}

/**
 *  
 * 元素拖动
 * @param {Boolean} batch 是否开启批量设置，为选中的所有元素设置拖拽，默认false
 * @param {String / DOM} children 被拖拽元素的子元素选择器 或者 DOM 元素
 * @param {String / DOM} selector 碰撞元素的选择器(可有可无) 或者 DOM元素，如果传递，则开启碰撞检测
 * @param {Boolean} flag 是否开启范围限制和磁性吸附,如果为true则开启范围限制，如果不传或者传递的是false则不开启范围限制（默认不开启范围限制）
 * @param {Number} distance 吸附距离(单纯用来拖拽可不用传递，如果考虑碰撞则必须传递)
 * @param {Function} callback 拖拽过程中触发的回调事件
 * @param {Function} enterCallback  碰撞后要设置的回调事件(可有可无),拖拽元素进入到被碰撞元素里面发生的回调事件
 * @param {Function} leaveCallback 碰撞后要设置的回调事件(可有可无),拖拽元素离开被碰撞元素里面发生的回调事件
 */
export function draggable({
	batch,
	children,
	flag,
	distance,
	selector,
	callback,
	enterCallback,
	leaveCallback
}) {

	if (!isFree(this)) {
		return this;
	}

	if (batch) {
		this.toArray().forEach(el => {
			_draggable({
				el,
				children,
				flag,
				distance,
				selector,
				callback,
				enterCallback,
				leaveCallback
			});
		});
	} else {
		const el = this.get(0);
		_draggable({
			el,
			children,
			flag,
			distance,
			selector,
			callback,
			enterCallback,
			leaveCallback
		});
	}
	return this;
}