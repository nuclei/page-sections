/* global HTMLElement Event */
import makeTemplate from './make-template';

(function () {
  class PageSectionItem extends HTMLElement {
    constructor () {
            // If you define a ctor, always call super() first!
            // This is specific to CE and required by the spec.
      super()
            // by default _active is false
      this._active = false
            // Attach a shadow root to the element.
      const shadowRoot = this.attachShadow({mode: 'open'})
            // add content to shadowRoot & apply css polyfill
      ShadyCSS.applyStyle(this) // eslint-disable-line no-undef
      shadowRoot.appendChild(document.importNode(template.content, true))
    }
        /**
         * get active state of individual section
         * @method active
         * @return {Boolean}
         */
    get active () {
      return this._active
    }
        /**
         * check if element is in view
         */
    get _inView () {
            // get elements bounding box
      var box = this.getBoundingClientRect()
            // check if element is in view
      if ((box.top >= 0 && (
                    box.top < window.innerHeight * 0.5 ||
                    box.bottom <= window.innerHeight)) ||
                (box.top < window.innerHeight * 0.5 && box.bottom > window.innerHeight * 0.5)
            ) {
        return true
      }
    }
        /**
         * When element is added to DOM
         */
    connectedCallback () {
            // initialize activated state
      this.setActive()
    }
        /**
         * set _active property & add/remove active attr
         */
    _setActiveState (state) {
      if (this._active === state) {
        return
      }
            // set _active property
      this._active = (state === true)
            // add or remove active attribute
      if (this._active) {
        this.setAttribute('active', '')
        return
      } else {
        this.removeAttribute('active')
      }
    }
        /**
         * set active if in viewport or unactive if not
         */
    setActive () {
      this._setActiveState(this._inView)

      if (this._inView) {
        if (this.active === false) {
                    // set attributes
          this.setAttribute('active', '')
          this._active = true
                    // Dispatch the event.
          this.dispatchEvent(new Event('activated'))
        }
                // return true
        return true
      }
            // set element to unactive
      if (this.active === true) {
                // set attributes
        this.removeAttribute('active')
        this._active = false
                // Dispatch the event.
        this.dispatchEvent(new Event('deactivated'))
      }
    }
    }

  const template = makeTemplate`<style>
            :host{
                display: inline-block;
                flex: 0 1 auto;
            }
            :host(:not([flexible])){
                box-sizing: border-box;
                width: 100%;
                min-height: 100vh;
            }
            :host([flexible]){
                margin-left: 50%;
                transform: translateX(-50%);
            }
        </style>
        <div class="o-page-section">
            <slot></slot>
        </div>`

  ShadyCSS.prepareTemplate(template, 'page-section') // eslint-disable-line no-undef
  window.customElements.define('page-section', PageSectionItem)
})()
