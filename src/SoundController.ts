/**
 * 資源下載方式
 */
enum loadingMethod {
	/** egret.Sound + load path */
	oldResLoader,
	/** RES.getRes */
	resourceLoad,
	/** URLRequest */
	httpRequest
}

/**
 * 音效控制器
 */
class SoundController {
	static instance: SoundController;
	private static _instance: SoundController;
	private folderName : string = "resource/sound_96hz_44k1/{0}.mp3";

	constructor() { }

	public static getInstance(): SoundController {
		if (!SoundController.instance) {
			SoundController.instance = new SoundController();
		}
		return SoundController.instance;
	}

	public Play(name:string, way : soundPalyWay){
		let sound: SoundItem = new SoundItem(this.folderName.format(name), way);
	}
}

enum soundPalyWay {
	once,
	loop
}

/**
 * 以下示例加载一个 MP3 文件，进行播放，并输出播放该 MP3 文件时所发生的声音事件的相关信息。
 */
class SoundItem extends egret.DisplayObjectContainer {
	/**
	 * 播放方式
	 */
	private currentWay: soundPalyWay = soundPalyWay.once;
	/**
	 * 聲音元件
	 */
	private sound: egret.Sound;
	/**
	 * 從哪個時間開始播放
	 */
	private startTime: number;
	/**
	 * 播完後的委託，單次播放才能使用!
	 */
	private onCompleteFunc: Function;

	/**
	 * 建立一個音效元件
	 * @param namePath 檔名路徑
	 * @param way 播放方式, 
	 * @param startTime 指定從哪開始播
	 * @param callback 播完後的callback
	 */
	public constructor(namePath: string, way: soundPalyWay, startTime: number = 0, callback: Function = null) {
		super();
		this.currentWay = way;
		this.startLoad(namePath);
		this.startTime = startTime;
		this.onCompleteFunc = callback;
	}

	/**
	 * 開始下載
	 */
	private startLoad(namePath: string): void {
		//创建 Sound 对象
		this.sound = new egret.Sound();
		//添加加载完成侦听
		this.sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
		//开始加载
		this.sound.load(namePath);
	}

	/**
	 * 音檔下載完的委託
	 */
	private onLoadComplete(event: egret.Event): void {
		//获取加载到的 Sound 对象
		const sound: egret.Sound = <egret.Sound>event.target;

		egret.log("length : " + sound.length);

		switch (this.currentWay) {
			/**
			 * 單次撥放
			 */
			case soundPalyWay.once:
				{
					//播放音乐
					const channel: egret.SoundChannel = sound.play(this.startTime, 1);
					// TODO:目前找的聲音有點吵先調小聲一點
					channel.volume = 0.2;
					channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onStop, this);
				}
				break;
			/**
			 * 循環撥放
			 */
			case soundPalyWay.loop:
				{
					const channel: egret.SoundChannel = sound.play(this.startTime, 0);
				}
				break;
		}
	}

	/**
	 * 處理委託
	 */
	private onSoundComplete(event: egret.Event): void {
		if (this.onCompleteFunc != null) {
			this.onCompleteFunc();
		} else {
			egret.log("我沒事做");
		}
	}

	/**
	 * 停止播放:提供給Loop的Sound Stop
	 */
	public onStop(): void {
		this.sound.close();
	}

	/**
	 * 開始播放:提供給Loop的Sound元件再次撥放
	 */
	public onPlay(): void {
		this.sound.play();
	}
}