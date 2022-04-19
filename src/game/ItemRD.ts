class ItemRD extends eui.ItemRenderer {
	
	private item_icon:eui.Image;
	private item_lab:eui.Label;

	public constructor() {
		super();
		this.skinName = "ItemRDSkin";
		this.item_icon = new eui.Image;
		this.item_lab = new eui.Label;
	}

	protected dataChanged():void{
		this.item_icon.texture = RES.getRes(this.data.image);
		this.item_lab.text = this.data.label;
	}
}