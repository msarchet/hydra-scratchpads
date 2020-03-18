
//seq one
solid().out(o1)
solid().out(o2)
solid().out(o3)
solid().out(o4)

render()

osc(() => window.getMidiNote(1, 24).on ? 12 : 10, 0, .2)
.add(noise(() => window.getMidiNote(1, ))
.out(o0)
