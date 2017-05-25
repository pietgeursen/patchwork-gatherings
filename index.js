const bulk = require('bulk-require')
var combine = require('depject')
var fs = require('fs')
var path = require('path')
var compile = require('micro-css')
const mcssObject = require('./gatherings/styles')()
var insertCss = require('insert-css')

const modules = bulk(__dirname, ['!(node_modules|test.js|util|*.test.js)/**/*.js'], {require: function (module) {
  return module.match(/(.*.test.js$)/) ? null : require(module)
}})

const mcss = Object.keys(mcssObject).map(k => mcssObject[k]).join('\n')
insertCss(compile(mcss))

module.exports = {
  'patchwork-gatherings': modules,
  'patch-gatherings': require('patch-gatherings')
}
