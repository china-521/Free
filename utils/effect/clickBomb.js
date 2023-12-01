import {
	isArray
} from "../type/isArray.js"
import {
	createElement
} from "../dom/element/createElement.js"
import {
	getElement
} from "../dom/element/getElement.js";
import event from "../dom/event/event.js";
import {
	error
} from "../../exception/error.js";
import {
	getStyle
} from "../dom/css/css.js";

/**
 * 鼠标点击爆炸特效
 * @param {DOM/String} el 鼠标点击的元素选择器或 DOM 元素，默认是 document.body 
 * @param {Array} colors 爆炸的颜色数组
 */
export function clickBomb({
	el,
	colors
}) {
	el = getElement(el);

	colors = colors || ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];

	if (!isArray(colors, true, null, arguments)) {
		return;
	}

	const canvas = createElement({
		tag: 'canvas',
		append: true,
		parent: el || document.body,
		style: {
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			zIndex: 99999,
			position: 'fixed',
			pointerEvents: 'none'
		}
	});

	const pointer = createElement({
		tag: 'pointer',
		append: true,
		parent: el || document.body,
		attribute: {
			class: 'pointer'
		}
	});

	let balls = [];
	let longPressed = false;
	let longPress;
	let multiplier = 0;
	let width, height;
	let origin;
	let normal;
	let ctx;

	if (canvas.getContext && window.addEventListener) {
		ctx = canvas.getContext("2d");
		updateSize();
		window.addEventListener('resize', updateSize, false);
		loop();
		event.add(el || 'window', "mousedown", function (e) {
			pushBalls(randBetween(10, 20), e.clientX, e.clientY);
			el ? el.classList.add("is-pressed") : document.body.classList.add("is-pressed");
			longPress = setTimeout(function () {
				el ? el.classList.add("is-pressed") : document.body.classList.add("is-pressed");
				longPressed = true;
			}, 500);
		}, false);
		event.add(el || 'window', "mouseup", function (e) {
			clearInterval(longPress);
			if (longPressed == true) {
				el ? el.classList.remove("is-longpress") : document.body.classList.remove("is-longpress");
				pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
				longPressed = false;
			}
			el ? el.classList.remove("is-longpress") : document.body.classList.remove("is-longpress");
		}, false);
		event.add(el || 'window', "mousemove", function (e) {
			let x = e.clientX;
			let y = e.clientY;
			pointer.style.top = y + "px";
			pointer.style.left = x + "px";
		}, false);
	} else {
		error("canvas or addEventListener is unsupported!");
	}

	function updateSize() {
		canvas.width = (parseInt(getStyle(el)) || window.innerWidth) * 2;
		canvas.height = (parseInt(getStyle(el)) || window.innerHeight) * 2;
		canvas.style.width = (parseInt(getStyle(el)) || window.innerWidth) + 'px';
		canvas.style.height = (parseInt(getStyle(el)) || window.innerHeight) + 'px';
		ctx.scale(2, 2);
		width = (canvas.width = (parseInt(getStyle(el)) || window.innerWidth));
		height = (canvas.height = (parseInt(getStyle(el)) || window.innerHeight));
		origin = {
			x: width / 2,
			y: height / 2
		};
		normal = {
			x: width / 2,
			y: height / 2
		};
	}

	class Ball {
		constructor(x = origin.x, y = origin.y) {
			this.x = x;
			this.y = y;
			this.angle = Math.PI * 2 * Math.random();
			if (longPressed == true) {
				this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
			} else {
				this.multiplier = randBetween(6, 12);
			}

			this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
			this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
			this.r = randBetween(8, 12) + 3 * Math.random();
			this.color = colors[Math.floor(Math.random() * colors.length)];
		}

		update() {
			this.x += this.vx - normal.x;
			this.y += this.vy - normal.y;
			normal.x = -2 / window.innerWidth * Math.sin(this.angle);
			normal.y = -2 / window.innerHeight * Math.cos(this.angle);
			this.r -= 0.3;
			this.vx *= 0.9;
			this.vy *= 0.9;
		}
	}

	function pushBalls(count = 1, x = origin.x, y = origin.y) {
		for (let i = 0; i < count; i++) {
			balls.push(new Ball(x, y));
		}
	}

	function randBetween(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	function loop() {
		ctx.fillStyle = "rgba(255, 255, 255, 0)";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < balls.length; i++) {
			let b = balls[i];
			if (b.r < 0) continue;
			ctx.fillStyle = b.color;
			ctx.beginPath();
			ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
			ctx.fill();
			b.update();
		}
		if (longPressed == true) {
			multiplier += 0.2;
		} else if (!longPressed && multiplier >= 0) {
			multiplier -= 0.4;
		}

		removeBall();
		requestAnimationFrame(loop);
	}

	function removeBall() {
		for (let i = 0; i < balls.length; i++) {
			let b = balls[i];
			if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
				balls.splice(i, 1);
			}
		}
	}
}