import {
	colorNameToHex
} from "./colorNameToHex.js";
import {
	hexToRgb
} from "./hexToRgb.js";

export function colorNameToRgb(color) {
	return hexToRgb(colorNameToHex(color));
}