// class ItemsGroup extends eui.Component {
class ItemsGroup extends eui.DataGroup {
    public dataList: eui.List;
    private dataArray: eui.ArrayCollection = new eui.ArrayCollection();
    public static instance: ItemsGroup;
    public lst: eui.List;
    private callback: Function;
    private btnCount: number = 6;

    public constructor() {
        super();
        ItemsGroup.instance = this;

        // this.initcom();
    }

    protected createChildren(): void {
        super.childrenCreated();

        this.dataList = new eui.List();

        this.dataList.dataProvider = this.dataArray;
        this.dataList.itemRenderer = ItemRD;
        // this.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.selectItem,this);
        var data = this.initData();
        // 渲染List
        this.dataArray.replaceAll(data);
        this.dataProvider = this.dataArray;
        this.itemRenderer = ItemRD;

        // this.resize();

    }

    public getChooseArray(): number {
        var total: number = 0;
        for (var i: number = 0; i < this.dataArray.length; ++i) {
            if (this.dataArray.getItemAt(i).count > 0) {
                total += this.dataArray.getItemAt(i).count;
            }
        }

        return total;

        // alert(total);
    }

    public getIndexCount(index: number): number {
        return this.dataArray.getItemAt(index).count;
    }

    public resetCount(): void {
        for (var i: number = 0; i < this.dataArray.length; ++i) {
            this.dataArray.getItemAt(i).count = 0;
            this.dataArray.refresh();
        }
    }


    private selectItem(e: eui.ItemTapEvent): void {
        console.log(this.lst.selectedIndex, this.lst.selectedItem);
    }

    private formatStr = "egg_{0}_png";

    private initData(): any {
        var tempArray = [];
        for (var i = 0; i < this.btnCount; i++) {
            tempArray.push({ index: i, icon: this.formatStr.format(String(i)), count: 0 });
        }
        return tempArray;
    }

    // public resize(): void {
    //     let tLayout: eui.TileLayout = new eui.TileLayout();
    //     tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
    //     tLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
    //     tLayout.horizontalGap = 10;
    //     tLayout.verticalGap = 10;
    //     tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
    //     tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
    //     tLayout.paddingTop = 0;
    //     tLayout.paddingRight = 0;
    //     tLayout.paddingLeft = 0;
    //     tLayout.paddingBottom = 10;
    //     tLayout.requestedColumnCount = 3;  /// 设置两列显示
    //     this.dataList.layout = tLayout;    /// 网格布局
    // }

    public updateView(items: TItemsData): void {
        items.data.forEach(element => {
            // TODO:更新資料
            egret.log(this.lst.getElementAt(element));
        });
    }

}

class IitemData {
    public index: number;
    public count: number;
}

class TItemsData {
    public data: any[];
    private maxCount: number;

    constructor() {
        // 預設給1000
        this.maxCount = 6;
        this.data = [];
        for (let i: number = 0; i < this.maxCount; i++) {
            let data: IitemData;
            data.index = i;
            data.count = 0;
            this.data.push(data);
        }
    }


}