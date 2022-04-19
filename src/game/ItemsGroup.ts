class ItemsGroup extends eui.DataGroup {
    public lst: eui.List;
    private callback: Function;

    public constructor() {
        super();
        this.initcom();
    }

    protected createChildren(): void {
        super.childrenCreated();
    }

    // private selectItem(e: eui.ItemTapEvent): void {
    //     console.log(this.lst.selectedIndex, this.lst.selectedItem);
    // }

    private initcom(): void {
        this.lst = new eui.List();
        this.lst.dataProvider = new eui.ArrayCollection([
            { label: "0", image: "egg_0_png" },
            { label: "1", image: "egg_1_png" },
            { label: "2", image: "egg_2_png" },
            { label: "3", image: "egg_3_png" },
            { label: "4", image: "egg_4_png" },
            { label: "5", image: "egg_5_png" },]);

        this.lst.itemRendererSkinName = "ItemRDSkin";
        this.addChild(this.lst);
        this.lst.selectedIndex = 1;//設置默認選中項

        // this.dataProvider = this.lst.dataProvider;

        // this.dataProvider = this.lst.dataProvider;
        // this.itemRenderer = ItemRD;
        // this.itemRendererSkinName = "ItemRDSkin";


        // let dataGroup: eui.DataGroup = new eui.DataGroup();
        // dataGroup.dataProvider = this.lst.dataProvider;
        // dataGroup.itemRenderer = ItemRD;
        // dataGroup.itemRendererSkinName = "ItemRDSkin";//也可以直接设置 exml 文件做为 ItemRenderer
        this.resize();
    }

    public resize(): void {
        let tLayout: eui.TileLayout = new eui.TileLayout();
        tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        tLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        tLayout.horizontalGap = 10;
        tLayout.verticalGap = 10;
        // tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        // tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        tLayout.paddingTop = 900;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 160;
        tLayout.paddingBottom = 10;
        tLayout.requestedColumnCount = 3;  /// 设置两列显示
        this.lst.layout = tLayout;    /// 网格布局
    }

    public updateView(items:TItemsData): void {
        items.data.forEach(element => {
            // TODO:更新資料
            this.lst.getElementAt(element).
        });
    }

}

class IitemData {
   public index: number;
   public count: number;
}

class TItemsData {
    public data:any[];
    private maxCount:number;

    constructor() {
        // 預設給1000
        this.maxCount = 6;
        this.data = [];
        for(let i:number = 0; i < this.maxCount; i++){
            let data:IitemData;
            data.index = i;
            data.count = 0;
            this.data.push(data);
        }
    }

    
}