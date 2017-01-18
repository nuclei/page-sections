'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['<style>\n            :host{\n                display: inline-block;\n                flex: 0 1 auto;\n            }\n            :host(:not([flexible])){\n                box-sizing: border-box;\n                width: 100%;\n                min-height: 100vh;\n            }\n            :host([flexible]){\n                margin-left: 50%;\n                transform: translateX(-50%);\n            }\n        </style>\n        <slot></slot>\n  '], ['<style>\n            :host{\n                display: inline-block;\n                flex: 0 1 auto;\n            }\n            :host(:not([flexible])){\n                box-sizing: border-box;\n                width: 100%;\n                min-height: 100vh;\n            }\n            :host([flexible]){\n                margin-left: 50%;\n                transform: translateX(-50%);\n            }\n        </style>\n        <slot></slot>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
var makeTemplate = function makeTemplate(strings) {
  var html = '';

  for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substs[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < substs.length; i++) {
    html += strings[i];
    html += substs[i];
  }
  html += strings[strings.length - 1];
  var template = document.createElement('template');
  template.innerHTML = html;
  return template;
};

/* global HTMLElement Event */
(function () {
  var PageSectionItem = function (_CustomElement2) {
    _inherits(PageSectionItem, _CustomElement2);

    function PageSectionItem() {
      _classCallCheck(this, PageSectionItem);

      // by default _active is false
      var _this = _possibleConstructorReturn(this, (PageSectionItem.__proto__ || Object.getPrototypeOf(PageSectionItem)).call(this));
      // If you define a ctor, always call super() first!
      // This is specific to CE and required by the spec.


      _this._active = false;
      // Attach a shadow root to the element.
      var shadowRoot = _this.attachShadow({ mode: 'open' });
      // add content to shadowRoot & apply css polyfill
      ShadyCSS.applyStyle(_this); // eslint-disable-line no-undef
      shadowRoot.appendChild(document.importNode(template.content, true));
      return _this;
    }
    /**
     * get active state of individual section
     * @method active
     * @return {Boolean}
     */


    _createClass(PageSectionItem, [{
      key: 'connectedCallback',

      /**
       * When element is added to DOM
       */
      value: function connectedCallback() {
        // initialize activated state
        this.setActive();
      }
      /**
       * set _active property & add/remove active attr
       */

    }, {
      key: '_setActiveState',
      value: function _setActiveState(state) {
        if (this._active === state) {
          return;
        }
        // set _active property
        this._active = state === true;
        // add or remove active attribute
        if (this._active) {
          this.setAttribute('active', '');
          return;
        } else {
          this.removeAttribute('active');
        }
      }
      /**
       * set active if in viewport or unactive if not
       */

    }, {
      key: 'setActive',
      value: function setActive() {
        this._setActiveState(this._inView);

        if (this._inView) {
          if (this.active === false) {
            // set attributes
            this.setAttribute('active', '');
            this._active = true;
            // Dispatch the event.
            this.dispatchEvent(new Event('activated'));
          }
          // return true
          return true;
        }
        // set element to unactive
        if (this.active === true) {
          // set attributes
          this.removeAttribute('active');
          this._active = false;
          // Dispatch the event.
          this.dispatchEvent(new Event('deactivated'));
        }
      }
    }, {
      key: 'active',
      get: function get() {
        return this._active;
      }
      /**
       * check if element is in view
       */

    }, {
      key: '_inView',
      get: function get() {
        // get elements bounding box
        var box = this.getBoundingClientRect();
        // check if element is in view
        if (box.top >= 0 && (box.top < window.innerHeight * 0.5 || box.bottom <= window.innerHeight) || box.top < window.innerHeight * 0.5 && box.bottom > window.innerHeight * 0.5 || box.top < window.innerHeight - box.height / 1.25) {
          return true;
        }
      }
    }]);

    return PageSectionItem;
  }(_CustomElement);

  var template = makeTemplate(_templateObject);

  ShadyCSS.prepareTemplate(template, 'page-section'); // eslint-disable-line no-undef
  window.customElements.define('page-section', PageSectionItem);
})();
//# sourceMappingURL=page-section.js.map
