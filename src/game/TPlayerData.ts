class TPlayerData {
    /**
     * 擁有金額
     */
    public ownCoin: number;
    public nowUseConin: number;
    public getConin:number;

    constructor() {
        // 預設給1000
        this.ownCoin = 1000;
        this.nowUseConin = 0;
        this.getConin = 0;
    }
}