class GPlayer {
	static instance: GPlayer;
	private static _instance: GPlayer;
	public static data: TPlayerData;

	/**
	* 單例模式
	*/
	public static getInstance(): GPlayer {
		if (!GPlayer.instance) {
			GPlayer.instance = new GPlayer();
			GPlayer.instance.initData();
		}
		return GPlayer.instance;
	}

	/**
	* 讀取本地資料:如果沒有就塞預設資料
	*/
	private initData(): void {
		GPlayer.data = new TPlayerData();
		GPlayer.data = GDataController.getInstance().readToStruct(GConst.DATAKEY_PLAYER_OWNCOIN) as TPlayerData;
	}

	constructor() { }

	/**
	* 是否有足夠的錢
	* usebet : 目前下注的注數
	*/
	public static isEnough(): boolean {
		if(GPlayer.data.ownCoin < GPlayer.data.nowUseConin)
		{
			alert("金幣不足");
			return false;
		}
			
		return true;
	}

	public static canPlay(): boolean
	{
		if(GPlayer.data.nowUseConin == 0 )
		{
			alert("請下注");
			return false;
		}else{
			return this.isEnough();
		}
	}
	
	/**
	* 玩一次扣錢計算
	*/
	public static playOnce(){
		if(GPlayer.data.ownCoin > GPlayer.data.nowUseConin)
		{
			GPlayer.data.ownCoin -= GPlayer.data.nowUseConin;
			GPlayer.data.nowUseConin = 0;
		}
	}

	/**
	* 加注後是否有足夠的錢
	*/
	public static addIsEnough(): boolean{
		return GPlayer.data.ownCoin > GPlayer.data.nowUseConin + GConst.PAY_COIN;	
	}

	/**
	* 存檔
	*/
	public static save()
	{
		// TODO:在真正遊戲中是server 資料，所以就不管還有沒有轉玩在存檔
		GPlayer.data.nowUseConin = 0;
		GPlayer.data.getConin = 0;
		GDataController.getInstance().saveByStruct(GConst.DATAKEY_PLAYER_OWNCOIN, GPlayer.data);
	}
}