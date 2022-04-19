

class SpineToWin extends eui.Component implements eui.UIComponent {
	private point_ig: eui.Image;
	private turn_ig: eui.Image;
	private turn_gp: eui.Group;
	private start_bt: eui.Button;
	private run_tx: eui.Label;
	private turnData: TTurnData;
	private playerData: TPlayerData;
	private turnState: ETurnState = ETurnState.readyToStart;
	private addBetBtns: eui.Image[];
	private lst: eui.List;
	private items_Group: eui.DataGroup;
	private createGP:ItemsGroup;
	private datalist: eui.ArrayCollection;

	private willGetTipStr = "恭喜轉到 : {0}";
	private beStrartTip = "開始轉動....: {0}";

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);

		this.playerData = new TPlayerData();
		GDataController.getInstance().readToStruct(GConst.DATAKEY_PLAYER_OWNCOIN, TPlayerData, this.playerData);

	}

	private uiComplete(e: eui.UIEvent): void {
		this.initUICom();
		this.initData();
	}

	// private imgName: string = "btn_";

	private initUICom(): void {
		GFunction.setCenter(this.turn_gp, EAlignment.center);
		this.start_bt.$addListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
		this.createGP = new ItemsGroup();
		this.createGP.lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.selectItem, this);
		// this.items_Group = createGP;
		// createGP.$Group = this.items_Group;
		this.addChild(this.createGP);

		// this.lst = new eui.List();
		// this.lst.dataProvider = new eui.ArrayCollection([
		// 	{ label: "0", image: "egg_0_png" },
		// 	{ label: "1", image: "egg_1_png" },
		// 	{ label: "2", image: "egg_2_png" },
		// 	{ label: "3", image: "egg_3_png" },
		// 	{ label: "4", image: "egg_4_png" },
		// 	{ label: "5", image: "egg_5_png" },]);

        // this.lst.itemRendererSkinName = "ItemRDSkin";
        // this.addChild(this.lst);
        // this.lst.selectedIndex = 1;//設置默認選中項
        // this.lst.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.selectItem,this);
		// this.items_Group.dataProvider = this.lst.dataProvider;

		// this.lst.dataProvider = new eui.ArrayCollection();
		// for(let i:number = 0; i< 6; i++){
		// 	this.lst.dataProvider.addItem({label:i, image:"egg_" + i+ "_png"});
		// }
		// this.lst.

		// this.datalist = new eui.ArrayCollection();
		// this.datalist.addItem({label:"0", image:"egg_0_png"});
		// this.datalist.addItem({label:"1", image:"egg_1_png"});
		// this.datalist.addItem({label:"2", image:"egg_1_png"});
		// this.datalist.addItem({label:"3", image:"egg_1_png"});
		// this.datalist.addItem({label:"4", image:"egg_1_png"});
		// this.datalist.addItem({label:"5", image:"egg_1_png"});
		// this.items_Group.itemRenderer = ItemRender;
		// this.items_Group.dataProvider = this.datalist;

		// let items:ItemsGroup = new ItemsGroup();
		// this.addChild(items);
		// this.datalist.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.selectItem, this);

		// this.lst.itemRenderer = BagItem;
		// this.lst.dataProvider = new eui.ArrayCollection([
		// 	{ name: "0", icon: "btn_0" },
		// 	{ name: "1", icon: "btn_1" },
		// 	{ name: "2", icon: "btn_2" },
		// 	{ name: "3", icon: "btn_3" },
		// 	{ name: "4", icon: "btn_4" },
		// 	{ name: "5", icon: "btn_5" },]);

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
		let rad: number = GFunction.getRandomInt(15);
		this.turnData.resulte = rad;
		this.run_tx.text = String(rad);
		let toAngle: number = this.turnData.getAngle(rad);
		TweenMax.to(this.turn_gp, 5, { rotation: toAngle, onComplete: this.finishComplet.bind(this) });
	}

	public onAdd(index: number) {

	}

	private finishComplet(): void {
		this.setTipText(this.willGetTipStr, String(this.turnData.resulte));
	}

	private setTipText(formatStr: string, value: string): void {

		this.run_tx.text = formatStr.format(value);
	}

}

