
/** Layer管理器 */
class GLayerManager {
	static instance: GLayerManager;
	private static _instance: GLayerManager;
	private layerDictionary:Dictionary<eui.Group>;

	

	/** 
	 * 玩家金額資料
	 */
	public static data: TPlayerData;

	/** 
	 * 單例模式
	 */
	public static getInstance(): GLayerManager {
		if (!GLayerManager.instance) {
			GLayerManager.instance = new GLayerManager();
		}
		
		// this.layerDictionary = [];
		return GLayerManager.instance;
	}

    /**
     * 建立全部Layer加到Main下，當前的遊戲是固定zindex
     */
    public createAllLayer(parent : egret.DisplayObjectContainer): void {
		this.layerDictionary = new Dictionary<eui.Group>();
        for (var item in EUILayerKind) {
            if (typeof EUILayerKind[item] === 'number') {
                var group: eui.Group = new eui.Group;
                group.name = item;
				group.touchEnabled = false;
                parent.addChild(group);
				// var keyName:string = EUILayerKind[item];
				this.layerDictionary.add(item, group);
				
            }
        }
    }

    public addToLayer(component: egret.DisplayObject, layer: EUILayerKind): void {

		if (this.layerDictionary.containsKey(String(EUILayerKind[layer]))) {
			this.layerDictionary.getItem(EUILayerKind[layer]).addChild(component);
            // this.layerDictionary[EUILayerKind[layer]].addChild(component);
        } else {
            egret.error("could not found layer" + layer.toString());
        }

    }
}