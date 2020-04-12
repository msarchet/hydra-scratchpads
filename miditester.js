window.button1440 && window.button1440()
window.button1440 = createMidiButton("aa", 144, 0,
  // on
  () => {
      window.setDeviceOneColor(0, 0, (16 * 1) + 0 + 12)
      solid(1, 1, 0, 1).out(o0)
  },
 // off
 () => {
      window.setDeviceOneColor(0, 0, 15)
   solid(0, 0, 1, 1).out(o0)
 })


 shape(() => getNote(144, 1).on ? 3 : 6).mask(o0).out(o1)

 render(o1)


 window.controllerInput = null;
 window.outputs = []
 window.inputs = []
 navigator.requestMIDIAccess()
  .then(function(access) {
     // Get lists of available MIDI controllers
     const outputs = access.outputs.values()
    for (let i = outputs.next(); i && !i.done; i = outputs.next()) {
      window.outputs.push(i.value)
    }
    const inputs = access.inputs.values()
    for (let i = inputs.next(); i && !i.done; i = inputs.next()) {
      window.inputs.push(i.value)
    }
  })

  const noteOn = 144
  const noteOff = 128
  window.setButtonColor = (device, row, column, color, on = true) =>
  {
      if (window.outputs.length >= device && window.outputs[device])
      {
          let output = window.outputs[device]
          output.send([on ? noteOn : noteOff, 16 * row + column, color])
      }
  }
  window.setDeviceOneGreen = (row, column) => () => window.setButtonColor(0, row, column, 60, true)
  window.setDeviceOneOff = (row, column) => () => window.setButtonColor(0, row, column, 60, false)
  window.setDeviceOneColor = (row, column, color) => window.setButtonColor(0, row, column, color, true)

window.outputs[0].send([0xB0, 0, 0])


window.iterateButtons = (action) => {
  for(var row = 0; row < 8; row++)
  for (var column = 0; column < 8; column++)
  {
      {
        action(row, column)
      }
  }
}

// color the panel
let green = 3
let red = 0
let mode = 12
window.iterateButtons((row, column) => window.setButtonColor(0, row, column, makecolor(green, red, mode)))

// calculatesNote
window.rcToNote = (row, column) => (row * 16) + column
// make color for button
window.makecolor = (greenBrightness, redBrightness, mode = 12) => (16 * greenBrightness) + redBrightness + mode

window.removers && window.removers.forEach(f => f())
window.buttonActions = window.buttonActions || {}
window.removers = []
window.iterateButtons((row, column) => {
  let id = getId(row, column)
  let remover = createMidiButton(id, 144, rcToNote(row, column),
   () => {
     console.log(buttonActions[id])
     buttonActions[id] && buttonActions[id].on.forEach(a => a())
   }
   ,() => {
     buttonActions[id] && buttonActions[id].off.forEach(a => a())
   })
   removers.push(remover)
})

window.getId = (row, column) => `${row}x${column}`
window.w = f => () => f()

window.iterateButtons((r, c) => {
  window.buttonActions[getId(r, c)] = {
    on: [setDeviceOneGreen(r,c), w(() => shape(() => r * c / c).out(o0))],
    off: [setDeviceOneOff(r,c)]
  }
})

window.outTo0 = t => t.out(o0)

window.getRootTexture = () => {
    let note1 = getMidiNote(144, rcToNote(7, 0))
    let note2 = getMidiNote(144, rcToNote(7, 2))
    let note3 = getMidiNote(144, rcToNote(7, 3))
    if (note1.on)
    {
        return window.shape(3)
    }
    if (note2.on)
    {
        return window.solid(1,0,1,1)
    }
    if (note3.on)
    {
        return window.gradient(1, 1, 1, 1)
    }
    return window.noise(1.2)
}

window.buttonActions[getId(0, 0)] = {
  on:[
      setDeviceOneGreen(0,0),
      w(outTo0(solid().add(src(() => getRootTexture()))))
  ],
  off:[
      setDeviceOneOff(0,0),
      () => solid(0, 1, 0, 1).out(o0)
  ]
}

window.buttonActions[getId(7,7)] = {
  on: [w(window.render)], off: [w(window.render)]
}
