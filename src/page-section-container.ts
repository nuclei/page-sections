/* global HTMLElement CustomEvent pageSection */
'use strict'

declare const ShadyCSS // eslint-disable-line no-unused-vars
let template = document.createElement('template')
template.innerHTML = `<style>
  :host{
    display: flex;
    flex-direction: column;
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

export class PageSections extends HTMLElement { // eslint-disable-line no-unused-vars
  constructor () {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super()
    // create shadowRoot
    let shadowRoot = this.attachShadow({mode: 'open'})
    // check if polyfill is used
    if (typeof ShadyCSS !== 'undefined') {
      ShadyCSS.prepareTemplate(template, 'page-sections') // eslint-disable-line no-undef
      // apply css polyfill
      ShadyCSS.styleElement(this) // eslint-disable-line no-undef
    }
    // add content to shadowRoot
    shadowRoot.appendChild(document.importNode(template.content, true))
    // setup scroll event to check for active elements
    let element = this
    let fn
    window.addEventListener('scroll', function () {
      clearTimeout(fn)
      fn = setTimeout(function () {
        element.setActiveState()
      }, 10)
    })
  }

  /**
  * @method connectedCallback
  * @description When element is added to DOM
   */
  connectedCallback () {
    let element = this
    // initialize activated state
    setTimeout(function () {
      element.setActiveState()
    }, 1)
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
   * @method next
   * @description jump to next page section
   */
  public next () {
    let next = this.getActiveSection().nextElementSibling as pageSection
    while (next !== null && next.isPageSection !== true) {
      next = next.nextElementSibling as pageSection
    }
    if (next !== null && next.isPageSection) {
      next.scrollIntoView({ behavior: 'smooth' })
    }
  }
  /**
   * @method previous
   * @description jump to previous page section
   */
  public previous () {
    let previous = this.getActiveSection(true).previousElementSibling as pageSection
    while (previous !== null && previous.isPageSection !== true) {
      previous = previous.previousElementSibling as pageSection
    }
    if (previous !== null && previous.isPageSection) {
      previous.scrollIntoView({behavior: 'smooth'})
    }
  }
  /**
   * @method goTo
   * @description jump to specified page section
   */
  public goTo (sectionName: string): void {
    // get desired section
    let section = this.querySelector('page-section[name=' + sectionName + ']')
    // abort if section doesn't exists or is already active
    if (!section || section.hasAttribute('active')) return
    // otherwise move to section
    section.scrollIntoView({behavior: 'smooth'})
  }
  /**
   * @method getActiveSection
   * @description get the current active section from within this element
   * @param top (default: false) if true, the first active section will be returned, else the last
   */
  public getActiveSection (top: boolean = false): pageSection {
    let activeItems = Array.from(this.querySelectorAll('page-section[active]'))
    if (top === false) {
      return activeItems[activeItems.length - 1] as pageSection
    }
    return activeItems[0] as pageSection
  }
  /**
   * @method getter isPageSections
   * @description tells that it is a isPageSections
   */
  get isPageSections () {
    return true
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
  /**
   * @method _inView
   * @description check if element is in view
   */
  get _inView () {
    return this.getBoundingClientRect().bottom > 0 && this.getBoundingClientRect().top < window.innerHeight
  }
}
