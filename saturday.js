a.setScale(.3)
a.setBins (6)
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
a.show()
render(o0)


bpm(90)


shape(() => 6 - Math.max(3, Math.floor(a.fft[3] * .4)))
.modulate(noise(() => a.fft[0] * .01+ 1.7), () => a.fft[3] * .1 + a.fft[4] * .1 + a.fft[5] * .1)
.kaleid(() => 3 - a.fft[3] * .01 | 0, .1)
.out(o0)

a.detectBeat()

noise([1,1,1,4])
.modulate(o0, () => a.fft[2] * .01)
.add(gradient().rotate(.2, () => a.fft[3]), .2)
.mask(shape(3).repeat(3, 3).modulateRotate(o1, () => a.fft[0] * .3, 100))
.scrollX(() => a.fft[2] * .1, .1)
.out(o0)

gradient(() => a.fft[5] * .003)
  .mask(o0)
  .kaleid(3)
  .blend(o1, () => a.fft[2] * .1)
.add(osc(() => 12, .2, () => a.fft[3] * .2).modulate(o0, () => a.fft[2] * .02 + 1))
.out(o1)

solid(() => a.fft[5] * .003)
  .mask(o0)
.add(osc(() => 12, .2, () => a.fft[3] * .2).modulate(o1, .2))
.out(o1)

voronoi(() => 64 + a.fft[0], .2, .2)
.modulate(o2, () => a.fft[3] * .02)
.mult(o1, () => .8 + a.fft[0] * .01)
.out(o2)

solid(() => a.fft[6] / 5 * .3, () => a.fft[2] / 4 * .2, () => a.fft[0] / 6 * .2, .2)
.add(
  shape(() => 3 + Math.floor(a.fft[0] * .1)).modulateRotate(osc(() => 4 + a.fft[3] * .0003, .2, .2), () => a.fft[0] + a.fft[1])
  .scale(() => a.fft[3] * .1 + 1)
  .rotate(() => a.fft[0] * .2, .2)
)
.blend(o1, .4)
.contrast(1)
.out(o0)



gradient(() => a.fft[3] * .003)
.modulate(o1, .1)
.blend(o2, .95)
.mask(o2)
.add(o2, () => a.fft[5] * .15)
.out(o3)


voronoi(() => 12 + a.fft[0], 0, 8)
.modulate(o1, () => a.fft[3] * .2)
.blend(o2, .95)
.mask(src(o0))
.add(src(o2).scrollX(() => a.fft[3] * .001, 0), () => a.fft[3] * .15)
.add(src(o2).scrollX(() => a.fft[3] * -.001, 0), () => a.fft[3] * .15)
.out(o3)

shape(() => 6 - Math.min(3, Math.floor(a.fft[3] * .05)))
.mask(o2)
.blend(o0, () => a.fft[3] * .5 + .2)
.mask(src(o2))
.blend(o2, () => a.fft[3] * .1 + .8)
.modulate(o1, () => a.fft[2] * .03)
.out(o3)

s0.initCam(1)


render()

src(o3)
.kaleid(3)
.modulate(o1, () => a.fft[0] * .0003)
.mask(o2)
.blend(o0, () => a.fft[3] * .5 + .2)
.mask(o2)
.modulateRotate(osc(10, .2, 0).add(gradient()), .2, .2)
.blend(o2, () => a.fft[3] * .1 + .4)
.out(o3)

render(o3)
