// by Michael Sarchet
// @msarchet



a.setScale (1)
a.setBins (6)
a.settings[0].cutoff = 1
a.settings[1].cutoff = 2
a.settings[2].cutoff = 4
a.settings[3].cutoff = 6
a.settings[4].cutoff = 8
a.settings[5].cutoff = 9
a.show()

shape([3,9,6]).scale(()=> a.fft[4]*2 + 1)
.blend(o0).add(shape(3).color(.3,.4,0.7))
.blend(o0).color(1,1,1)
.blend(o0).rotate(()=> a.fft[1]*0.1 -0.2)
.scrollY(-0.32,-0.2)
.add(shape(20).color(2,0,0).scrollY(()=> a.fft[0]*0.7 -0.1,-0.02)).scale(()=> a.fft[2]*0.7 -0.8)
.scale(()=> a.fft[3]*2 -1)
.modulate(o0,()=> a.fft[2]*0.1 -0.2)
.rotate(-0.1,()=> a.fft[3]*0.7 -0.1)
.out(o0)

shape(3).blend(osc(60, .4, .9)).posterize([4,8,6], () => Math.sin(a.fft[1]) * 12)
  .modulate(osc(() => 12 * a.fft[1] + 1, a.fft[2], a.fft[3]))
  .rotate(() => a.fft[1] * 10, () => a.fft[2] * 4)
  .blend(o0)
  .modulate(o1, () => a.fft[5]*.3 + 2)
  .add(o0)
  .out(o1)

osc(() => {

  return Math.max(.03, a.fft[Math.floor((Math.random() * 6)) | 0]) * 360

          } , .3, .5)
  .rotate(.3, .2)
  .modulateRotate(osc(2, .3, .4), () => a.fft[2])
  .blend(o1)
  .scrollX(.4, .2)
   .modulateRotate(osc(4, .3, .6), 3)
   .modulate(o0)
  .add(o0)
  .out(o2)

render(o2)
