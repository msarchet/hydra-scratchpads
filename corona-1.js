gradient().contrast(.5)
.hue(() => window.fftMovingAvgs[4].avg * .05)
.add(
  shape(3)
  .scrollY(() => window.fftMovingAvgs[3].avg * .02, 0)
  .scrollX(() => window.fftMovingAvgs[3].avg * .02, 0)
  .modulateRotate(gradient(.2), () => window.fftMovingAvgs[2].deltaAvg, 0)
  .invert().mask(o0).rotate(-0.2, -0.2)
)
.rotate(.2, () => window.fftMovingAvgs[4].ratio + .5)
.blend(noise(() => 1 + window.fftMovingAvgs[3].last * .02)
  .modulateRotate(gradient(), .2), () => window.fftMovingAvgs[0].last * .01)
.modulate(o1, 2.1)
.out(o0)

solid(() => a.fft[6] / 5 * .3, () => a.fft[2] / 4 * .2, () => a.fft[0] / 6 * .2, .2)
.add(
  shape(() => 3 + Math.floor(a.fft[0] * .1))
  .mult(solid(() => a.fft[4] / 5 + .5, 0, 0))
  .modulateRotate(osc(() => 4 + a.fft[3] * .0003, .2, .2), () => a.fft[0] + a.fft[1])
  .scale(() => a.fft[3] * .1 + 1)
  .rotate(() => a.fft[0] * .2, .2)
)
.blend(solid(0, 0, 0, 0), () => window.fftMovingAvgs[3].deltaAvg) // fix this line for stable
.scale(() => Math.min(1 + window.fftMovingAvgs[2].ratio, 1.5))
.out(o0)

shape(3).mult(solid(1, 0, 0))
  .scale(() => {
    if (window.fftMovingAvgs[3].deltaAvg > 0)
    {
        return Math.max(window.fftMovingAvgs[2].avg * .5, 0.1)
    }
    else
    {
      return Math.max(window.fftMovingAvgs[2].avg * 0.5, 0.1)
    }
  })
  .blend(src(o1).scrollX(.1, .1), () => window.fftMovingAvgs[0].delta / 3)
  .blend(src(o1).scrollX(-.1, .1), () => window.fftMovingAvgs[2].delta / 3)
  .blend(src(o1).scrollY(.1, .1), () => window.fftMovingAvgs[4].delta / 3)
  .blend(src(o1).scrollY(-.1, .1), () => window.fftMovingAvgs[6].delta / 3)
  .hue(() => window.fftMovingAvgs[2].avg * .5)
  .modulateRotate(o0, () => window.fftMovingAvgs[3].delta, 0.01)
  .blend(o0, () => window.fftMovingAvgs[5].deltaAvg + .5)
  .out(o1)


voronoi(() => fftMovingAvgs[2].ratio * .1 + 10 , 0,0)
 .modulateRotate(osc(() => (fftMovingAvgs[0].deltaAvg / 20 + .5)), .2, .3)
 .mult(shape(3).modulate(gradient(() => a.fft[2] - .5), .2).mult(solid(1, 0, 0)).scale(() => {
    if (window.fftMovingAvgs[4].delta > 0)
    {
        return Math.max(window.fftMovingAvgs[6].avg * .1, 0.1);
    }
    else
    {
      return Math.min(window.fftMovingAvgs[2].avg * -0.3, -0.1);
    }
  })
 )
 .diff(o1)
 .out(o2)


src(o1).blend(
shape(3).mult(solid(1, .4, .4))
.scrollX(() => window.fftMovingAvgs[2].deltaAvg * 3, .2)
.rotate(.5, () => fftMovingAvgs[0].deltaAvg / fftMovingAvgs[1].deltaAvg)
.add(src(o2).scale(() => window.fftMovingAvgs[3].avg * .05), 1)
.repeat(2,2 ).scale(.3)
, () => fftMovingAvgs[3].deltaAvg / 2)
.out(o3)

 render(o1)
