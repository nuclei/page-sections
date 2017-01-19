const makeTemplate = function (strings, ...substs) {
  var html = ''
  for (let i = 0; i < substs.length; i++) {
    html += strings[i]
    html += substs[i]
  }
  html += strings[strings.length - 1]
  var template = document.createElement('template')
  template.innerHTML = html
  return template
}
/**
 * export make template function
 */
module.exports = makeTemplate
