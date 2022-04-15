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
    public static isInRange(current:number, min:number, max:number) : boolean
    {  
        return Math.max(min, current) == Math.min(current, max);  
    }
}