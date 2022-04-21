
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