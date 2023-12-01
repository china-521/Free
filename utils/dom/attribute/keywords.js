import {
	importLink
} from "../../core/importLink.js"
/**
 * 设置网页关键词或者获取网页关键词
 * @param {any} val 网页关键词
 * @return {String}
 */
export function keywords(val) {
	const metas = document.querySelectorAll('meta');
	if (!metas.length) {
		return void 0;
	}
	let hasKeywordMeta = false;
	for (let i = 0; i < metas.length; i++) {
		const name = metas[i].getAttribute('name');
		if (name && (('keyword') === name.toLowerCase() || ('keywords') === name.toLowerCase())) {
			hasKeywordMeta = true;
			if (val) {
				metas[i].content = val;
				return;
			}
			return metas[i].content;
		}
	}
	if (!hasKeywordMeta && val) {
		importLink('meta',{
			name:'keywords',
			content:val
		});
	}
	return void 0;
}