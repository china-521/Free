import {
	importLink
} from "../../core/importLink.js"
/**
 * 设置网页简介或者获取网页简介
 * @param {any} val 网页简介
 * @return {String}
 */
export function description(val) {
	const metas = document.querySelectorAll('meta');
	if (!metas.length) {
		return void 0;
	}
	let hasDescriptionMeta = false;
	for (let i = 0; i < metas.length; i++) {
		const name = metas[i].getAttribute('name');
		if (name && (('description') === name.toLowerCase() || ('descriptions') === name.toLowerCase())) {
			hasDescriptionMeta = true;
			if (val) {
				metas[i].content = val;
				return;
			}
			return metas[i].content;
		}
	}
	if (!hasDescriptionMeta && val) {
		importLink('meta',{
			name:'description',
			content:val
		});
	}
	return void 0;
}