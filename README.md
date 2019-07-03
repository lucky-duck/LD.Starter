# LD.Starter

## Getting started

#### 1. Install dependencies:

With `yarn` (quicker)

```
yarn install
```

or with `npm` (slower):

```
npm install
```

#### 2. Run the project for development:

```
yarn start
```

or

```
npm start
```

#### 3. Open development URL - [`http://localhost:9000/`](http://localhost:9000/).

## Scripts

#### Running the project for development:

```
yarn start
```

#### Build the project for production:

```
yarn build
```

#### Creating a production-ready zip-archive `build.zip`:

```
yarn zip
```

## Project Structure

It's not mandatory but considered effective for many reasons to decompose the UI into separate, less coupled components.

Create components at least for the parts of the UI that appear in multiple places of your project. It can be buttons, common page sections, widgets, sliders and so on.

It is recommended that you will keep your components inside the `src/media/components/` folder. This starter kit allows you to keep your markup, styles, and JavaScript code for a component in one folder and then to use them in multiple places. Please, see the `src/media/components/` folder for examples. Notice how different types of components are arranged. Also, It is not absolutely mandatory to include Nunjucks or JS code for a component if you feel that it doesn't make too much sense. For example, when the markup is quite simple or when a component doesn't have JS logic.

## Nunjucks HTML template engine

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful HTML template engine with a syntax very similar to jinja2. Nunjucks alleviates writing highly-maintainable HTML code.

Nunjucks templates seat in `src/media/templates/` folder.

Keep the data that can be used in multiple places inside the `global-data.json` file. This file is located in the root directory.

For example, if you have some data in the `global-data.json`:

```
someData: [
  {
    "title": "Hello"
  }
]
```

then you can get it the following way inside Nunjucks templates:

```
<p>Some title: {{ someData[0].title }}</p>
```

The page templates that should be compiled to HTML files (and which will be inside the `build/` directory) have to be kept inside the `src/media/templates/pages/` directory.

Custom Nunjucks filters, marcos, functions put in the corresponding files inside `src/media/templates/lib/`. You can read more about using them in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/getting-started.html).

To use Nunjucks more effectively, please, read its [documentation](https://mozilla.github.io/nunjucks/templating.html).

Also, don't forget to add syntax highlighting for you code editor. If your editor doesn't support Nunjucks syntax, you can use syntax highlighting for Twig template engine instead. Just set up opening .nunj files with Twig syntax highlighting for that.

## Webpack Hot Module Replacement

LD.Starter has a support for [Webpack HMR](https://webpack.js.org/concepts/hot-module-replacement/).

<b>Important!</b> For correct work of HMR you need to handle the side-effects in your JS code.

For example, if you have the code that adds a click event handler:

`document.body.addEventListener('click', this.someMethod);`

then you need to add the following code in order to make Webpack handle this side-effect correctly on module replacement:

```
// Deleting the event handler so that it wouldn't be added twice  after you changed your code
if (module.hot) {
	module.hot.dispose(() => {
		document.body.removeEventListener('click', this.someMethod);
	});
}
```

In the same manner you have to handle all side-effects. For example for DOM mutations:

```
var sideEffectNode = document.createElement("div");
sideEffectNode.textContent = "Side Effect";
document.body.appendChild(sideEffectNode);
```

And now we're adding this code on dispose action:

```
// Removing the <div> element, so that it wouldn't be added twice after module replacement.
if (module.hot) {
  module.hot.dispose(function() {
    sideEffectNode.parentNode.removeChild(sideEffectNode);
  });
}
```

## The SVG sprite

It is possible to automatically keep your SVG files for the project inside a single SVG sprite with the [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) plugin. So that it's better to add SVG files to the project in the following way:

```
<svg><use xlink:href="#icon-some-vector-image"></use></svg>
```

Keep in mind that, in doing so, the SVG file `some-vector-image.svg` should located in the `src/media/svg` directory. You can also set, for example, `fill` or `stroke` to this element on the page, provided that these attributes are not set inside the SVG file.

## The sprite file for raster images

You can use the following mixin in SASS code for making the raster sprite:

```
+s('some-image')
```

For retina images, you can use the `sr` mixin. Please, keep in mind that you need to have two images in this case `some-image.png` and `some-image@2x.png`:

```
+sr('some-image')
```

The images should be kept inside the `src/media/img/sprites` in `png` format.

## Inlining images or SVG into HTML or CSS

<b>Attention!</b> The files, which should be inlined, have to seat in the `src/media/img/inline` directory.

### В SASS

The `postcss-assets` plugin allows to inline images into CSS code in Base64 encoding and as is for SVG files:

```
background: inline('some-image.png')
```

The plugin also can insert an image sizes:

```
width: width('some-image.png')
```

```
height: height('some-image.png')
```

```
background-size: size('some-image.png')
```

### Inside Nunjucks templates

```
<img src="{% inline 'some-image.png' %}" alt="Some image" />
```

## Useful links

[Nunjucks syntax](https://mozilla.github.io/nunjucks/templating.html).

[Twitter Bootstrap responsive grid](http://getbootstrap.com/css/#grid).
