/**
 * 检查用户设备是否处于暗模式    
 * @return {Boolean}
 */
export function isDarkMode() {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}