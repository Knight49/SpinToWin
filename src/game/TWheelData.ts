class TWheelData {
	private aniTimer: number;
	private roundCount: number;
	private preIndexAngle: number;

	public resulte: number;

	constructor() {
		this.resulte = 0;
		this.roundCount = 10;
		this.aniTimer = 0.1;
		this.preIndexAngle = 360 / 15;
	}

	public getAngle(index: number): number {
		return index * this.preIndexAngle + this.roundCount * 360;
	}
}