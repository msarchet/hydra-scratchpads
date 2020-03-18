// by Michael Sarchet
// @msarchet

modulator = () => {
 let modulators = [
    (() => a.fft[1])(),
    (() => a.fft[1] % a.fft[0])(),
    (() => a.fft[2] % a.fft[3])(),
    (() => a.fft[3] % a.fft[1])(),
    (() => a.fft[2])(),
    (() => a.fft[2] % a.fft[1])(),
    (() => a.fft[2] % a.fft[4])(),
    (() => a.fft[5] % a.fft[2])(),
    (() => a.fft[3])(),
    (() => a.fft[1] % a.fft[5])(),
    (() => a.fft[4] % a.fft[1])(),
    (() => a.fft[2] % a.fft[1])(),
    (() => a.fft[4])(),
    (() => a.fft[1] % a.fft[1])(),
    (() => a.fft[3] % a.fft[3])(),
    (() => a.fft[5] % a.fft[2])(),
  ]
  let index = (Math.random() * modulators.length | 0) % modulators.length
  return Math.max(modulators[index] || .01, .01)
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

osc(120, .0, .2)
  .colorama(1.0)
  .modulate(gradient(.1, .1, .1, .1), modulator)
  .blend(o0)
  .rotate(.2, modulator)
.out(o0)

noise(modulate)
.modulate(src(o1).blend(gradient(.1, .2, .4, .2), .2))
.blend(
    shape(3)
      .repeatX(() => modulator * 6 + 2)
      .scrollY(modulator, .2)
      .kaleid(3)
      .modulateRotate(osc(13, modulator, .4), .2, .3)
    )
  .add(gradient(.2, .2, modulator, modulator))
  .modulateKaleid(o0, modulator)
.out(o1)

shape(() => modulate() * 6)
.modulate(noise(() => a.fft[3] * .2))
.blend(o1, 2, 3)
.modulatePixelate(src(o1)
  .blend(voronoi(12, modulator, .2)
   ,.5),
6, () => modulator() * 100)
.scale(() => .2 * modulator() + .8)
.modulate(o1, .2)
.add(solid(.1, .2, 1.0, 1))
.blend(o1)
.out(o2)


invertsometimes = () => {
  if (modulator() < .5) {
    return 0
  }
  return 1
}
shape(3)
.invert(invertsometimes)
.blend(gradient(.2, .2, .2, .2), .2)
.mult(o2)
.mask(o2)
.modulateRotate(osc(12, .3, .2), modulator, .2)
.scale(() => Math.sin(time % 2.4) + (a.fft[5] + .5) * 2)
.out(o3)

render(o3)
