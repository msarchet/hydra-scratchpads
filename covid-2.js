gradient()
.contrast(.5)
.hue(() => window.fftMovingAvgs[4].ratio * 1.2)
.add(
  shape(3)
  .scrollY(() => window.fftMovingAvgs[3].ratio * .02, .2)
  .scrollX(() => window.fftMovingAvgs[3].ratio * .2, 1.2)
  .modulateRotate(gradient(.2), () => window.fftMovingAvgs[2].deltaAvg, 0)
  .invert()
  .rotate(-0.2, -0.2)
  .repeat(2,3)
  .blend(src(o0).modulateRotate(shape(3), .2, .2), () => window.fftMovingAvgs[6].ratio)
)
.rotate(.2, .2)
.blend(noise(() => 1 + window.fftMovingAvgs[3].last * .02).modulateRotate(gradient(), .2), () => window.fftMovingAvgs[0].last * .01)
.out(o0)


noise(0.2)
.blend(shape(6).mult(gradient().modulateRotate(o1, .2, .2)))
.mult(o0, () => {
  if (window.fftMovingAvgs[3].deltaAvg < 0){
    return window.fftMovingAvgs[3].last
  }
  else {
    return window.fftMovingAvgs[3].ratio
  }
})
.out(o1)

render(o1)
