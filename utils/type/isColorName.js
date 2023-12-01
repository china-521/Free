import config from "../../config/config.js";

export function isColorName(color) {
	return color in config.colorMap();
}