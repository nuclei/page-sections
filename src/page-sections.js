(function () {
  const PageSectionContainer = require('./page-section-container')
  const PageSection = require('./page-section')

  window.customElements.define('page-sections', PageSectionContainer)
  window.customElements.define('page-section', PageSection)
})()
