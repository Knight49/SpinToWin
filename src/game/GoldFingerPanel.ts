class GoldFingerPanel extends eui.Component implements  eui.UIComponent {
	/** :按鈕 */	
	private add_bt: eui.Button;
	/** 開始:按鈕 */	
	private set_bt: eui.Button;
	/** 加錢:輸入框 */
	private add_input:eui.TextInput;
	/** 設定:輸入框 */
	private set_input:eui.TextInput;
	/** 關閉 */
	private closeButton: eui.Button;

	private scope:any;
	
	 constructor(scope:any) {
        super();
		this.skinName = "GoldFingerPanelSkin";
		this.scope = scope;
    }
	

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.add_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
		this.set_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
		// this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldFinger, this);
		
	}

	private onAdd():void{
		if (Number(this.add_input.text)) {
			GPlayer.addGetCoin(Number(this.add_input.text));
		}
	}

	private onSet():void{
		if(Number(this.set_input)){
			this.scope.goldFingerSet(Number(this.set_input));
		}
	}
	
}