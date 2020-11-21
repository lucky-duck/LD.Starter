import gulp from 'gulp';
import nunjucksRender from 'gulp-nunjucks-api';
import notifier from 'node-notifier';
import plumber from 'gulp-plumber';
import beautify from 'gulp-jsbeautifier';
import minifyInline from 'gulp-minify-inline-scripts';
import gulpif from 'gulp-if';
import log from 'fancy-log';
import colors from 'ansi-colors';
import htmlValidator from 'gulp-w3c-html-validator';
import through2 from 'through2';

import { PRODUCTION } from '../config';
import PATHS from '../paths';
import * as extensions from '../src/assets/templates/lib/extensions.js';
import filters from '../src/assets/templates/lib/filters.js';
import functions from '../src/assets/templates/lib/functions.js';

export default function html() {
  delete require.cache[require.resolve('../global-data.json')];
  const globalData = require('../global-data.json');

  return gulp
    .src(PATHS.src.nunj)
    .pipe(
      plumber({
        errorHandler: function (err) {
          log.error(colors.red(err.message));
          notifier.notify({
            title: 'Nunjucks Compilation Error',
            message: err.message,
          });
        },
      })
    )
    .pipe(
      nunjucksRender({
        src: PATHS.src.templates,
        data: Object.assign(
          {
            DEVELOP: !PRODUCTION,
          },
          globalData
        ),
        extensions,
        filters,
        functions,
        trimBlocks: true,
        lstripBlocks: true,
        autoescape: false,
      })
    )
    .pipe(htmlValidator({ skipWarnings: true }))
    .pipe(
      through2.obj((file, encoding, callback) => {
        callback(null, file);
        if (!file.w3cjs.success) {
          const filename = file.history[0].split('/').slice(-1);
          const errorTitle = 'HTML validation error(s) found';
          if (PRODUCTION) {
            throw new Error(errorTitle);
          }
          notifier.notify({
            title: errorTitle,
            message: file.w3cjs.messages
              .map((v) => `${filename}: ${v.message}`)
              .join('\n'),
          });
        }
      })
    )
    .pipe(
      gulpif(
        PRODUCTION,
        beautify({
          max_preserve_newlines: 1,
          wrap_line_length: 0,
          indent_size: 2,
        })
      )
    )
    .pipe(gulpif(PRODUCTION, minifyInline()))
    .pipe(gulp.dest(PATHS.build.html));
}
