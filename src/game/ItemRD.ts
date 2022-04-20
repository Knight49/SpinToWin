/** item : 類似單個物品欄概念，經由ItemsGroup來建立 */
class ItemRD extends eui.ItemRenderer {
	/*** 按鈕排序 */
	public index: number;
	/*** 投注次數 */
	public count: number;
	/*** icon名稱 */	
	public picName: string;
	/*** 物品圖 */
	private item_icon: eui.Image;
	/*** 投注次數:文字元件 */
	private item_lab: eui.Label;
	/*** 排序:文字元件 */
	private item_no: eui.Label;
	/*** 格式化:文字格式 */	
	private noStrFormat: string = "no.{0}"

	constructor() {
		super();
		this.skinName = "resource/eui_skins/ItemRDSkin.exml";
	}

	protected createChildren(): void {
		super.createChildren();
		this.item_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem.bind(this), this);
	}

	/**
	 * 當資料發生改變時會收到通知
	 */
	protected dataChanged(): void {
		this.item_no.text = this.noStrFormat.format(this.data.index);
		this.item_icon.texture = RES.getRes(this.data.icon);
		this.item_lab.text = this.data.count;
		this.x = this.data.index % 3 * 128;
		this.y = Math.floor(this.data.index / 3) * 128;
	}	

	/**
	 * 選擇按鈕
	 */
	private onClickItem(): void {
		if (GPlayer.addIsEnough()) {
			this.data.count += 1;
			this.count = this.data.count;
			GPlayer.data.nowUseConin += GConst.PAY_COIN;
			this.dataChanged();
		} else {
			alert("金幣不足");
		}
	}
}