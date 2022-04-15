class DataController {
	static instance: DataController;
	private static _instance: DataController;

	public static getInstance(): DataController {
		if (!DataController.instance) {
			DataController.instance = new DataController();
		}
		return DataController.instance;
	}

	constructor() { }

	/**
	* 存檔
	*/
	public static writeLocalData(key: string, value: string) {
		egret.localStorage.setItem(key, value);
	}

	/**
	* 讀檔
	*/
	public readLocalData(key: string, defaultValue?: string): string {
		if (defaultValue == undefined || defaultValue == null) defaultValue = "";
		var value = egret.localStorage.getItem(key);
		return (value == "" || value == undefined || value == null) ? defaultValue : value;
	}

	/**
	* 刪檔
	*/
	public removeLocalData(key: string) {
		egret.localStorage.removeItem(key);
	}

	// 範例
	// private test():void{
	// 	let test:TPlayerData = new TPlayerData();
		
	// 	JSON.stringify(test);
	// }

	/**
	* 存檔:依結構存檔
	*/
	public saveByStruct(key:string, value:any)
	{
		let valueString:string = JSON.stringify(value);

		// TODO:檢查各種轉換問題 & key 檢查
		egret.localStorage.setItem(key, valueString);
	}

	/**
	* 讀檔:讀取後轉成指定的結構
	*/
	public readToStruct(key:string, kind : any, defaultValue:any) : any
	{
		let valueString : string = egret.localStorage.getItem(key);

		return this.checkSaveed(valueString)? JSON.parse(valueString, kind):defaultValue;
	}

	private checkSaveed(becheckItem : any) : boolean
	{
		if(becheckItem == "" || becheckItem == undefined || becheckItem == null)
			return false;
		else
			return true;
	}
}