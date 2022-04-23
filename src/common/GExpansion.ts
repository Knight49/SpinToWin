/**
* 多維Array建立擴充
*/
interface ArrayConstructor {
	from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

/**
* 字串格式化:ex.youstring{0}
*/
interface String {
	format(...replacements: string[]): string;
}

if (!String.prototype.format) {
	String.prototype.format = function () {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	};
}

/**
* 定義 Dictionary Key的介面
*/
interface IKeyCollection<T> {
	add(key: string, value: T);
	containsKey(key: string): boolean;
	size(): number;
	getItem(key: string): T;
	removeItem(key: string): T;
	getKeys(): string[];
	values(): T[];
}

/**
* 定義 Dictionary 實作方法
*/
class Dictionary<T> implements IKeyCollection<T> {
	private items: { [index: string]: T } = {};
	private count: number = 0;

	/**
  	* 加一個item by key & value
  	*/
	add(key: string, value: T) {
		if (!this.items.hasOwnProperty(key)) {
			this.count++;
		}

		this.items[key] = value;
	}

	/**
  	* 檢查是否已經有加過了 by key
  	*/
	containsKey(key: string): boolean {
		return this.items.hasOwnProperty(key);
	}

	/**
  	* 取得item count
  	*/
	size(): number {
		return this.count;
	}

	/**
  	* 取得item by key
  	*/
	getItem(key: string): T {
		return this.items[key];
	}

	/**
	* 刪除item : by key
	*/
	removeItem(key: string): T {
		let value = this.items[key];

		delete this.items[key];
		this.count--;

		return value;
	}

	/**
	* 取得所有的keys
	*/
	getKeys(): string[] {
		let keySet: string[] = [];

		for (let property in this.items) {
			if (this.items.hasOwnProperty(property)) {
				keySet.push(property);
			}
		}

		return keySet;
	}

	/**
	* 取得所有的values
	*/
	values(): T[] {
		let values: T[] = [];

		for (let property in this.items) {
			if (this.items.hasOwnProperty(property)) {
				values.push(this.items[property]);
			}
		}

		return values;
	}
}