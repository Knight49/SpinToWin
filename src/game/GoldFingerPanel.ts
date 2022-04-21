class GoldFingerPanel extends eui.Component implements eui.UIComponent {
	private title_tx: egret.TextField;
	/** 
	 * :按鈕
	 */
	private add_bt: eui.Button;
	/** 
	 * 開始:按鈕
	 */
	private set_bt: eui.Button;
	/**
	 *  加錢:輸入框
	 */
	private add_input: eui.TextInput;
	/** 
	 * 設定:輸入框
	 */
	private set_input: eui.TextInput;
	/** 
	 * 關閉
	 */
	private close_bt: eui.Button;
	/** 
	 * 遊戲主畫面更新view用 
	*/
	private func: Function;
	/** 
	 * 遊戲主畫面主體
	*/
	private scope: any;

	constructor(scope: any, func: Function) {
		super();
		this.skinName = "GoldFingerPanelSkin";
		this.scope = scope;
		this.func = func;
	}

	/** 
	 * 設定標題
	*/
	public setTitle(name: string): void {
		this.title_tx.text = name;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.add_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
		this.set_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
		this.close_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

	}

	/** 
	 * 加金幣
	*/
	private onAdd(): void {
		if (Number(this.add_input.text)) {
			GPlayer.GoldFingerAdd(Number(this.add_input.text));
			if (this.func)
				this.func.call(this.scope);
		}
	}

	/** 
	 * 設定結果
	*/
	private onSet(): void {
		if (Number(this.set_input.text)) {
			this.scope.goldFingerSet(Number(this.set_input.text));
		}
	}

	/** 
	 * 關閉Ui
	*/
	private onClose(): void {
		this.visible = false;
		GPlayer.save();
	}
}