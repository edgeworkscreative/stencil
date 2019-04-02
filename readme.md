[![npm][npm-badge]][npm-badge-url]
[![Build Status][circle-badge]][circle-badge-url]
[![Appveyor Build status][appveyor-badge]][appveyor-badge-url]
[![BrowserStack Status][browserstack-badge]][browserstack-badge-url]
[![license][npm-license]][npm-license-url]


# Stencil: A Compiler for Web Components and PWAs

```bash
npm init stencil
```

[Stencil](https://stenciljs.com/) is a simple compiler for generating Web Components and progressive web apps (PWA). Stencil was built by the [Ionic Framework](http://ionicframework.com/) team for its next generation of performant mobile and desktop Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. It takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that runs on both [modern browsers and legacy browsers](#browser-support) back to Internet Explorer 11.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

*Note: Stencil and [Ionic](https://ionicframework.com/) are completely independent projects. Stencil does not prescribe any specific UI framework, but Ionic is the largest user of Stencil (today!)*


## Why Stencil?

Stencil is a new approach to a popular idea: building fast and feature-rich apps in the browser. Stencil was created to take advantage of major new capabilities available natively in the browser, such as Custom Elements v1, enabling developers to ship far less code and build faster apps that are compatible with any and all frameworks.

Stencil is also a solution to organizations and library authors struggling to build reusable components across a diverse spectrum of frontend frameworks, each with their own component system. Stencil components work in Angular, React, Ember, and Vue as well as they work with jQuery or with no framework at all, because they are just plain HTML elements.

Compared to using Custom Elements directly, inside of every Stencil component is an efficient Virtual DOM rendering system, JSX rendering capabilities, asynchronous rendering pipeline (like React Fiber), and more. This makes Stencil components more performant while maintaining full compatibility with plain Custom Elements. Think of Stencil as creating pre-baked Custom Elements as if you wrote in those features yourself.


## Getting Started

To create a new project using an interactive cli, run:

```bash
npm init stencil
```

To start developing your new Stencil project, run:

```bash
npm start
```


## Creating components

Stencil components are plain ES6/TypeScript classes with some decorator metadata.

Create new components by creating files with a `.tsx` extension, such as `my-component.tsx`, and place them in `src/components`.

```typescript
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css'
})
export class MyComponent {

  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, my name is {this.first} {this.last}
      </div>
    );
  }
}
```

Note: the `.tsx` extension is required, as this is the standard for TypeScript classes that use JSX.

To use this component, just use it like any other HTML element:

```html
<my-component first="Stencil" last="JS"></my-component>
```


## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the [Ionic](https://ionicframework.com/docs/) generated web components use the prefix `ion`.


## Hosting the app

Stencil components run directly in the browser through script includes just like normal Custom Elements (because they are just that!), and run by using the tag just like any other HTML component:

Here's an example `index.html` file that runs a Stencil app:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <script src="build/app.js"></script>
</head>
<body>
  <my-component first="Stencil" last="JS"></my-component>
</body>
</html>
```


## API

The API for stencil closely mirrors the API for Custom Elements v1.

### Components

| Decorator      | Description                             |
| -------------- | ---                                     |
| `@Component()` | Indicate a class is a Stencil component. |
|                |                                         |
| `@Prop()`      | Creates a property that will exist on the element and be data-bound to this component.  |
| `@State()`     | Creates a local state variable that will not be placed on the element. |
| `@Method()`    | Expose specific methods to be publicly accessible. |


## Why "Stencil?"

A Stencil is a tool artists use for drawing perfect shapes easily. We want Stencil to be a similar tool for web developers: a tool that helps web developers build powerful Web Components and apps that use them, but without creating non-standard runtime requirements.

Stencil is a tool developers use to create Web Components with some powerful features baked in, but it gets out of the way at runtime.

[Using Web Components in Ionic - Polymer Summit 2017](https://youtu.be/UfD-k7aHkQE)


## Browser Support

Web Components, specifically Custom Elements, are natively supported in Chrome and Safari and are coming to both Edge and Firefox. A dynamic polyfill loader is already included in order to only load the polyfills for the browsers that are missing specific features.

 - Chrome (and all Chromium based browsers)
 - Safari
 - Edge
 - Firefox
 - IE 11


## Polyfills

For the small minority of browsers that do not support modern browser features and APIs, Stencil will automatically polyfill them on-demand. What this means is that for browsers that already support the feature natively, they will not have to download and parse any unnecessary JavaScript. The great news is that in today's web landscape, most modern APIs are already shipping for what Stencil requires. Polyfills which are loaded on-demand include:

 - [Custom Element](https://github.com/WebReflection/document-register-element)
 - [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
 - [CSS Variables](https://github.com/webcomponents/shadycss)
 - [Promise](https://github.com/stefanpenner/es6-promise)
 - [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) *(transpiled to promises)*
 - [fetch()](https://github.com/github/fetch)
 - [URL](https://github.com/lifaon74/url-polyfill)
 - [Array.fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
 - [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
 - [Array.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
 - [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
 - [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
 - [Element.closest](https://github.com/jonathantneal/closest)
 - [Element.matches](https://github.com/jonathantneal/closest)
 - [Element.remove](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)
 - [Map/Set/WeakMap/WeakSet](https://github.com/WebReflection/es6-collections)
 - [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
 - [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
 - [Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
 - [String.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
 - [String.endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
 - [String.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)


## Related

 - [Stencil Documentation](https://stenciljs.com/)
 - [Stencil Worldwide Slack](https://stencil-worldwide.herokuapp.com)
 - [Ionic](https://ionicframework.com/)
 - [Ionic Worldwide Slack](http://ionicworldwide.herokuapp.com/)
 - [Ionicons](http://ionicons.com/)
 - [Capacitor](https://capacitor.ionicframework.com/)


## License

 - [MIT](https://raw.githubusercontent.com/ionic-team/stencil/master/LICENSE)


[npm-badge]: https://img.shields.io/npm/v/@stencil/core.svg
[npm-badge-url]: https://www.npmjs.com/package/@stencil/core
[npm-license]: https://img.shields.io/npm/l/@stencil/core.svg
[npm-license-url]: https://github.com/ionic-team/stencil/blob/master/LICENSE
[circle-badge]: https://circleci.com/gh/ionic-team/stencil.svg?style=shield
[circle-badge-url]: https://circleci.com/gh/ionic-team/stencil
[browserstack-badge]: https://www.browserstack.com/automate/badge.svg?badge_key=WVNVbkRJdDBJQnBEMzZuWUdlMEZuTjlPUm9sOHZsSVNkUlJTRkJVQkx0ST0tLTFhbk5jRUNEVWxJL1J0SVR0WUFndnc9PQ==--90c84981a2ed2ede760ca48fbfc3fdd5b71d3e5e
[browserstack-badge-url]: https://www.browserstack.com/automate/public-build/WVNVbkRJdDBJQnBEMzZuWUdlMEZuTjlPUm9sOHZsSVNkUlJTRkJVQkx0ST0tLTFhbk5jRUNEVWxJL1J0SVR0WUFndnc9PQ==--90c84981a2ed2ede760ca48fbfc3fdd5b71d3e5e
[appveyor-badge]: https://ci.appveyor.com/api/projects/status/92d75dgkohgyap5r/branch/master?svg=true
[appveyor-badge-url]: https://ci.appveyor.com/project/Ionitron/stencil/branch/master
