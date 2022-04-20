

class SpineToWin extends eui.Component implements eui.UIComponent {
	private point_ig: eui.Image;
	private turn_ig: eui.Image;
	private turn_gp: eui.Group;
	private start_bt: eui.Button;
	private exit_bt: eui.Button;
	private run_tx: eui.Label;
	private own_coin_tx: eui.Label;
	private bet_coin_tx: eui.Label;
	private reward_coin_tx: eui.Label;
	
	private turnData: TTurnData;
	// private playerData: TPlayerData;
	private turnState: ETurnState = ETurnState.readyToStart;
	private addBetBtns: eui.Image[];
	private lst: eui.List;
	private items_Group: eui.DataGroup;
	private createGP: ItemsGroup;
	private datalist: eui.ArrayCollection;
	private playerOneCost = 10;
	private willGetTipStr = "恭喜轉到 : No.{0}";
	private beStrartTip = "開始轉動..即將出現: No.{0}";

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);

		GPlayer.getInstance();
	}

	private uiComplete(e: eui.UIEvent): void {
		this.initUICom();
		this.initData();
	}

	// private imgName: string = "btn_";

	private initUICom(): void {
		GFunction.setCenter(this.turn_gp, EAlignment.center);
		this.start_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
		this.exit_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
		this.updateView();
	}

	private selectItem(e: eui.ItemTapEvent): void {
		console.log(this.createGP.lst.selectedIndex, this.createGP.lst.selectedItem);
	}

	// 以下開始
	private initData(): void {
		this.turnData = new TTurnData();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

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
		}
	}

	private onExit(): void {
		GPlayer.save();
	}

	private calculateConin() {
		let use: number = this.createGP.getChooseArray();

	}

	public onAdd(index: number) {

	}

	private finishComplet(): void {
		this.setTipText(this.willGetTipStr, String(this.turnData.resulte % 6));
		let index = this.turnData.resulte % 6;
		let count = this.createGP.getIndexCount(index);
		GPlayer.data.getConin = count * GConst.PAY_COIN;
		if (count > 0) {
			alert("恭喜中獎金 : " + count * GConst.PAY_COIN);
		} else {
			alert("再接再厲");
		}

		this.createGP.resetCount();
	}

	private setTipText(formatStr: string, value: string): void {

		this.run_tx.text = formatStr.format(value);
	}

	public updateView():void{
		this.own_coin_tx.text = GPlayer.data.ownCoin.toString();
		this.bet_coin_tx.text = GPlayer.data.nowUseConin.toString();
		this.reward_coin_tx.text = GPlayer.data.getConin.toString();
	}
}

