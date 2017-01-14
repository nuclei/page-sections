# Page Sections
A simple section solution for your single page or landing page. Vanilla js, no framework dependencies, small footprint.

[![Spec Custom Elements V1](https://img.shields.io/badge/spec-custom%20elements%20v1-F52757.svg?style=flat-square)](https://www.w3.org/TR/custom-elements/)
[![Build Status](https://img.shields.io/travis/nuclei/page-sections/master.svg?style=flat-square)](https://travis-ci.org/nuclei/page-sections) [![npm](https://img.shields.io/npm/v/page-sections.svg?style=flat-square)](https://www.npmjs.com/package/page-sections) [![npm](https://img.shields.io/npm/dt/page-sections.svg?style=flat-square)](https://www.npmjs.com/package/page-sections) [![license](https://img.shields.io/github/license/nuclei/page-sections.svg?style=flat-square)](https://github.com/nuclei/page-sections/blob/master/LICENSE)

## Demo
[Page Sections](https://nuclei.github.io/page-sections/index.html)

## Installation
```bash
npm install --save page-sections
```

You need the [webcomponents-lite polyfill](https://github.com/webcomponents/webcomponentsjs).

Load the `polyfill` and the `page-sections.js` & `page-section.js` in your html page or however you load you javascript dependencies:

```html
<script src="../node_modules/@webcomponents/custom-elements/custom-elements.min.js"></script>
<script src="../node_modules/@webcomponents/shadydom/shadydom.min.js"></script>
<script src="../node_modules/@webcomponents/shadycss/shadycss.min.js"></script>
<script src="./node_modules/page-sections/dist/page-sections.js"></script>
<script src="./node_modules/page-sections/dist/page-section.js"></script>
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
