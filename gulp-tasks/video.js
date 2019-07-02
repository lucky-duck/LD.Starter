import gulp from 'gulp';

import PATHS from '../paths';

export default function video() {
  return gulp.src(PATHS.src.videos).pipe(gulp.dest(PATHS.build.videos));
}
