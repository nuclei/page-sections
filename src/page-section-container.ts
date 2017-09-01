/* global HTMLElement CustomEvent */
'use strict'

import { makeTemplate } from '../node_modules/make-template/dist/makeTemplate.js'
declare const ShadyCSS // eslint-disable-line no-unused-vars

let template = makeTemplate`<style>
    :host{
        display: inline-block;
        flex: 0 1 auto;
        box-sizing: border-box;
        width: 100%;
        height: auto;
        min-height: 100vh;
        align-self: center;
    }
  </style>
  <slot></slot>
`

export class PageSectionContainer extends HTMLElement { // eslint-disable-line no-unused-vars
  constructor () {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super()
    // create shadowRoot
    let shadowRoot = this.attachShadow({mode: 'open'})
    // check if polyfill is used
    if (typeof ShadyCSS !== 'undefined') {
      ShadyCSS.prepareTemplate(template, 'page-section-container') // eslint-disable-line no-undef
      // apply css polyfill
      ShadyCSS.styleElement(this) // eslint-disable-line no-undef
    }
    // add content to shadowRoot
    shadowRoot.appendChild(document.importNode(template.content, true))
  }

  /**
  * @method connectedCallback
  * @description When element is added to DOM
   */
  connectedCallback () {
    let element = this
    var fn
    // setup scroll event to check for active elements
    window.addEventListener('scroll', function () {
      clearTimeout(fn)
      fn = setTimeout(function () {
        element.setActiveState()
      }, 10)
    })
    // initialize activated state
    setTimeout(function () {
      element.setActiveState()
    }, 1)
  }
  /**
   * @method _inView
   * @description check if element is in view
   */
  get _inView () {
    return this.getBoundingClientRect().bottom > 0 && this.getBoundingClientRect().top < window.innerHeight
  }
  /**
   * @method setActiveState
   * @description set _active property & add/remove active attr
   */
  public setActiveState () {
    if (this._inView) {
      this._setActive()
      // Get all child elements and activate visible ones
      // stop once an inactive item follows an active item
      Array.prototype.slice.call(this.querySelectorAll('page-section')).map(function (item, index, array) {
        item.parent = item
        item.setActiveState()
        // abort if current element is NOT in view, but previous was in view
        // if (index > 0 && !item.hasAttribute('active') && array[index - 1].hasAttribute('active')) {
        //   return
        // }
      })
    } else {
      this._setUnactive()
    }
  }
  /**
   * _setActive
   */
  private _setActive () {
    if (this.hasAttribute('active')) return
    // set attribute
    this.setAttribute('active', '')
    // Dispatch the event.
    this.dispatchEvent(new CustomEvent('activated'))
  }
  /**
   * _setUnactive
   */
  private _setUnactive () {
    // set 'wasActivated' attribute, if element was active
    if (this.hasAttribute('active') && !this.hasAttribute('activated')) {
      this.setAttribute('activated', '')
    }
    // remove 'active' attribute
    this.removeAttribute('active')
    // Dispatch the event.
    this.dispatchEvent(new CustomEvent('deactivated'))
  }
}
