a.setScale(1)
a.setBins (8)
a.settings[0].cutoff = 1
a.settings[0].smoothing = true
a.settings[1].cutoff = 3
a.settings[1].smoothing = true
a.settings[2].cutoff = 3
a.settings[2].smoothing = true
a.settings[3].cutoff = 1
a.settings[4].cutoff = 2
a.settings[5].cutoff = 3
a.settings[5].smoothing = true
a.settings[6].cutoff = 3
a.settings[6].smoothing = true
a.settings[7].cutoff = 3
a.settings[7].smoothing = true
a.show()
render()
// moved to core.js

// base ideas

gradient(() => a.fft[3] * .005)
.add(shape(() =>Math.max(3,  a.fft[4] * 2)).repeat(2,2)
.modulateKaleid(o0, () => a.fft[2] * 5 + 1), 1)
.rotate(() => a.fft[0] * .004, .01)
.modulateRotate(gradient(.002), .003, .02)
.out(o0)

gradient(() => fftMovingAvgs[3].avg * .005)
.add(shape(() =>Math.max(3,  fftMovingAvgs[4].avg * 2)).repeat(2,2)
.modulateKaleid(o0, () => fftMovingAvgs[2].avg * 5 + 1), 1)
.rotate(() => fftMovingAvgs[0].avg * .04, .01)
.modulateRotate(gradient(.002), () => a.fft[6], .02)
.diff(shape(3).repeat(3, 3,).rotate(.3, 0).modulate(o0, () => a.fft[4]  /10).mult(o0).scrollX(.1, .1))
.out(o0)

voronoi(5, () => a.fft[0] * .0008, () => a.fft[2] * 4 + 4)
.mult(gradient(() => a.fft[5] * .01), .5)
.modulate(o1, () => a.fft[0] / 6)
.add(src(o1).scrollX(() => a.fft[4] / 5, .2).scrollY(.2, () => a.fft[2] * .001), .5)
.add(src(o1).scrollX(() => -1 * a.fft[4] / 5, .2).scrollY(-.2, () => a.fft[2] * .001), .5)
.colorama(() => a.fft[0] * .07)
.mask(shape(3).repeat(() => a.fft[3], () => 5 - a.fft[3]).modulateKaleid(osc(1, 0, 0), () => a.fft[0] + 3))
.saturate(10)
.modulate(o1, () => a.fft[0] * .4)
.blend(osc(() => 10 + a.fft[0] * .1, 0, .5).hue(.2).rotate(.2, .2).modulate(osc(10, 0, .5), () => a.fft[3] * .03).add(o1), () => a.fft[0] / 7)
.out(o1)

shape(3).scale(1.4).modulate(noise(() => a.fft[3] * .03 + a.fft[0] * .2, () => a.fft[3]))
.rotate(.001, () => a.fft[3] * .0001)
.add(osc(10 , 0, .2).hue(1).modulate(o2))
.mult(gradient(() => a.fft[3] * .002))
.modulateRotate(o2, () => a.fft[3] * .5, () => a.ftt[3] * .52)
.out(o2)

solid(() => fftMovingAvgs[6].avg / 5 * .3, () => fftMovingAvgs[2].avg / 4 * .2, () => fftMovingAvgs[0].avg / 6 * .2, .2)
.add(
  shape(() => 3 + Math.floor(fftMovingAvgs[0].avg * .1)).modulateRotate(osc(() => 4 + fftMovingAvgs[3].avg * .0003, .2, .2), () => fftMovingAvgs[0].avg + fftMovingAvgs[1].avg)
  .scale(() => fftMovingAvgs[0].avg * .1 + 1)
  .rotate(() => fftMovingAvgs[0].avg * .2, .2)
)
.blend(o1, .4)
.contrast(1)
.out(o2)



gradient(.1).modulateRotate(o3, () => a.fft[1] / 3, .3)
.diff(shape(3).modulate(noise(() => a.fft[0] / 10 * 3)).scale(() => a.fft[0] / 10 + 1).mult(gradient(.1).add(shape(6).modulate(noise(4)).scale(() => a.fft[1] * .5).mult(gradient(.1)))))
.modulateRotate(o3, () => a.fft[0] * .003, 5)
.out(o3)

gradient(.1).modulateRotate(o3, () => fftMovingAvgs[1].avg * .5, .3)
.diff(shape(3).modulate(noise(() => fftMovingAvgs[0].avg / 10 * 3)).scale(() => fftMovingAvgs[0].avg / 10 + 1).mult(gradient(.1).add(shape(6).modulate(noise(4)).scale(() => a.fft[1] * .5).mult(gradient(.1)))))
.modulateRotate(o3, () => fftMovingAvgs[0].avg * .003, 5)
.out(o3)


render()

// blends

// o0 blends



// o1 blends

gradient(.1).modulate(o1, () => a.fft[1] * .6)
.diff(shape(3).scale(() => a.fft[0] / 4 + 1).add(gradient(.1).add(shape(6).add(gradient(.1)))))
.modulateRotate(o1, () => a.fft[0] * .03, 5).blend(
  shape(3).scale(1.4).modulate(noise(() => a.fft[3] * .03 + a.fft[0] * .2, () => a.fft[3]))
  .rotate(.001, () => a.fft[3] * .0001)
  .add(osc(10 , 0, .2).hue(1).modulate(o1))
  .mult(gradient(() => a.fft[3] * .002))
  .modulateRotate(o1, () => a.fft[3] * .5, () => a.ftt[3] * .52).blend(
    gradient(() => a.fft[3] * .005)
    .add(shape(() =>Math.max(3,  a.fft[4] * 2)).repeat(2,2)
    .modulateKaleid(o1, () => a.fft[2] * 5 + 1), 1)
    .rotate(() => a.fft[0] * .004, .01)
    .modulateRotate(gradient(.002), .003, .02)
  , () => a.fft[3] * .2)
, () => a.fft[0] * .3)
.out(o1)


gradient(.1).modulate(o1, () => fftMovingAvgs[1].avg * .6)
.diff(shape(3).scale(() => fftMovingAvgs[0].avg / 4 + 1).add(gradient(.1).add(shape(6).add(gradient(.1)))))
.modulateRotate(o1, () => fftMovingAvgs[0].avg * .03, 5).blend(
  shape(3).scale(1.4).modulate(noise(() => fftMovingAvgs[3].avg * .03 + fftMovingAvgs[0].avg * .2, () => fftMovingAvgs[3].avg))
  .rotate(.001, () => fftMovingAvgs[3].avg * .0001)
  .add(osc(10 , 0, .2).hue(1).modulate(o1))
  .mult(gradient(() => fftMovingAvgs[3].avg * .002))
  .modulateRotate(o1, () => fftMovingAvgs[3].avg * .5, () => fftMovingAvgs[3].avg * .52).blend(
    gradient(() => fftMovingAvgs[3].avg * .005)
    .add(shape(() =>Math.max(3, fftMovingAvgs[4].avg * 2)).repeat(2,2)
    .modulateKaleid(o1, () => fftMovingAvgs[2].avg * 5 + 1), 1)
    .rotate(() => fftMovingAvgs[0].avg * .004, .01)
    .modulateRotate(gradient(.002), .003, .02)
  , () => fftMovingAvgs[3].avg * .2)
, () => fftMovingAvgs[0].avg * .3)
.out(o1)



// o2 blends
gradient(() => a.fft[3] * .005)
.add(shape(() =>Math.max(3,  a.fft[4] * 2)).repeat(2,2)
.modulateKaleid(o2, () => a.fft[2] * 5 + 1), 1)
.rotate(() => a.fft[0] * .004, .01)
.modulateRotate(gradient(.002), .003, .02)
  .blend(gradient(.1).modulate(o2, () => a.fft[1] * .6)
    .diff(shape(3).scale(() => a.fft[0] / 4 + 1).add(gradient(.1).add(shape(6).add(gradient(.1)))))
    .modulateRotate(o2, () => a.fft[0] * .03, 5), () => a.fft[3] / 6).out(o2)

    gradient(() => a.fft[3] * .005)
    .add(shape(() =>Math.max(3,  a.fft[4] * 2)).repeat(2,2)
    .modulateKaleid(o2, () => a.fft[2] * 5 + 1), 1)
    .rotate(() => a.fft[0] * .004, .01)
    .modulateRotate(gradient(.002), .003, .02)
      .blend(gradient(.1).modulate(o2, () => a.fft[1] * .6)
        .diff(shape(3).scale(() => a.fft[0] / 4 + 1).add(gradient(.1).add(shape(6).add(gradient(.1)))))
        .modulateRotate(o2, () => a.fft[0] * .03, 5)
        .blend(
          shape(3).scale(1.4).modulate(noise(() => a.fft[3] * .3 + a.fft[0] * .2, () => a.fft[3]))
          .rotate(.001, () => a.fft[3] * .0001)
          .add(osc(10 , 0, .2).hue(1).modulate(o2))
          .mult(gradient(() => a.fft[3] * .002))
          .modulateRotate(o2, () => a.fft[3] * .5, () => a.ftt[3] * .52)
        , () => a.fft[2] / 6)
      ,() => a.fft[3] / 6).out(o2)


// meta mix

src(o1).mask(src(o0).modulate(noise(() => a.fft[2], () => a.fft[3])).repeat(2, 2).rotate(.3, .2)).modulateRotate(osc(10, () => a.fft[0], .2), .2)
.add(o1, () => a.fft[3] / 6 * .5).modulateRotate(o3, () => a.fft[0] * .003, 0)
.blend(o2, () => a.fft[0] * .4)
.out(o3)

src(o1).mask(src(o0).modulate(noise(() =>fftMovingAvgs[2].avg, () =>fftMovingAvgs[3].avg)).repeat(2, 2).rotate(.3, .2)).modulateRotate(osc(10, () =>fftMovingAvgs[0].avg, .2), .2)
.add(o1, () =>fftMovingAvgs[3].avg / 6 * .5).modulateRotate(o3, () => fftMovingAvgs[0].avg * .003, 0)
.blend(o2, () => fftMovingAvgs[0].avg * .4)
.out(o3)

render(o3)
