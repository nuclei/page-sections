/* global HTMLElement */
(function () {
  let makeTemplate = require('./make-template')

  class PageSections extends HTMLElement {

    constructor () {
            // needs to be called first
      super()
      var template = makeTemplate`<style>
          :host{
              display: flex;
              flex-direction: column;
              flex-wrap: nowrap;
          }
        </style>
        <slot></slot>
      `
      // set sections initial active state to false
      this._active = false
      // create shadowRoot
      var shadowRoot = this.attachShadow({mode: 'open'})
      // check if polyfill is used
      if (typeof ShadyCSS !== 'undefined') {
        ShadyCSS.prepareTemplate(template, 'page-sections') // eslint-disable-line no-undef
        // add content to shadowRoot & apply css polyfill
        ShadyCSS.applyStyle(this) // eslint-disable-line no-undef
      }
      shadowRoot.appendChild(document.importNode(template.content, true))
    }
        /**
         * get active state of parent container
         * @method active
         * @return {Boolean}
         */
    get active () {
      return this._active
    }

    connectedCallback () {
      this._scrollEvent = this._scrollEvent.bind(this)
      // wrap sections
      window.addEventListener('scroll', this._scrollEvent) // bing this, so that it refers to custom element instead of window
      // initialize activated state
      setTimeout(function () {
        this.setActive()
      }.bind(this), 10)
    }

    _scrollEvent (e) {
      clearTimeout(this._scrollEvent.fn)
      this._scrollEvent.fn = setTimeout(function () {
        this.setActive()
      }.bind(this), 10)
    }
    /**
     * check if section wrapper is in viewport
     */
    get _inView () {
      return this.getBoundingClientRect().bottom > 0 && this.getBoundingClientRect().top < window.innerHeight
    }
    /**
     * set _active property & add/remove active attr
     */
    _setActiveState (state) {
      // set _active property
      this._active = (state === true)
      // add or remove active attribute
      if (this._active) {
        this.setAttribute('active','')
        return
      } else {
        this.removeAttribute('active')
      }
    }
    // check if a child element is in view and set it to active
    setActive () {
      this._setActiveState(this._inView)
      // if element is in view, active children
      if (this._inView) {
        // Get all child elements and activate visible ones
        // stop once an inactive item follows an active item
        var elements = this.querySelectorAll('page-section')
        for (var i = 0; elements.length > i; ++i) {
          elements[i].setActive()
          // abort if current element is NOT in view, but previous was in view
          if (i > 0 && elements[i].active === false && elements[i - 1].active === true) {
            return
          }
        }
        return
      }
    }
  }
  module.exports = PageSections
  // window.customElements.define('page-sections', PageSections)
})()
