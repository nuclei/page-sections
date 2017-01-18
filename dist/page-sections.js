'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['<style>\n      :host{\n          display: flex;\n          flex-direction: column;\n          flex-wrap: nowrap;\n      }\n    </style>\n    <slot></slot>\n  '], ['<style>\n      :host{\n          display: flex;\n          flex-direction: column;\n          flex-wrap: nowrap;\n      }\n    </style>\n    <slot></slot>\n  ']);

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

/* global HTMLElement */
(function () {
  var PageSections = function (_CustomElement2) {
    _inherits(PageSections, _CustomElement2);

    function PageSections() {
      _classCallCheck(this, PageSections);

      // set sections initial active state to false
      var _this = _possibleConstructorReturn(this, (PageSections.__proto__ || Object.getPrototypeOf(PageSections)).call(this));
      // needs to be called first


      _this._active = false;
      // create shadowRoot
      var shadowRoot = _this.attachShadow({ mode: 'open' });
      // add content to shadowRoot & apply css polyfill
      ShadyCSS.applyStyle(_this); // eslint-disable-line no-undef
      shadowRoot.appendChild(document.importNode(template.content, true));
      return _this;
    }
    /**
     * get active state of parent container
     * @method active
     * @return {Boolean}
     */


    _createClass(PageSections, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        this._scrollEvent = this._scrollEvent.bind(this);
        // wrap sections
        window.addEventListener('scroll', this._scrollEvent); // bing this, so that it refers to custom element instead of window
      }
    }, {
      key: '_scrollEvent',
      value: function _scrollEvent(e) {
        clearTimeout(this._scrollEvent.fn);
        this._scrollEvent.fn = setTimeout(function () {
          this.setActive();
        }.bind(this), 10);
      }
      /**
       * check if section wrapper is in viewport
       */

    }, {
      key: '_setActiveState',

      /**
       * set _active property & add/remove active attr
       */
      value: function _setActiveState(state) {
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
      // check if a child element is in view and set it to active

    }, {
      key: 'setActive',
      value: function setActive() {
        this._setActiveState(this._inView);
        // if element is in view, active children
        if (this._inView) {
          // Get all child elements and activate visible ones
          // stop once an inactive item follows an active item
          var elements = this.querySelectorAll('page-section');
          for (var i = 0; elements.length > i; ++i) {
            elements[i].setActive();
            // abort if current element is NOT in view, but previous was in view
            if (i > 0 && elements[i].active === false && elements[i - 1].active === true) {
              return;
            }
          }
          return;
        }
      }
    }, {
      key: 'active',
      get: function get() {
        return this._active;
      }
    }, {
      key: '_inView',
      get: function get() {
        console.log('Top: ' + this.getBoundingClientRect().top);
        console.log('Bottom: ' + this.getBoundingClientRect().bottom + ', ' + window.innerHeight);
        console.log('---------');
        return this.getBoundingClientRect().bottom > 0;
      }
    }]);

    return PageSections;
  }(_CustomElement);

  var template = makeTemplate(_templateObject);

  ShadyCSS.prepareTemplate(template, 'page-sections'); // eslint-disable-line no-undef
  window.customElements.define('page-sections', PageSections);
})();
//# sourceMappingURL=page-sections.js.map
