
gradient().contrast(.5)
.hue(() => fftAvgs[4] * .05)
.add(
  shape(3)
  .scrollY(() => fftAvgs[3] * .02, 0)
  .scrollX(() => fftAvgs[3] * .02, 0)
  .modulateRotate(gradient(.2), () => fftAvgs[2], 0)
)
.blend(noise(() => fftAvgs[3] * .02)
.modulateRotate(gradient(), .2), () => fftAvgs[0] * .01)
.blend(
  gradient().add(solid(1, 1, 1, 1), 1)
  .modulate(o0, .1)
  .scale(.4)
  .rotate(() => fftAvgs[3] * .2, 0)
  .diff(o0)
  .mask(o0)
  .modulateRotate(o0, () => Math.sin(time * .02 + a.ftt[1] * .2) + .2, () => fftAvgs[3] * .03)
, () => fftAvgs[1] / 3)
.blend(
shape(() => Math.max(5 - 3 * (Math.min(fftAvgs[3] * .2 + fftAvgs[2] * .8 + .5, 1)), 3))
.scale(() => fftAvgs[2] * .05 + Math.sin(time) * .1  + 1)
.brightness(-.2)
.colorama(() => fftAvgs[2] * .2)
.modulateRotate(o0, () => fftAvgs[2] * .05 + .05, .2)
.modulateKaleid(o0, () => 3 + fftAvgs[0], .2)
.add(src(o0).scrollX(() => fftAvgs[3] * .5, 0))
.add(src(o0).scrollX(() => -1 * fftAvgs[3] * .5, 0))
.saturate(1.2)
.mask(shape(3).diff(solid(1, 1, 1, 1)).scale(() => fftAvgs[0] / 10 + .3).repeat(3, 3).modulateRotate(osc(12, 0, .2), () => fftAvgs[2] * .6 + .2, () => fftAvgs[0] * .007 + .003))
, () => fftAvgs[0] / 2).out(o0)

shape(() => 3 + Math.floor(5 - fftAvgs[3]))
.modulate(noise(() => Math.floor(fftAvgs[2]) + Math.floor(fftAvgs[5])), () => fftAvgs[0] * .1)
.mask(shape(3).scale(2).scrollY(.1, 0))
.mult(gradient(() => fftAvgs[2] / 10 + fftAvgs[1] /10 + .1))
.rotate(.1, () => fftAvgs[3] * .01)
.blend(gradient(() => fftAvgs[0] / 1000).modulate(o1, () => a.fft[3] * .01 + .2), () => fftAvgs[2] * .3 + .01, .5)
.diff(src(o1).saturate(-.2), .2)
.out(o1)

osc(10, .2, .2).blend(gradient(() => fftAvgs[2] / 10), .2)
.mask(shape(3))
.rotate(-1, () => fftAvgs[2] / 4)
.kaleid( 3)
.repeat(2, 2)
.rotate(1, .2)
.scrollX(() => fftAvgs[0] / 10, .2)
.blend(osc(10, () => fftAvgs[0] / 10, .2), () => fftAvgs[3] / 4)
.diff(o2)
.out(o2)

src(o3).blend(o2, .2).blend(o0, () => fftAvgs[3] / 8 + .2).mask(src(o1).brightness(.1)).diff(o2).out(o3)

render(o3)