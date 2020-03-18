
render()


shape(3).mult(
  gradient(() => fftAvgs[2] / 10 + .01)
  .modulate(noise(() => fftAvgs[0] * 5+ 1), () => a.fft[3])
)
.modulateRotate(shape(3)
  .rotate(()=> a.fft[2], 3)
  .modulateRotate(osc(() => 12+ a.fft[3], .2, () => fftAvgs[3]),
    () => a.fft[3],
    () => a.fft[3] *10),
() => fftAvgs[0] *15, () => fftAvgs[0])
.add(src(o0).scrollX(() => -1 * fftAvgs[3] * .001, .02))
.scale(() => .8 * (fftAvgs[3] / 2 + .6 + fftAvgs[0] / 4 + fftAvgs[5] / 4))
.scrollX(0, () => fftAvgs[3] / 10)
.out(o0)

gradient(() => fftAvgs[4] / 10 + .1)
.add(o0)
.repeat(3, () => fftAvgs[3] * .3 + 2)
.modulate(osc(12, .2, .2), () => fftAvgs[5] / 2 + fftAvgs[4] / 2)
.diff(src(o1).modulate(src(o1).blend(noise(() => a.fft[3] / 6 + 2), () => fftMovingAvgs[3] > 5 ? .4 : .8), () => fftAvgs[3]), 1)
.out(o1)

shape(() => (Math.ceil(fftAvgs[0]) / 5 + Math.ceil(fftAvgs[3] / 5)) > 1 ? 3 : 2)
.rotate(.1, .1)
.scale(2)
.repeat(3, 3)
.modulate(noise(() => 6 + fftAvgs[3] / 2), () => fftAvgs[3] / 5)
.mult(o1)
.out(o2)

src(o1)
.mult(o0)
.mask(src(o0).brightness(.1))
.blend(o2, () => fftAvgs[2] / 8, () => fftAvgs[0] / 50)
.blend(o0, () => .3 - fftAvgs[0] / 8)
.add(o3, () => fftAvgs[3] / 3 - .3)
.modulate(o3, () => fftAvgs[3] / 100)
.out(o3)

src(o1)
.mult(o0)
.mask(src(o0).brightness(.1))
.blend(o2, () => fftMovingAvgs[2].ratio + .4, () => fftMovingAvgs[0].delta)
.blend(o0, () => .3 - fftAvgs[0] / 8)
.add(o3, () => fftAvgs[3] / 3 - .3)
.modulate(o3, () => fftAvgs[3] / 100)
.out(o3)


// big blend replace from sat-nigh

gradient(() => fftAvgs[3] * .005)
.add(shape(() =>Math.max(3,  fftAvgs[4] * 2)).repeat(2,2)
.modulateKaleid(o2, () => fftAvgs[2] * 5 + 1), 1)
.rotate(() => fftAvgs[0] * .004, .01)
.modulateRotate(gradient(.002), .003, .02)
  .blend(gradient(.1).modulate(o2, () => fftAvgs[1] * .6)
    .diff(shape(3).scale(() => fftAvgs[0] / 4 + 1).add(gradient(.1).add(shape(6).add(gradient(.1)))))
    .modulateRotate(o2, () => fftAvgs[0] * .03, 5)
    .blend(
      shape(3).scale(1.4).modulate(noise(() => fftAvgs[3] * .3 + fftAvgs[0] * .2, () => fftAvgs[3]))
      .rotate(.001, () => fftAvgs[3] * .0001)
      .add(osc(10 , 0, .2).hue(1).modulate(o2))
      .mult(gradient(() => fftAvgs[3] * .002))
      .modulateRotate(o2, () => fftAvgs[3] * .5, () => a.ftt[3] * .52)
    , () => fftAvgs[2] / 6)
  ,() => fftAvgs[3] / 6).out(o2)

  src(o1).mask(src(o0).modulate(noise(() =>fftMovingAvgs[2].deltaAvg, () =>fftMovingAvgs[3].deltaAvg)).repeat(2, 2).rotate(.3, .2)).modulateRotate(osc(10, () =>fftMovingAvgs[0].deltaAvg, .2), .2)
  .add(o1, () =>fftMovingAvgs[3].deltaAvg / 6 * .5).modulateRotate(o3, () => fftMovingAvgs[0].deltaAvg * .003, 0)
  .blend(o2, () => fftMovingAvgs[0].deltaAvg * .4)
  .out(o3)


render(o3)
