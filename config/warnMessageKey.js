import warnMessage from "./warnMessage.js"

let warnMessageKey = {};

Object.keys(warnMessage).forEach(key => {
	warnMessageKey[key] = key;
});

export default warnMessageKey;