 import event from "../dom/event/event.js";
 import {
 	getElement
 } from "../dom/element/getElement.js"
 import {
 	exception
 } from "../../exception/exception.js";
 import {
 	isDom
 } from "../type/isDom.js";
 import {
 	createElement
 } from "../dom/element/createElement.js"
 import {
 	isColorName
 } from "../type/isColorName.js";
 import {
 	isHexColor
 } from "../type/isHexColor.js";
 import {
 	hexToRgb
 } from "../core/hexToRgb.js";
 import {
 	isRgbColor
 } from "../type/isRgbColor.js";
 import {
 	rgbToHex
 } from "../core/rgbToHex.js";
 import {
 	colorNameToRgb
 } from "../core/colorNameToRgb.js";
 import {
 	getStyle
 } from "../dom/css/css.js";
 import {
 	isNumber
 } from "../type/isNumber.js";

 /**
  *  实现粒子推动特效
  *  @param {String} el 放置粒子的容器
  *  @param {Object/String} color 粒子颜色
  *  @param {Number} count 粒子数量，默认为 200
  *  @param {Boolean} random 开启粒子随机颜色，默认为 false
  *  @param {Number} lineWidth 粒子线条宽度，默认为 2
  *  @param {Number} connectDistance 粒子之间的连接距离
  *  @param {Number} rRate 颜色RGB 中 r 所占的比率，当且仅当 random 为 true 时生效，默认 0.5
  *  @param {Number} gRate 颜色RGB 中 g 所占的比率，当且仅当 random 为 true 时生效，默认 0.5
  *  @param {Number} bRate 颜色RGB 中 b 所占的比率，当且仅当 random 为 true 时生效，默认 0.5
  *  @param {Number} balance 平衡因子，用来平衡粒子颜色，当且仅当 random 为 true 时生效，默认 0.5
  *  @param {Number} speed 粒子运动的速度
  *  @param {Number} oscAmplitudeX 粒子沿着 Y 轴方向的振幅，默认为 2
  * @param {Number} oscAmplitudeY 粒子沿着 X 轴方向的振幅，默认为 2
  */
 export function particle({
 	el,
 	color,
 	count,
 	random,
 	lineWidth,
 	connectDistance,
 	rRate,
 	gRate,
 	bRate,
 	balance,
 	speed,
 	oscAmplitudeX,
 	oscAmplitudeY
 }) {

 	el = getElement(el);

 	if (!isDom(el)) {
 		exception(el, 'domIsNull');
 	}

 	count = count || 200;
 	speed = speed || 0.15;
 	lineWidth = lineWidth || 2;
 	connectDistance = connectDistance || 2;
 	rRate = rRate || 0.5;
 	gRate = gRate || 0.5;
 	bRate = bRate || 0.5;
 	balance = balance || 0.5;
 	oscAmplitudeX = oscAmplitudeX || 2;
 	oscAmplitudeY = oscAmplitudeY || 2;

 	if (!isNumber(count, true, null, arguments) ||
 		!isNumber(speed, true, null, arguments) ||
 		!isNumber(lineWidth, true, null, arguments) ||
 		!isNumber(connectDistance, true, null, arguments) ||
 		!isNumber(rRate, true, null, arguments) ||
 		!isNumber(gRate, true, null, arguments) ||
 		!isNumber(bRate, true, null, arguments) ||
 		!isNumber(balance, true, null, arguments) ||
 		!isNumber(oscAmplitudeX, true, null, arguments) ||
 		!isNumber(oscAmplitudeY, true, null, arguments)) {
 		return;
 	}

 	let canvas = createElement({
 		tag: 'canvas',
 		append: true,
 		parent: el
 	});

 	if (canvas.localName !== 'canvas') {
 		error('The particle effect can only take effect with canvas tag, please pass in canvas selector');
 	}
 	const t = canvas,
 		n = t.getContext("2d"),
 		o = 1;
 	let a = t.width = parseInt(getStyle(el, 'width')) * o,
 		c = t.height = parseInt(getStyle(el, 'height')) * o;
 	const i = .05 * a * connectDistance,
 		s = .1 * a,
 		d = (e = 1) => Math.random() * e,
 		l = Math.PI,
 		r = 2 * l;
 	let p = new Date;


 	color = color || {
 		r: 255,
 		g: 255,
 		b: 255
 	};

 	if (isColorName(color)) {
 		color = colorNameToRgb(color);
 	} else if (isHexColor(color)) {
 		color = hexToRgb(color);
 	} else if (isRgbColor(color)) {
 		color = hexToRgb(rgbToHex(color));
 	}

 	const h = (e, t, n) => (1 - n) * e + n * t,
 		m = (e, t, n, o) => {
 			const a = e - n,
 				c = t - o;
 			return Math.sqrt(a * a + c * c)
 		},
 		y = new Array(count).fill({}).map(() => ({
 			x: .5 * a + Math.cos(d(r)) * d(.5 * a),
 			y: .5 * c + Math.sin(d(r)) * d(.5 * c),
 			angle: d(r),
 			speed: d(.15),
 			normalSpeed: d(speed),
 			oscAmplitudeX: d(oscAmplitudeX),
 			oscSpeedX: .001 + d(.008),
 			oscAmplitudeY: d(oscAmplitudeY),
 			oscSpeedY: .001 + d(.008),
 			connectDistance: d(i),
 			color: color
 		})),
 		g = () => {
 			p = new Date, y.forEach(e => {
 				e.x += (Math.cos(e.angle) + Math.cos(p * e.oscSpeedX) * e.oscAmplitudeX) * e.speed,
 					e.y += (Math.sin(e.angle) + Math.cos(p * e.oscSpeedY) * e.oscAmplitudeY) * e.speed,
 					e.speed = h(e.speed, e.normalSpeed * o, .1), (e.x > a || e.x < 0) &&
 					(e.angle = l - e.angle), (e.y > c || e.y < 0) && (e.angle = -e.angle), d() < .005 &&
 					(e.oscAmplitudeX = d(oscAmplitudeX)), d() < .005 && (e.oscSpeedX = .001 + d(.008)), d() < .005 &&
 					(e.oscAmplitudeY = d(oscAmplitudeY)), d() < .005 && (e.oscSpeedY = .001 + d(.008)), e.x = Math.max(-.01, Math.min(e.x, a + .01)),
 					e.y = Math.max(-.01, Math.min(e.y, c + .01))
 			}), n.clearRect(0, 0, a, c), y.map(e => {
 				y.filter(t => e != t && !(m(e.x, e.y, t.x, t.y) > e.connectDistance)).map(t => {
 					const n = m(e.x, e.y, t.x, t.y);
 					return e.speed = h(e.speed, e.speed + .05 / e.connectDistance * n, .2), {
 						p1: e,
 						p2: t,
 						color: e.color,
 						opacity: Math.floor(100 / e.connectDistance * (e.connectDistance - n)) / 100
 					}
 				}).forEach((e) => {
 					const o = random ? Math.sin(p * e.p1.oscSpeedX) : 1;
 					n.beginPath(), n.globalAlpha = e.opacity, n.moveTo(e.p1.x, e.p1.y), n.lineTo(e.p2.x, e.p2.y),
 						n.strokeStyle = `rgb(${Math.floor(random ? rRate * e.color.r + balance * e.color.r * o : e.color.r * o)},${Math.floor(
							random ? gRate * e.color.g + balance * e.color.g * o : e.color.g
						)},${random ? bRate * e.color.b + balance * e.color.b * o : e.color.b})`,
 						n.lineWidth = lineWidth * e.opacity, n.stroke(), n.closePath()
 				})
 			}), window.requestAnimationFrame(g)
 		};
 	g(), event.add("window", "mousemove", e => {
 		const t = e.layerX * o,
 			n = e.layerY * o;
 		y.forEach(e => {
 			const o = m(t, n, e.x, e.y);
 			if (o < s && o > 0) {
 				e.angle = ((e, t, n, o) => Math.atan2(o - t, n - e))(t, n, e.x, e.y);
 				const a = .1 * (s - o);
 				e.speed = h(e.speed, a, .2)
 			}
 		})
 	}), event.add("window", "resize", () => {
 		a = t.width = parseInt(getStyle(el, 'width')) * o,
 			c = t.height = parseInt(getStyle(el, 'height')) * o
 	})
 }