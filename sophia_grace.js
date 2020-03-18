solid().out(o0)
solid().out(o1)
solid().out(o2)
solid().out(o3)

osc(12, () => fftMovingAvgs[3].deltaAvg, () => fftMovingAvgs[2].deltaAvg)
.modulate(noise(2))
.add(shape(3).modulate(o0))
.add(shape(3).modulate(o0).modulateRotate(noise(() => fftMovingAvgs[2].delta), .1, .1))
.out(o0)

shape(gateChannel(2, 3, 6))
.mult(o0)
.modulateRotate(o0, .1, () => fftMovingAvgs[2].last)
.out(o1)


gradient(() => fftMovingAvgs[2].deltaAvg, .2, .2)
.blend(o1, () => fftMovingAvgs[3].deltaAvg)
.add(shape(3).scrollX(() => fftMovingAvgs[0].deltaAvg, .1))
.diff(o1)
.out(o2)

gradient()
.hue(() => fftMovingAvgs[3].last * 30 + 20)
.modulateRotate(o3, .2, .0)
.invert(.2)
.blend(o2, () => fftMovingAvgs[3].deltaAvg / 5)
.mult(o1, () => fftMovingAvgs[3].deltaAvg / 5)
.modulateRotate(o3, .2, () => fftMovingAvgs[2].last)
.out(o3)

render(o3)
