import config from "../../config/index.js";

export function isColorName(color) {
	return color in config.colorMap();
}