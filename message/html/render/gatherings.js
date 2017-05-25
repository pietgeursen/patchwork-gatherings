const nest = require('depnest')
const pull = require('pull-stream')
const { h, Array, map } = require('mutant')

exports.gives = nest({
  'page.html': {
    render: true 
  },
  'message.html': {confirm: true}
})

exports.needs = nest({
  'gathering.html': {
    create: 'first',
    render: 'first'
  },
  'gathering.pull.find': 'first'
})

exports.create = function (api) {
  const route = '/gatherings'
  return nest({
    'page.html': {
      render: page
    },
    'message.html.confirm': confirm
  })
  
  function confirm() {
    
  }

  function page(path) {
    if (path !== '/gatherings') return // "/" is a sigil for "page"

    const creator = api.gathering.html.create({})
    const gatherings = Array([])

    const content = h('Gatherings', {}, [
      h('Scroller', [
        h('header'),
        h('section.actions', creator),
        h('section.main', map(gatherings, api.gathering.html.render))
      ])
    ])
    pull(
      api.gathering.pull.find(),
      pull.drain(msg => gatherings.insert(msg, 0))
    )
    return content
  }


}



