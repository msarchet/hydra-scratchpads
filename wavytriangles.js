// by Michael Sarchet
// @msarchet

modulate = () => {
  let index = (a.fft[0] * 10 | 0) % 10
  return [
    .4,
    1,
    .6,
    .25,
    .3,
    .69,
    .420,
    .710,
    .13,
    .87
  ][index]
}

a.setScale (1)
a.setBins (6)
a.settings[0].cutoff = 1
a.settings[1].cutoff = 2
a.settings[2].cutoff = 4
a.settings[3].cutoff = 6
a.settings[4].cutoff = 8
a.settings[5].cutoff = 10
a.show()

osc(120, .0, () => a.fft[1] + .3)
  .modulate(o0, () => a.fft[2])
  .colorama(1.0)
  .posterize(12, 10)
  .modulateRotate(noise(2.3), .2, .2)
  .blend(osc(13, .1, .1).modulateRotate(voronoi(13, .2, .2), .3).blend(gradient(.3, .5, .1, .4), 1.0))
.out(o0)

noise(modulate)
.blend(noise(() => a.fft[1]), .2)
.blend(solid(0.1, .2, .8))
.modulate(o1)
.brightness(.3)
.contrast(.3)
.blend(
    shape(3)
      .repeatX(() => a.fft[2] * 6 + 2)
      .scrollY(.2, .2)
      .modulateRotate(osc(13, () => a.fft[3], .4), .2, .3)
    )
.mult(o0)
.rotate(() => Math.sin(time) * .1, .05)
.out(o1)


solid(() => Math.tan(a.fft[2]), () => Math.sin(a.fft[2]), () => Math.cos(a.fft[2]))
.mult(
  solid(() => Math.tan(a.fft[2]), () => Math.sin(a.fft[2]), () => Math.cos(a.fft[2]))
  .add(solid(() => Math.tan(a.fft[2]), () => Math.sin(a.fft[2]), () => Math.cos(a.fft[2])))
)
.modulateHue(osc(Math.sin(time), .2, .4).color(() => a.fft[2], () => a.fft[1], () => a.fft[2]),() => a.fft[1] * 120)
.modulate(o1, .3)
.diff(o0)
.out(o1)

shape([3])
.modulate(noise(() => a.fft[3] * .2))
.blend(o1, 2, 3)
.modulatePixelate(src(o1)
  .blend(voronoi(12, .2, .2)
   ,.5),
6, 10)
.scale(() => .2 * a.fft[0] + .8)
.modulate(o1, .2)
.add(solid(.1, .2, 1.0, 1))
.blend(o1)
.out(o2)

shape(3)
.mult(solid(() => Math.sin(time) * 1.2, () => Math.sin(time) + .1, () => Math.cos(time) + .2))
.rotate(() => a.fft[1] + a.fft[2], () => a.fft[2])
.repeat(() => a.fft[1] * 5 + 1, () => a.fft[2] * 6 +1)
.modulate(noise(() => a.fft[1]))
.blend(o1)
.scale(2)
.mult(o2)
.diff(o2)
.out(o3)


shape(3)
.scale(2)
.mult(gradient(() => Math.sin(time) * 6 | 0))
.rotate(() => a.fft[1] + a.fft[2], () => a.fft[2])
.repeat(() => a.fft[1] * 5 + 1, () => a.fft[2] * 6 +1)
.modulate(noise(() => a.fft[1]))
.blend(o1)
.modulate(o2)
.out(o3)

render(o2)
