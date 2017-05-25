const path = require('path')
const { basename } = path
const readDirectory = require('read-directory')
const { each } = require('libnested')

const contents = readDirectory.sync(path.join(__dirname, '..'), {
  extensions: false,
  filter: '**/*.mcss',
  ignore: '**/node_modules/**'
})

module.exports = function mcss (sofar = {}) {
  each(contents, (content, [filename]) => {
    const name = 'patchwork-gatherings-' + basename(filename)
    sofar[name] = content
  })

  console.log(sofar)
  return sofar
}
