class EffectController {
	static instance: EffectController;
	private static _instance: EffectController;

	public static getInstance(): EffectController {
		if (!EffectController.instance) {
			EffectController.instance = new EffectController();
		}
		return EffectController.instance;
	}

	constructor() { }

}