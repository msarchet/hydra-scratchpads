window.vid = document.createElement('video')
vid.autoplay = true
vid.loop = true
vid.src = atom.project.getPaths()[0]+'/assets/virus.mp4'

s0.init({src: window.vid})

src(s0)
.blend(src(o1).modulate(noise(10)), .2)
.mult(src(s0).scrollX(.1, () => window.fftMovingAvgs[2].avg))
.mult(src(s0).scrollY(.1, () => window.fftMovingAvgs[6].avg))
.modulateRotate(osc(12, () => .1 * window.fftMovingAvgs[1].delta, .1), () => window.fftMovingAvgs[3].ratio, .2)
.out(o0)

render()


osc(1, 0, () => fftMovingAvgs[2].avg / 100)
.add(solid(() => fftMovingAvgs[3].delta + .5, () => fftMovingAvgs[0].delta / 10, () => fftMovingAvgs[6].ratio / 10).mult(noise(2)))
.modulateRotate(noise(1), 2, () => fftMovingAvgs[3].ratio / 6)
.rotate(.2, () => fftMovingAvgs[4].avg / 100)
.out(o0)

shape([4, 3, 3, 6])
.modulateRotate(noise(() => fftMovingAvgs[2].last + 10), () => fftMovingAvgs[4].deltaAvg, .2)
.rotate(1.2, () => fftMovingAvgs[2].ratio / 10)
.scale(() => fftMovingAvgs[3].last - 1.3)
.mult(solid(1, .3, .3))
.contrast(1.2)
.repeat(2,2).out(o1)

src(o1)
.add(shape(3).repeat(3,3).repeat(3,3).modulateRotate(noise(() => fftMovingAvgs[1].avg)))
.blend(o0, () => fftMovingAvgs[3].ratio < .8 ? .2 : .5)
.add(src(o1).scrollX(() => fftMovingAvgs[4].avg / 10, () => fftMovingAvgs[3].avg /10))
.add(shape(6).scrollY(.2, 2).repeat(3, 3).scale(.2).mult(src(o0).contrast(2)).modulate(o0, () => fftMovingAvgs[3].avg))
.out(o2)

shape([3, 3, 6, 3, 3, 9]).modulateRotate(o1, .2, .2)
.mask(o2)
.mult(o0)
.blend(gradient(() => a.fft[2] / 10).mask(src(o0).invert(() => a.fft[3] / 7)).modulate(o3, .2), ({time}) => a.fft[3] / 3)
.out(o3)

render(o1)

a.detectBeat()
///

window.getPosition = (count, index, padding = 0.0) => {
    const available = 1.0 - padding * 2
    const between = available / count
    const delta = between * index
    return .5 - padding - delta
}
window.curryPositionCalulator = (count, padding) => (index) => getPosition(count, index, padding)

window.tenSpace = curryPositionCalulator(10, 0.05)

shape(3).scrollX(() => sdDeltaAvg(2), .2)
.modulateRotate(o0, 2, sdAvg(3)).mult(solid(1, 0, 0))
  .scale(() => {
    if (sdDeltaAvg(3) > 0)
    {
        return Math.max(sdAvg(2) * .5, 0.1)
    }
    else
    {
      return Math.max(sdAvg(2)* 0.5, 0.1)
    }
  })
  .add(src(o1).scrollX(.1, .1), () => sdDelta(0))
  .add(src(o1).scrollX(-.1, .1), () => sdDelta(2))
  .add(src(o1).scrollY(.1, .1), () => sdDelta(4))
  .add(src(o1).scrollY(-.1, .1), () => sdDelta(6))
  .hue(() => sdAvg(2) * .5)
  .modulateRotate(o0, () => sdDelta(3) / 5 , 0.01)
  .blend(o0, () => sdDeltaAvg(5) / 5 + .5)
  .out(o1)

let eightSpace = curryPositionCalulator(8, 0.05)
let scaler = c => _ => .25 + sdLast(c) / 10
solid()
.add(shape(8).scale(scaler(0)).scrollX(eightSpace(0), 0).scrollY(() => sdRatio(0) , 0))
.add(shape(8).scale(scaler(1)).scrollX(eightSpace(1), 0).scrollY(() => sdRatio(1) , 0))
.add(shape(8).scale(scaler(2)).scrollX(eightSpace(2), 0).scrollY(() => sdRatio(2) , 0))
.add(shape(8).scale(scaler(3)).scrollX(eightSpace(3), 0).scrollY(() => sdRatio(3) , 0))
.add(shape(8).scale(scaler(4)).scrollX(eightSpace(4), 0).scrollY(() => sdRatio(4) , 0))
.add(shape(8).scale(scaler(5)).scrollX(eightSpace(5), 0).scrollY(() => sdRatio(5) , 0))
.add(shape(8).scale(scaler(6)).scrollX(eightSpace(6), 0).scrollY(() => sdRatio(6) , 0))
.add(shape(8).scale(scaler(7)).scrollX(eightSpace(7), 0).scrollY(() => sdRatio(7) , 0))
.mult(solid(sdRatio(0), sdRatio(1), sdRatio(3)))
.repeat(2,2)
.rotate(2, .2)
.out(o2)

osc(() => 1 + sdDeltaAvg(0) / 5, .01, 30)
  .contrast(10)
  .mask(shape(() => 6 + (sdRatio(3)| 0) * 3)
          .scale(2)
          .modulateRotate(o2, () => sdDeltaAvg(3), () => sdDelta(3))
          .repeat(5, 5)
          .scrollX(sdAvg(2), 0)
        )
        .add(src(o2).scrollX(.2, () => sdLast(3)).scrollY(.2, () => sdLast(3)).brightness(.2))
  .out(o2)

gradient(.1).modulateRotate(o3, () => a.fft[1] / 3, .3)
.diff(shape(3).modulate(noise(() => a.fft[0] / 10 * 3)).scale(() => a.fft[0] / 10 + 1).mult(gradient(.1).add(shape(6).modulate(noise(4)).scale(() => a.fft[1] * .5).mult(gradient(.1)))))
.modulateRotate(o3, () => a.fft[0] * .003, 5)
.add(o2)
.diff(o2)
.blend(src(o1).brightness(.2), () => sdRatio(3) / 10 + .2)
.modulateRotate(o0, () => Math.abs(sdDeltaAvg(3) / 1000))
.repeat(() => sdAvg(2) > sdLast(2) ? 2 : 4 , () => sdAvg(0) > sdLast(0) ? 2: 4)
.out(o3)

render(o3)

render()
