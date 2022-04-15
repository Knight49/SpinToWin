class GFunction {

    /**
     * 取得最大範圍內隨機整數 0~max
     * Get a random integer in the maximum range
     */
    public static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /**
    * 判斷是否在範圍裡
    * Get a random integer in the maximum range
    */
    public static isInRange(current: number, min: number, max: number): boolean {
        return Math.max(min, current) == Math.min(current, max);
    }

    /**
    * 設定Imgae元件中心座標
    * 
    */
    public static setCenter(item: any, way: EAlignment): void {
        switch (way) {
            case EAlignment.zero:
                item.$setAnchorOffsetX(0);
                item.$setAnchorOffsetY(0);
                break;
            case EAlignment.center:
                item.$setAnchorOffsetX(item.width * 0.5);
                item.$setAnchorOffsetY(item.height * 0.5);
                break;
            case EAlignment.centerLeft:
                item.$setAnchorOffsetX(0);
                item.$setAnchorOffsetY(item.height * 0.5);
                break;
            case EAlignment.centerRight:
                item.$setAnchorOffsetX(1);
                item.$setAnchorOffsetY(item.height * 0.5);
                break;

        }
    }
}