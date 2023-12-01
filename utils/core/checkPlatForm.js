import {
	error
} from "../../exception/error.js";

export function checkPlatform() {
	const platform = window.navigator.platform;
	if (!platform) {
		error(null, 'platform');
	}
	let system = {};
	system.win = platform.indexOf('Win') === 0;
	system.mac = platform.indexOf('Mac') === 0;
	if (system.win || system.mac) {
		return system;
	} else {
		system.mob = true;
		return system;
	}
}