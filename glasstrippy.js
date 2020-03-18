// by Michael Sarchet
// @msarchet



a.setScale (1)
a.setBins (6)
a.settings[0].cutoff = 2
a.settings[1].cutoff = 3
a.settings[2].cutoff = 4
a.settings[3].cutoff = 6
a.settings[4].cutoff = 8
a.settings[5].cutoff = 10

a.show()

gradient(() => a.fft[0], () => a.fft[1], () => a.fft[3])
.modulate(voronoi(5, 12, 7).scale(2.0))
.blend(voronoi(() => Math.sin(time) + a.fft[5], () => Math.random() + 5))
.out(o0)

shape(() => {
   if (a.fft[4] < a.fft[2]) {
     return 3
   }
   else {
     return 6
   }
})
.modulatePixelate(noise(() => a.fft[0] * 25 + 12.5, () => a.fft[2]),100)
.mult(o0)
.modulateHue(osc(120), .2)
.repeat(3, 2)
.scrollX(() => a.fft[4] + 100, () => Math.sin(time))
.scrollY(() => a.fft[5], () => Math.sin(time) * .03)
.out(o1)


solid(() => a.fft[4], () => a.fft[2], () => a.fft[3])
.modulateHue(osc(2), () => Math.sin(time * .003) * 3)
.blend(o0)
.modulatePixelate(noise(() => a.fft[1] +3), () => a.fft[1] +2)
.blend(o2)
.luma(() => 1 - a.fft[0])
 .colorama(() => .3 - a.fft[4])
 .blend(o2)
.out(o2)

voronoi(() => Math.random() + 2, 4,.3)
.luma(() => .2 - a.fft[0])
 .colorama(() =>a.fft[1] +  a.fft[4])
 .modulateRotate(osc(() => a.fft[1] * 300), .3)
 .diff(o2)
 .out(o3)

 render(o3)






render()
