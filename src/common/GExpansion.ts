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