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
  return Math.min(Math.max(min, modulator()), max)
}
curriedModulator = (min, max) => {
  return () => window.boundMoudlator(min, max)
}
gateChannel = (channel, min, max) => {
  return () => Math.min(max, Math.max(min, a.fft[channel]))
}
getFFT = channel => { return () => a.fft[channel] }
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
switchGenerator = () => {
  return {
    getTexture: () => {
      if (true) {
        return shape(3)
      }
    }
  }
}

src(false ? s0 : s1)
.out(o0)

render()

bpm(40)

osc(() => cc[10] * 180 + a.fft[0] * 180, () => cc[11] * .3, () => cc[12] * .8).modulateRotate(gradient().modulate(o0, () => a.fft[1]), .2, .2).blend(src(o0).modulate(o0), .3).out(o0)

gradient().mask(
shape(3).rotate(() => a.fft[0] * .3, () => a.fft[2])).modulate(o0, () => a.fft[0] * .03)
.rotate(() => a.fft[1] * .2 + a.fft[0] * .2 * (a.fft[3] < .5 ? 1: -1) * .1, () => a.fft[1])
.out(o1)

src(o1).modulate(o0, () => a.fft[1] * .2).invert(() => a.fft[1] - .3).mask(src(o1).invert(() => a.fft[1] - .3).rotate(() => a.fft[4], () => a.fft[5])).out(o2)
