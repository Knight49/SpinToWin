
enum EMoveWay {
	None,
	TopToDown,
	DownToTop,
	LeftToRight,
	RightToLeft
}

enum EEffectWay{
	positive,//"_cw"
	reverse //"_ccw"
}

enum ETurnState{
	readyToStart,
	truning,
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