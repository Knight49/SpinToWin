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

class SoundController {
	static instance: SoundController;
	private static _instance: SoundController;

	public static getInstance(): SoundController {
		if (!SoundController.instance) {
			SoundController.instance = new SoundController();
		}
		return SoundController.instance;
	}

	private playFromResLoad(name: string): void {
		const sound: egret.Sound = new egret.Sound();
		sound.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
			sound.play();
		}, this);
		sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event: egret.IOErrorEvent) {
			console.log("loaded error!");
		}, this);
		sound.load("resource/sound_96hz_44k1/{0}.mp3".format(name));
	}

	private playerFromURL(name: string): void {
		// const loader: egret.HttpRequest = new egret.HttpRequest();
		// loader.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
		// 	const sound: egret.Sound = loader.data;
		// 	sound.play();
		// }, this);
		// loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
		// loader.load(new egret.URLRequest("resource/sound_96hz_44k1/{0}.mp3".format(name)));
	}

	private playFromResGet(name: string): void {
		// soundItem : SoundExample = new 

		const sound: egret.Sound = RES.getRes("{0}_mp3".format(name));
		sound.play();
	}

	public Play(name: string, way: loadingMethod): void {
		switch (way) {
			case loadingMethod.oldResLoader:
				{
					this.playFromResLoad(name);
				}
				break;
			case loadingMethod.httpRequest:
				{
					this.playerFromURL(name);
				}
				break;
			case loadingMethod.resourceLoad:
				{
					this.playFromResGet(name);
				}
				break;
		}
	}

	public Test(): void {
		this.Play("jackpot", loadingMethod.resourceLoad);
	}

	constructor() { }

}

/**
 * 以下示例加载一个 MP3 文件，进行播放，并输出播放该 MP3 文件时所发生的声音事件的相关信息。
 */
class SoundExample extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.startLoad();
    }
    private startLoad(): void {
        //创建 Sound 对象
        const sound = new egret.Sound();
        const url: string = "resource/sound_96hz_44k1/winer.mp3";
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(url);
    }
    private onLoadComplete(event: egret.Event): void {
        //获取加载到的 Sound 对象
        const sound: egret.Sound = <egret.Sound>event.target;
        //播放音乐
        const channel: egret.SoundChannel = sound.play(0, 1);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }
    private onSoundComplete(event: egret.Event): void {
        egret.log("onSoundComplete");
    }
}