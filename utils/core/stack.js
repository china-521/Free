import {
	equals
} from './equals.js';
class Stack {

	constructor() {
		this.elementCount = 0;
		this.elementData = [];
	}

	addElement(element) {
		this.elementCount++;
		this.elementData.push(element);
	}

	addElementAll(elements){
		this.elementData = this.elementData.concat(elements);
		this.elementCount = this.elementData.length;
	}

	push(element) {
		this.addElement(element);
		return element;
	}

	pushAll(elements) {
		this.addElementAll(elements);
		return elements;
	}

	get(index) {
		return this.elementData[index];
	}

	size() {
		return this.elementCount;
	}

	empty() {
		return this.size() === 0;
	}

	isEmpty() {
		return this.elementCount === 0;
	}


	firstElement() {
		return this.elementData[0];
	}

	lastElement() {
		return this.elementData[this.elementCount - 1];
	}

	peek() {
		return this.lastElement();
	}

	pop() {
		return this.elementData.pop();
	}

	remove(index) {
		this.elementCount--;
		return this.elementData.splice(index, 1);
	}

	clear() {
		this.elementData = [];
		this.elementCount = 0;
		return this.elementData;
	}

	indexOf(element) {
		if (!this.elementCount) {
			return -1;
		}
		for (let i = 0, len = this.elementCount; i < len; i++) {
			if (equals(this.get(i), element)) {
				return i;
			}
		}
		return -1;
	}

	lastIndexOf(element) {
		if (!this.elementCount) {
			return -1;
		}
		for (let i = this.elementCount; i >= 0; i--) {
			if (equals(this.get(i), element)) {
				return i;
			}
		}
		return -1;
	}

	// 返回对象在此堆栈上的从1开始的位置
	search(element) {
		const index = this.lastIndexOf(element);
		if (index >= 0) {
			return this.size() - index;
		}
		return -1;
	}

}

export default Stack;