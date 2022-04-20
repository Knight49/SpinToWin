class ItemRD extends eui.ItemRenderer {
	public index: number;
	public count: number;
	public picName: string;
	private item_icon: eui.Image;
	private item_lab: eui.Label;
	private item_no: eui.Label;
	private noStrFormat: string = "no.{0}"

	constructor() {
		super();
		this.skinName = "resource/eui_skins/ItemRDSkin.exml";
	}

	protected createChildren(): void {
		super.createChildren();
		this.item_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseItem.bind(this), this);
	}

	protected dataChanged(): void {
		this.item_no.text = this.noStrFormat.format(this.data.index);
		this.item_icon.texture = RES.getRes(this.data.icon);
		this.item_lab.text = this.data.count;
		this.x = this.data.index % 3 * 128;
		this.y = Math.floor(this.data.index / 3) * 128;
	}

	private chooseItem(): void {
		if (GPlayer.addIsEnough()) {
			this.data.count += 1;
			this.count = this.data.count;
			GPlayer.data.nowUseConin += GConst.PAY_COIN;
			this.dataChanged();
		}else{
			alert("錢不夠");
		}
	}
}