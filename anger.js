(() => {
  let globalBeatCount = 0
  let measureMod = 0
   window.zorp = {
     globalBeatCount: globalBeatCount,
     measureMod: measureMod
   }
   let lastTime = 0
  let callback = (timestamp) =>
    {
      window.requestAnimationFrame(callback)
      console.log('called')
     if (lastTime == 0) {
       lastTime = timestamp
       return
     }
     let bpmMS = 60 * 1000 / 120
     let delta = timestamp - lastTime
     if (delta < bpmMS) {
       return
     }
     beatsToAdd = Math.floor(bpmMS / delta) | 0
     globalBeatCount += beatsToAdd
     lastTime += beatsToAdd * bpmMS
     measureMod = globalBeatCount % 4
     if (measureMod == 0) {
       shape(3).scale(() => a.fft[0] * .1).out(o0)
     }else {
       shape(() => 3 + measureMod).scale(() => a.fft[0]).out(o0)
     }
   }
   window.requestAnimationFrame(callback)
   window.zorp.resetBeatCount = () => globalBeatCount = 0
})()


bpm(120)

a.detectBeat()

shape([3,6]).scale(() => a.fft[0] * .1).out(o0)
