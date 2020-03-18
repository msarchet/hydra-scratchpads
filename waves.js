// by Michael Sarchet
// @msarchet
bounceChannel = () => a.fft[2] * .001
bounceChannelUpdates = () => bounceChannel()
a.detectBeat()
render()
a.settings[1].setSmooth = 0

a.show()

gradient().contrast(.5)
.hue(() => a.fft[4] * .05)
.add(
  shape(3)
  .scrollY(() => a.fft[3] * .02, 0)
  .scrollX(() => a.fft[3] * .02, 0)
  .modulateRotate(gradient(.2), () => a.fft[2], 0)
  .invert().mask(o0)
)
.blend(noise(() => 1 + a.fft[3] * .02).modulateRotate(gradient(), .2), () => a.fft[0] * .01)
.modulate(o1, .1)
.out(o0)

gradient().add(solid(1, 1, 1, 1), 1)
.blend(o0, .3)
.modulate(o0, .1)
.modulate(o1, () => a.fft[5] * .1)
.scale(.4)
.rotate(() => a.fft[3] * .2, 0)
.out(o1)

src(o0)
.contrast(() => a.fft[4] * .3 + .4)
.diff(o1)
.mask(o0)
.modulateRotate(o0, () => Math.sin(time * .02 + a.ftt[1] * .2) + .2, () => a.fft[3] * .03)
.out(o2)

shape(() => Math.max(5 - 3 * (Math.min(a.fft[3] * .2 + a.fft[2] * .8 + .5, 1)), 3))
.invert(() => a.fft[3] < .2 ? .9 : .3)
.scale(() => a.fft[2] * .05 + Math.sin(time) * .1  + 1)
.brightness(-.2)
.colorama(() => a.fft[2] * .2)
.modulateRotate(o2, () => a.fft[2] * .05 + .05, .2)
.modulateKaleid(o2, () => 3 + a.fft[0], .2)
.add(src(o3).scrollX(() => a.fft[3] * .5, 0))
.add(src(o3).scrollX(() => -1 * a.fft[3] * .5, 0))
.mult(o2)
.saturate(1.2)
.mask(shape(3).diff(solid(1, 1, 1, 1)).scale(() => a.fft[0] / 10 + .3).repeat(3, 3).modulateRotate(osc(12, 0, .2), () => a.fft[2] * .6 + .2, () => a.fft[0] * .007 + .003))
.out(o3)

render(o3)
bpm(0)

a.detectBeat()

render(o3)
