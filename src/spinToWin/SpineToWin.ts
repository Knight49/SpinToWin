class SpineToWin extends eui.Component implements eui.UIComponent {
	private point_ig: eui.Image;
	private turn_ig: eui.Image;
	private turn_gp: eui.Group;
	private start_bt: eui.Button;
	private run_tx: eui.Label;
	private turnData: TTurnData;
	private turnState: ETurnState = ETurnState.readyToStart;

	private willGetTipStr = "恭喜轉到 : {0}";
	private beStrartTip = "開始轉動....: {0}";

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	private uiComplete(e: eui.UIEvent): void {
		this.initUICom();
		this.initData();
	}

	private initUICom(): void {
		GFunction.setCenter(this.turn_gp, EAlignment.center);
		this.start_bt.$addListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
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
		let rad: number = GFunction.getRandomInt(15);
		this.turnData.resulte = rad;
		this.run_tx.text = String(rad);
		let toAngle: number = this.turnData.getAngle(rad);
		TweenMax.to(this.turn_gp, 5, { rotation: toAngle, onComplete: this.finishComplet.bind(this) });
	}

	private finishComplet(): void {
		 this.setTipText(this.willGetTipStr, String(this.turnData.resulte));
	}

	private setTipText(formatStr: string, value:string): void {

		this.run_tx.text = formatStr.format(value);
	}
}

class TTurnData {
	private aniTimer: number;
	private roundCount: number;
	private preIndexAngle: number;

	public resulte: number;

	constructor() {
		this.resulte = 0;
		this.roundCount = 10;
		this.aniTimer = 0.1;
		this.preIndexAngle = 360 / 15;
	}

	public getAngle(index: number): number {
		return index * this.preIndexAngle + this.roundCount * 360;
	}
}