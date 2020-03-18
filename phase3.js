// by Michael Sarchet
// @msarchet
(()=>  {
  window.modulators = []
  for (let i = 0; i < 20; i++){
   let left = (Math.random() * 6 % 6 )| 0
   let right = (Math.random() * 6 % 6) | 0
   modulators.push(() => a.fft[left] || 0 % Math.min(a.fft[right] || .2, 1))
}
})()

modulator = () => {
  let index = (Math.random() * modulators.length | 0) % modulators.length
  return Math.max(modulators[index % 6](), .05)
}

boundModulator = (min, max) => {
  return Math.min(Math.max(min, modulate()), max)
}
curriendModulator = (min, max) => {
}


a.setScale (1)
a.setBins (6)
a.settings[0].cutoff = 1
a.settings[1].cutoff = 2
a.settings[2].cutoff = 3
a.settings[3].cutoff = 6
a.settings[4].cutoff = 8
a.settings[5].cutoff = 10
a.show()

render()

noise(() => boundModulator(.25, .75))
.invert(() => modulator() < .5 ? .7 : .3)
.out(o0)

s0.initCam(0)

src(s0)
.diff(osc(12, () => boundModulator(.2, .3)), curriendModulator(.2,.4))
.blend(osc(12,.2,.2).blend(boundModulator(modulator, .2, .3), .2), .3)
.out(o0)

render()


voronoi(12, .1, () => boundModulator(.5, .76)).diff(o0)
.modulate(noise(modulator))
.rotate(.2, .01)
.saturate(.3)
.color([1,0,1,0], [0,1,0,1], modulator, .8)
.blend(osc(12, 0, .1).modulate(noise(1.2)))
.mask(shape(3).scale(3).modulateRotate(noise(modulator), .2, .2).kaleid(6).add(noise(1.5)).scale(.25))
.rotate(.4, () => (modulator() + .1) * 5)
.out(o1)

noise(1.2).blend(noise(modulator)).blend(gradient(1, .1, 1, .1)).add(solid(1, modulator, modulator, .3)).mult(o1).modulate(o1).scale(() => Math.sin(time * .001 * modulator()) * .4 + 1)
.contrast(1)
.modulate(osc(() => Math.sin(time * modulator()) * 5 + 5, 3, modulator))
.out(o2)

shape([3, 3, 6, 3, 3, 9])
.mask(o2)
.blend(o0)
.mask(src(o2).brightness(1))
.blend(gradient(() => a.fft[2] / 10).mask(src(o0).invert(() => a.fft[3] / 7)).modulate(o3, .2), ({time}) => Math.abs(Math.sin(time)) + a.fft[3] / 3)
.out(o3)

render(o3)
