class SoundController {
	static instance: SoundController;
	private static _instance: SoundController;

	public static getInstance(): SoundController {
		if (!SoundController.instance) {
			SoundController.instance = new SoundController();
		}
		return SoundController.instance;
	}

	constructor() { }

}