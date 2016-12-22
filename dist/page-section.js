'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageSectionItem = function (_HTMLElement) {
    _inherits(PageSectionItem, _HTMLElement);

    function PageSectionItem() {
        _classCallCheck(this, PageSectionItem);

        // create shadowRoot
        var _this = _possibleConstructorReturn(this, (PageSectionItem.__proto__ || Object.getPrototypeOf(PageSectionItem)).call(this));
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.


        var shadowRoot = _this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = '\n        <style>\n            :host{\n                display: inline-block;\n                flex: 0 1 auto;\n            }\n            :host(:not([flexible])){\n                box-sizing: border-box;\n                width: 100%;\n                min-height: 100vh;\n            }\n            :host([flexible]){\n                margin-left: 50%;\n                transform: translateX(-50%);\n            }\n        </style>\n        <slot></slot>\n        ';
        return _this;
    }
    // set active


    _createClass(PageSectionItem, [{
        key: 'setActive',
        value: function setActive() {
            if (this._inView()) {
                this.setAttribute('active', '');
            }
        }
        // set unactive

    }, {
        key: 'setUnactive',
        value: function setUnactive() {
            if (this._inView()) {
                this.removeAttribute('active', '');
            }
        }
        // check if element is in view

    }, {
        key: '_inView',
        value: function _inView(windowHeight) {
            // get elements bounding box
            var box = this.getBoundingClientRect();
            // check if element is in view
            if (box.top >= 0 && (box.top < window.innerHeight * .5 || box.bottom <= window.innerHeight) || box.top < window.innerHeight * .5 && box.bottom > window.innerHeight * .5) {
                return true;
            }
        }
    }]);

    return PageSectionItem;
}(HTMLElement);

window.customElements.define('page-section', PageSectionItem);
//# sourceMappingURL=page-section.js.map
