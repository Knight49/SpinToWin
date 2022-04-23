
enum EMoveWay {
	none,
	topToDown,
	downToTop,
	leftToRight,
	rightToLeft
}

enum EEffectWay{
	positive,//"_cw"
	reverse //"_ccw"
}

enum ETurnState{
	readyToStart,
	turning,
	readyToStop,
	stoping,
	stopFinsh
}

enum EAlignment{
	zero,
	center,
	centerLeft,
	centerRight

}

/**
     * 建立全部Layer，當前的遊戲是固定zindex
     * 
     */
enum EUILayerKind {
     /**
     * ???
     */
    preDecodeLayer = 1,
     /**
     * ???
     */
    defaultBackLayer = 2,
    /**
     * 主遊戲Layer
     */
    gameLayer = 3,
     /**
     * ???
     */
    defaultFrontLayer = 4,
     /**
     * ???
     */
    sprite_one = 5,
     /**
     * ???
     */
    changeGameLayerDown = 6,
     /**
     * ???
     */
    gamePanelLayer = 7,
     /**
     * ???
     */
    changeGameLayerUp = 8,
    /**
     * 等待遊戲Layer
     */
    waitGameLayer = 9,
    /**
     * 選桌UILayer
     */
    tableLayer = 10,
    /**
     * 共用UI:設定 or top選單
     */
    commonLayer = 11,
     /**
     * ???
     */
    gameTempBmp = 12,
     /**
     * 幸運彩金 BigWin特效(全螢幕) 結算介面 
     */
    gameLayer2 = 13,
    /**
     * 玩家info : 擁有 下注 獲得 ，目前用Spite當作Layer需要調整
     */
    sprite_two = 14,
    /**
     * 跑馬燈layer
     */
    marqueeLayer = 15,
     /**
     * ???
     */
    newWinListLayer = 16,
     /**
     * ???
     */
    changeGameLayer = 17,
     /**
     * ???
     */
    superJackpotLayer = 18,
     /**
     * ???
     */
    tipLayer = 19,
    /**
     * loading類
     */
    gameLoadingLayer = 20,
    /**
     * loading類
     */
    loadingLayer = 21,
    /**
     * 確認 系統公告 popup類視窗
     */
    dialogLayer = 22,
     /**
     * 密技
     */
    cheatLayer = 23,
     /**
     * ???
     */
    sprite_tree = 24
}