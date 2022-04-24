
/** 主要遊戲畫面 */
class SpineToWin extends eui.Component implements eui.UIComponent {
	/** 指針:圖 */
	private point_ig: eui.Image;
	/** 轉盤:圖 */
	private turn_ig: eui.Image;
	/** 開始:按鈕 */
	private start_bt: eui.Button;
	/** 存檔:按鈕 */
	private exit_bt: eui.Button;
	/** 金手指:按鈕 */
	private goldFinger_bt: eui.Button;
	/** 轉動時提示: 文字*/
	private run_tx: eui.Label;
	/** 擁有金幣: 文字*/
	private own_coin_tx: eui.Label;
	/** 下注金額: 文字*/
	private bet_coin_tx: eui.Label;
	/** 得到金額: 文字*/
	private reward_coin_tx: eui.Label;
	/** 轉盤用到的資料: 結構*/
	private turnData: TWheelData;
	/** 轉盤:群組 */
	private turn_gp: eui.Group;
	/** 下注按鈕 : 自定義群組*/
	private createGP: ItemsGroup;
	/** 文字format */
	private willGetTipStr = "恭喜轉到 : No.{0}";
	private beStrartTip = "開始轉動..即將出現: No.{0}";

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.once(eui.CollectionEvent.CLOSE, this.onSave, this);
	}

	/**
	 * 當元件載完後, 全部初始化
	 */
	private uiComplete(e: eui.UIEvent): void {
		this.initData();
		this.initUICom();
	}

	/**
	 * 資料初始化
	 */
	private initData(): void {
		this.turnData = new TWheelData();
		GPlayer.getInstance();
	}

	/**
	 * 元件初始化
	 */
	private initUICom(): void {
		GFunction.setCenter(this.turn_gp, EAlignment.center);
		this.start_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
		this.exit_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSave, this);
		this.goldFinger_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldFinger, this);
	
		this.updateView();
		this.mypanel = new GoldFingerPanel(this, this.updateView);
		this.addChild(this.mypanel);
		this.mypanel.visible = false;
		
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	/**
	 * 開始轉
	 */
	private onStart(): void {

		GPlayer.data.getConin = 0;

		if (GPlayer.canPlay()) {
			let rad: number = GFunction.getRandomInt(15);
			this.turnData.resulte = rad;
			this.setTipText(this.beStrartTip, String(rad % 6));
			// this.run_tx.text = String(rad);
			let toAngle: number = this.turnData.getAngle(rad);
			TweenMax.to(this.turn_gp, 5, { rotation: toAngle, onComplete: this.finishComplet.bind(this) });

			GPlayer.playOnce();
			this.updateView();
			SoundController.getInstance().Play("jackpot", soundPalyWay.once);
		}
	}

	/**
	 * 存檔
	 */
	private onSave(): void {
		GPlayer.save();
	}

	/**
	 * 金手指指定結果
	 */
	public goldFingerSet(index: number): void {
		// this.reset();
		let rightIndex = index % 6;
		this.turnData.resulte = rightIndex;
		this.setTipText(this.beStrartTip, String(rightIndex));
		let toAngle: number = this.turnData.getAngle(index);
		TweenMax.to(this.turn_gp, 5, { rotation: toAngle, onComplete: this.finishComplet.bind(this) });
	}
	
	private mypanel : GoldFingerPanel;
	/**
	 * 金手指
	 */
	private onGoldFinger(): void {
		this.mypanel.visible = true;
		this.mypanel.x = 150;
		this.mypanel.y = 700;
	}

	/**
	 * 轉完後處理的工作
	 */
	private finishComplet(): void {
		this.setTipText(this.willGetTipStr, String(this.turnData.resulte % 6));
		let index = this.turnData.resulte % 6;
		let count = this.createGP.getIndexCount(index);
		GPlayer.addGetCoin(count);
		this.updateView();

		if (count > 0) {
			this.setTipText("恭喜中獎金 : {0}", (count * GConst.PAY_COIN).toString());
			SoundController.getInstance().Play("winer", soundPalyWay.once);
		} else {
			this.setTipText("再接再厲 : {0}", ":)");
		}

		this.reset();
	}

	/**
	 * 重設玩家資料及顯示
	 */
	private reset(): void {
		this.createGP.resetCount();
		GPlayer.data.getConin = 0;
		GPlayer.data.nowUseConin = 0;
		this.updateView();
	}

	/**
	 * 設定提示字串
	 */
	private setTipText(formatStr: string, value: string): void {
		this.run_tx.text = formatStr.format(value);
	}

	/**
	 * 更新view
	 */
	public updateView(): void {
		this.own_coin_tx.text = GPlayer.data.ownCoin.toString();
		this.bet_coin_tx.text = GPlayer.data.nowUseConin.toString();
		this.reward_coin_tx.text = GPlayer.data.getConin.toString();
	}
}

