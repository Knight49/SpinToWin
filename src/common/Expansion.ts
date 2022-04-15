interface ArrayConstructor {
	from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

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