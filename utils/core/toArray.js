
/**
 * 将Free集合中所有DOM元素恢复成一个数组。
 */
export function toArray(){
	return [].slice.call(this);
}