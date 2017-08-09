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
    <page-section class="anyClass"><div class="red">Your red copy.</div></page-section>
    <page-section><div class="truth">Web components are awesome.</div></page-section>
    <div class="blue">Divs will be ignored</div>
    <page-section><div class="wow">This is so simple.</div></page-section>
</page-sections>
```

### src
You can add a `src` attribute to a `page-section` to have it `fetch` the resource (which must return some kind of text, e.g. html) and insert it into itself.

This is using `fetch`, so if you want to support browser without `fetch` you will need to include a polyfill.
