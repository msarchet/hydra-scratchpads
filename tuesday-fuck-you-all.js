solid(() => fftMovingAvgs[0].max + fftMovingAvgs[1].max)
.add(
  shape(3).color(.2, 1, 0).modulateRotate(osc(() => fftMovingAvgs[3].deltaAvg * 6 + 6, 0, 0), 0, () => fftMovingAvgs[3].delta / 10, 0)
  .scale(() => fftMovingAvgs[3].deltaAvg / 2 + .5), () => .5 + fftMovingAvgs[3].deltaAvg / 2)
.add(
  shape(3).color(0, 1, 0, 1).modulateRotate(osc(() => fftMovingAvgs[1].deltaAvg * 6 + 6, 0, 0),0, () => fftMovingAvgs[1].delta / 10, 0)
  .scale(() =>  (fftMovingAvgs[1].deltaAvg / 2 + .3))
   .scrollX(() => .2 + fftMovingAvgs[1].delta / 10 , 0), () =>  .5 + fftMovingAvgs[1].deltaAvg / 2)
.add(
  shape(3).color(.2, 1, 0).modulateRotate(osc(() => fftMovingAvgs[2].deltaAvg * 6 + 6, 0, 0),0, () => fftMovingAvgs[2].delta / 10, 0)
.scale(() => (fftMovingAvgs[2].deltaAvg / 2 + .3))
  .scrollX(() => -.2 - fftMovingAvgs[2].delta / 10, 0), () =>  .5 + fftMovingAvgs[2].deltaAvg / 2)
.add(
    shape(3).color(.2, 1, 0).modulateRotate(osc(() => fftMovingAvgs[5].deltaAvg * 6 + 6, 0, 0),0, () => fftMovingAvgs[5].delta / 10, 0)
.scale(() =>(fftMovingAvgs[5].deltaAvg / 2 + .3) )
    .scrollX(() => .2 - fftMovingAvgs[5].delta / 10, 0)
    .scrollY(.2, 0), () =>  .5 + fftMovingAvgs[5].deltaAvg / 2)
.add(
  shape(3).color(.2, 1, 0).modulateRotate(osc(() => fftMovingAvgs[4].deltaAvg * 6 + 6, 0, 0),0, () => fftMovingAvgs[4].delta / 10, 0)
.scale(() =>(fftMovingAvgs[4].deltaAvg / 2 + .3))
  .scrollX(() => -.2 - fftMovingAvgs[4].delta / 10, 0)
  .scrollY(.2, 0), () =>  .5 + fftMovingAvgs[4].deltaAvg / 2)
.add(
  shape(3).color(.2, 1, 0).modulateRotate(osc(() => fftMovingAvgs[0].deltaAvg * 6 + 6, 0, 0),0, () => fftMovingAvgs[0].delta / 10, 0)
.scale(() => (fftMovingAvgs[0].deltaAvg / 2 + .5))
  .scrollX(() => -1 * fftMovingAvgs[0].delta / 10, 0)
  .scrollY(-.2, 0), () =>  .5 + fftMovingAvgs[0].deltaAvg / 2)
.out(o0)

gradient(0)
.mult(osc(() => Math.min(1, fftMovingAvgs[0].max / fftMovingAvgs[0].avg + fftMovingAvgs[1].max / fftMovingAvgs[1].avg) + 10), () => fftMovingAvgs[3].ratio + 6
)
.blend(o0, () => fftMovingAvgs[2].avg / 2 + 1)
.hue(() => Math.sin(fftMovingAvgs[3].deltaAvg * .3))
.out(o1)

src(o1).blend(
shape(3)
.rotate(0, () => fftMovingAvgs[0].deltaAvg / fftMovingAvgs[1].deltaAvg)
.mult(src(o1).scale(2), 1)
.repeat(3, 3).scale(.3)
, () => fftMovingAvgs[3].deltaAvg / 2)
.out(o2)

voronoi(() => fftMovingAvgs[2].ratio * .1 + 10 , 0,0)
 .modulateRotate(osc(() => (fftMovingAvgs[0].deltaAvg / 20 + .5)), .3, .3)
 .diff(o2)
 .out(o3)

render(o3)
