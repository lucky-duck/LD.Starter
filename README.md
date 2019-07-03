# Street

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

#### 2. Run Gulp for development:

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

## Nunjucks HTML template engine

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful HTML template engine with a syntax similar to jinja2. Nunjucks alleviates writing highly-maintainable HTML code.

Nunjucks templates seat in `src/media/templates/` folder.

Keep the data that can be used in multiple places inside `global-data.json` file. This file is located in the root directory.

For example, if you have some data in `global-data.json`:

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

## Useful links

[Nunjucks syntax](https://mozilla.github.io/nunjucks/templating.html).

[Twitter Bootstrap responsive grid](http://getbootstrap.com/css/#grid).
