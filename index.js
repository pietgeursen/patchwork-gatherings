const bulk = require('bulk-require')
var combine = require('depject')
var fs = require('fs')
var path = require('path')
var compile = require('micro-css')
var insertCss = require('insert-css')
var result = ''
var additional = ''


const modules = bulk(__dirname, ['!(node_modules|test.js|util|*.test.js)/**/*.js'], {require: function (module) {
  return module.match(/(.*.test.js$)/) ? null : require(module)
}})

fs.readFile(path.join(__dirname, 'gatherings/style.mcss'), 'utf8', (err, res) => {
  if(err)return 'fuck'
  insertCss(compile(res))
})

module.exports = {'patchwork-gatherings': modules}
