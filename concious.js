// by Michael Sarchet
// @msarchet
bounceChannel = () => a.fft[5] * .001
bounceChannelUpdates = () => bounceChannel()
a.detectBeat()
voronoi(13, bounceChannelUpdates, () => a.fft[0] * .2)
.blend(solid(1, 0, 0, .2), ()=> Math.Max(a.fft[0] * .3 + a.fft[3] * .05 + a.fft[1] * .1, .4))
.modulate(noise(() => Math.max(.1, a.fft[2]) * 0.01), .1)
.out(o0)

src(o0).modulate(gradient(1, () => .1 + a.fft[2] * .1, .0), () => a.fft[0] * .1 + .9)
.mask(o0).out(o1)

shape(3).scale(() => .8 + a.fft[2] * .1)
.modulateKaei
.modulateRotate(o1, () => a.fft[0] * .1 + .2, 0)
.modulateHue(o2, .2)
.mask(o1)
.out(o2)

voronoi(() => a.fft[3] * .003 + 2, 4,.3)
 .modulateRotate(osc(() => a.fft[1] * .012 + 10, 0, .1), () => a.fft[5] * .03, 0)
 .colorama(() => (a.fft[3] * .03 + .2))
 .mask(src(o2))
 .blend(src(o2).scrollX(() => a.fft[2] * .001, 0), () => a.fft[3] / 7  * .3 + .1)
  .blend(src(o2).scrollX(() => a.fft[2] * -.001, 0),  () => a.fft[3] / 7  * .3 + .1)
 .brightness(.4)
 .contrast(1)
 .modulateRotate(o2, () => a.fft[2] * .02, 0)
 .out(o3)

a.detectBeat()
 render(o3)
