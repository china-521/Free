/**
 * 观察者
 */
export function observe() {
	Object.keys(this._data).forEach(key => {
		let value = this._data[key];
		let _this = this;
		Object.defineProperty(this._data, key, {
			get: function proxyGetter() {
				return value;
			},
			set: function proxySetter(newVal) {
				value = newVal;
				_this.$watchEvent[key].forEach(item => {
					item.update();
				});
				if (_this._updated) {
					_this._updated();
				}
			}
		});
	});
}