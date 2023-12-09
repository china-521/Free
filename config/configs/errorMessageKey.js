import errorMessage from "./errorMessage.js"

let errorMessageKey = {};

Object.keys(errorMessage).forEach(key => {
	errorMessageKey[key] = key;
});

export default errorMessageKey;