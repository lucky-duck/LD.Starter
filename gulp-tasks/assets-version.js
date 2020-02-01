import gulp from 'gulp';
import PATHS from '../paths';
import { PRODUCTION } from '../config';

const replace = require('gulp-replace');
const fs = require('fs');
const md5File = require('md5-file');

const buildPath = PATHS.build.html.replace(/\/$/, '');

export default function assetsVersion() {
  let checkedFiles = [];

  return gulp
    .src(buildPath + '/**/*.html')
    .pipe(
      replace(/([\w\/]+\.[js|css]+\?)hash/gi, function(match) {
        let assetPath = __dirname;

        assetPath = assetPath.replace('gulp-tasks', buildPath);

        const assetPathHasSlash =
          assetPath.charAt(assetPath.length - 1) === '/';
        const matchHasSlash = match.charAt(0) === '/';

        if (assetPathHasSlash && matchHasSlash) {
          assetPath = assetPath + match.substring(1);
        } else if (!assetPathHasSlash && !matchHasSlash) {
          assetPath = assetPath + '/' + match;
        } else {
          assetPath += match;
        }
        assetPath = assetPath.substring(0, assetPath.indexOf('?'));

        let hash = '';
        let isRealHash;
        if (fs.existsSync(assetPath)) {
          hash = md5File.sync(assetPath);
          isRealHash = true;
        } else {
          hash = parseInt(Math.random() * new Date(), 10);
          isRealHash = false;
        }

        if (checkedFiles.indexOf(assetPath) < 0) {
          checkedFiles.push(assetPath);
          console.log(
            `${assetPath} ${isRealHash ? 'real' : 'fake'} hash added: ${hash}`
          );
        }

        let res = match.replace('hash', '');
        res = PRODUCTION ? res + hash : res.replace('?', '');
        return res;
      })
    )
    .pipe(gulp.dest(buildPath));
}
