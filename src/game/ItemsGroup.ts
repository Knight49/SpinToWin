 /** 自訂義Group */
class ItemsGroup extends eui.DataGroup {
    /** 數組 : 跟dataArray配套使用*/
    public dataList: eui.List;
    /** 數據封裝 : 當數據改變時，會派發通知*/
    private dataArray: eui.ArrayCollection = new eui.ArrayCollection();
    /** 方便建立*/
    public static instance: ItemsGroup;
    
    // public lst: eui.List;
     /** 按鈕數量*/
    private btnCount: number = 6;

    public constructor() {
        super();
        ItemsGroup.instance = this;
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

    /**
     * 計算已有投注的數量
     */
    public getChooseArray(): number {
        var total: number = 0;
        for (var i: number = 0; i < this.dataArray.length; ++i) {
            if (this.dataArray.getItemAt(i).count > 0) {
                total += this.dataArray.getItemAt(i).count;
            }
        }

        return total;
    }

    /**
     * 計算得獎的投注數量
     */
    public getIndexCount(index: number): number {
        return this.dataArray.getItemAt(index).count;
    }

    /**
     * 重設次數
     */
    public resetCount(): void {
        for (var i: number = 0; i < this.dataArray.length; ++i) {
            this.dataArray.getItemAt(i).count = 0;
            this.dataArray.refresh();
        }
    }

    /**
     * 選擇按鈕
     * 
     */
    // private selectItem(e: eui.ItemTapEvent): void {
    //     console.log(this.lst.selectedIndex, this.lst.selectedItem);
    // }

    private formatStr = "egg_{0}_png";

    /**
     * 建立Item數組
     * 
     */
    private initData(): any {
        var tempArray = [];
        for (var i = 0; i < this.btnCount; i++) {
            tempArray.push({ index: i, icon: this.formatStr.format(String(i)), count: 0 });
        }
        return tempArray;
    }
}