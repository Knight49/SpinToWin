class SpineToWin extends eui.Component implements  eui.UIComponent {
	// 參數宣告區
	// private yourName_tx : egret.TextField;
	
	private point_ig : eui.Image;
	private turn_ig : eui.Image;
	private start_bt : eui.Button;
	private run_tx : eui.Label;
	

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	private uiComplete(e: eui.UIEvent): void {
		this.initUICom();
		this.initData();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	// 以下開始
	private initData():void{
		
	}
	
	private initUICom():void{
		this.start_bt.$addListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
	}

	private onStart():void{
		
		// TweenLite.to(this.run_tx, 1, {directionalRotation:"270_cw"}); 
		
	}
	
}