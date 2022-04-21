/** 玩家資料庫 */
class GPlayer {
	static instance: GPlayer;
	private static _instance: GPlayer;
	/** 玩家金額資料 */
	public static data: TPlayerData;

	/** 單例模式 */
	public static getInstance(): GPlayer {
		if (!GPlayer.instance) {
			GPlayer.instance = new GPlayer();
			GPlayer.instance.initData();
		}
		return GPlayer.instance;
	}

	/**
	* 讀取本地資料: 
	*/
	private initData(): void {
		GPlayer.data = new TPlayerData();
		GPlayer.data = GDataController.getInstance().readToStruct(GConst.DATAKEY_PLAYER_OWNCOIN, GPlayer.data) as TPlayerData;
	}

	constructor() { }

	/**
	* 是否有足夠的錢
	* usebet : 目前下注的注數
	*/
	public static isEnough(): boolean {
		if (GPlayer.data.ownCoin < GPlayer.data.nowUseConin) {
			alert("金幣不足");
			return false;
		}

		return true;
	}

	/**
	* 是否能使用轉盤
	*/
	public static canPlay(): boolean {
		if (GPlayer.data.nowUseConin == 0) {
			alert("請下注");
			return false;
		} else {
			return this.isEnough();
		}
	}

	/**
	* 玩一次扣錢計算
	*/
	public static playOnce() {
		if (GPlayer.data.ownCoin >= GPlayer.data.nowUseConin) {
			GPlayer.data.ownCoin -= GPlayer.data.nowUseConin;
			GPlayer.data.nowUseConin = 0;
		}
	}

	/**
	* 金手指加金幣
	*/
	public static GoldFingerAdd(index: number) {
		if (index) {
			GPlayer.data.ownCoin += index;
		}
	}

	/**
	* 
	*/
	public static addUserCoin() {
		GPlayer.data.nowUseConin += GConst.PAY_COIN;
	}

	/**
	* 加入得獎金額
	*/
	public static addGetCoin(count: number) {
		GPlayer.data.getConin = count * GConst.PAY_COIN;
		GPlayer.data.ownCoin += GPlayer.data.getConin;
		GPlayer.data.getConin = 0;
	}

	/**
	* 加注後是否有足夠的錢
	*/
	public static addIsEnough(): boolean {
		return GPlayer.data.ownCoin >= GPlayer.data.nowUseConin + GConst.PAY_COIN;
	}

	/**
	* 存檔
	*/
	public static save() {
		// TODO:在真正遊戲中是server 資料，所以就不管還有沒有轉玩在存檔
		GPlayer.data.nowUseConin = 0;
		GPlayer.data.getConin = 0;
		GDataController.getInstance().saveByStruct(GConst.DATAKEY_PLAYER_OWNCOIN, GPlayer.data);
	}
}