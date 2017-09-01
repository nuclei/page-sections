# Page-Sections
A simple section solution for your single page or landing page. Vanilla js, no framework dependencies, small footprint.

[![Spec Custom Elements V1](https://img.shields.io/badge/spec-custom%20elements%20v1-F52757.svg?style=flat-square)](https://www.w3.org/TR/custom-elements/)
[![Build Status](https://img.shields.io/travis/nuclei/page-sections/master.svg?style=flat-square)](https://travis-ci.org/nuclei/page-sections) [![npm](https://img.shields.io/npm/v/page-sections.svg?style=flat-square)](https://www.npmjs.com/package/page-sections)
[![Known Vulnerabilities](https://snyk.io/test/github/nuclei/page-sections/badge.svg?style=flat-square)](https://snyk.io/test/github/nuclei/page-sections) [![npm](https://img.shields.io/npm/dt/page-sections.svg?style=flat-square)](https://www.npmjs.com/package/page-sections) [![license](https://img.shields.io/github/license/nuclei/page-sections.svg?style=flat-square)](https://github.com/nuclei/page-sections/blob/master/LICENSE)

## Demo
[Page Sections](https://nuclei.github.io/page-sections/index.html)

## Installation
```bash
npm install --save page-sections
```

As the support for web components is currently still pretty spotty, you probably want to load a polyfill before loading the web component.

I recommend the [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs). To make sure the webcomponent is only loaded once the polyfill is done (when using the `webcomponents-loader.js`) you will want to wait for the `WebComponentsReady` event before loading the web component. This event is always fired, even in browser that fully support web components.

```html
<script type="text/javascript" async>
  window.addEventListener('WebComponentsReady', function () {
    let script = document.createElement('script')
    script.setAttribute('src', '../dist/page-sections.js')
    document.head.appendChild(script)
  })
</script>
```

## Usage
Add one or multiple `<page-sections></page-sections>` elements to your page. Within you can add as many `<page-section></page-section>` elements, as you want.

```html
<page-sections>
    <page-section class="anyClass">
      <div class="red">Your red copy.</div>
    </page-section>
    <page-section>
      <div class="truth">Web components are awesome.</div>
    </page-section>
    <div class="blue">Divs will be ignored</div>
    <page-section>
      <div class="wow">This is so simple.</div>
    </page-section>
</page-sections>
```

The `page-section` element is a flexbox container with a `flex-direction: column`. If you want to have items side by side you should add a wrapping container around those items.

```html
<page-section>
  <div class="grid">
    <div class="column-5">Column 1</div>
    <div class="column-5">Column 2</div>
  </div>
</page-section>
```

## Attributes
### `<page-section>`
#### requiredVisible
The `requiredVisible` attribute is a value between `0` and `1` representing the percentage that is required to be within the viewport for a `page-section to be considered visible`. If not set it will default to `0.6`.

#### centered
The `centered` attribute makes the content of a `page-section` horizontally and vertically centered. The centering is `flexbox` based so you can overwrite this behaviour if you only want the content to be centered in one direction.

#### fullscreen
If the `fullscreen` attribute is set on a `page-section`, it fills at least the entire height of the viewport (`min-height: 100vh`).

#### maxwidth
This attribute makes the content of a `page-section` not extend past the specified `max-width`. Any value that works for `max-width` will be accepted.

#### active
When the `page-section` is in view according to the `requiredVisible` attribute the `active` attribute will be added to the `page-section` element. Once it is not in view anymore it will be removed again.

#### activated
Once the `page-section` has been in view once, the `activated` attribute is added to the `page-section` element.

## Events
### `<page-section>`
#### activated
The `activated` event is fired when the `page-section` is in view according to the `requiredVisible` attribute.
#### deactivated
The `deactivated` event is fired when the `page-section` leaves the view according to the `requiredVisible` attribute.

### `<page-sections>` container
#### activated
The `activated` event is fired when the `page-sections` container is partly visible.
#### deactivated
The `deactivated` event is fired when the `page-sections` container has completely left the viewport.
