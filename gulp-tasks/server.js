import PATHS from '../paths';

const browserSync = require('browser-sync').create();

let watchFiles = [
  PATHS.build.styles + '*.css',
  PATHS.build.html + '/*.html',
  PATHS.build.scripts + '*.js',
];

export default function server() {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    injectchanges: true,
    notify: false,
    open: false,
    port: 9000,
    logPrefix: 'LD.Starter',
    files: watchFiles,
  });
}
