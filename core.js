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
  return () => Math.min(max, Math.max(min, a.fft[channel] / 10 /*normalize */))
}
getFFT = channel => { return () => a.fft[channel] }
a.setScale(1)
a.setBins (8)
a.settings[0].cutoff = 1
a.settings[0].smoothing = true
a.settings[1].cutoff = 3
a.settings[1].smoothing = true
a.settings[2].cutoff = 3
a.settings[2].smoothing = true
a.settings[3].cutoff = 1
a.settings[4].cutoff = 2
a.settings[5].cutoff = 3
a.settings[5].smoothing = true
a.settings[6].cutoff = 3
a.settings[6].smoothing = true
a.settings[7].cutoff = 3
a.settings[7].smoothing = true
a.show()

// FFT Analysis
(() => {
  window.cancels.forEach(window.clearTimeout)
  window.cancels = []
  window.fftMovingAvgs = {}
  for(var i = 0; i < 8; i++){
    window.fftMovingAvgs[i] = { avg: 0, bins: [0, 0, 0, 0, 0], last: 0, delta:0 , max: 0, runningTotal: 0, deltaBins: [0,0,0,0,0] }
  }
  window.fftAvgs = []
})()

(() => {
  //clear timers first
  window.cancels.forEach(window.clearTimeout)
  window.cancels = []
   let sampler = () => {
     for(var i = 0; i < 8; i++){
       let samples = window.fftMovingAvgs[i]
       samples.bins.shift()
       samples.bins.push(a.fft[i])
       samples.avg = samples.bins.reduce((agg, val, index) => agg += val / 5, 0)
       samples.deltaBins.shift()
       samples.delta = (samples.last || a.fft[i]) - a.fft[i]
       samples.deltaBins.push(samples.delta)
       samples.deltaAvg = samples.deltaBins.reduce((agg, val, index) => agg += val / 5, 0)
       samples.last = a.fft[i]
       samples.ratio = a.fft[i] / Math.max(0.0001, samples.avg)
       samples.max = Math.max(samples.max, a.fft[i])
       samples.runningTotal += (samples.delta / samples.ratio)
       fftAvgs[i] = samples.avg
     }
     window.cancels.push(window.setTimeout(() => sampler(), 50))
  }
   window.cancels.push(window.setTimeout(() => sampler(), 50))
})()

// clear all the timers that are measuring
(() => {
  window.cancels.forEach(window.clearTimeout)
  window.cancels = []
} )()


// midi support
// first run this for hydra to set the window function to handle midi
(() =>
{
  window.midiStorage = { channels: {}}
  window.processMidi = (midiMessage) =>
{
    let parts = midiMessage.data
    let noteOn = false
    let channel = 0
    let callOnNote = false
    console.log(parts)
    // parse
    if (parts[0] >= 144) {
      channel = parts[0]-144
      noteOn = true
    } else {
      channel = parts[0] - 128
    }
    let note = parts[1]
    let velocity = parts[2]
    // create channels
    if (!midiStorage.channels[channel]) {
      midiStorage.channels[channel] = { notes: { } }
    }
    console.log(midiStorage.channels[channel])
    //create note
    let channelStorage = midiStorage.channels[channel]
    console.log(channelStorage.notes)
    if (!channelStorage.notes[note]) {
      channelStorage.notes[note] = {on: false, velocity: 0, onNote: []}
    }
    // set note
    let noteStorage = channelStorage.notes[note]
    noteStorage.on = noteOn
    noteStorage.velocity = velocity
    noteStorage.onNote.map(f => f(noteStorage))
  }
  //
})()
(() => {
   window.getMidiNote = (channel, note) => {
     if (window.midiStorage.channels[channel] && window.midiStorage.channels[channel].notes[note]) {
       return window.midiStorage.channels[channel].notes[note]
     }
   }
})()
window.navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);
function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = window.processMidi;
    }
}
function onMIDIFailure() { console.error('midi failed')}
