/**
 * 产生随机颜色
 * @return {String}
 */
export function randomColor(){
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,'0');
}