import gulp from 'gulp';
// import sass from 'gulp-sass';

import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import groupmedia from 'gulp-group-css-media-queries';
import cleancss from 'gulp-clean-css';
import rename from 'gulp-rename';
// import smartGrid from 'smart-grid';
// import importFresh from 'import-fresh';
import gulpif from 'gulp-if';
import sassGlob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import config from '../config.js';

const sass = gulpSass(dartSass);

// const SMART_GRID_CONFIG_NAME = 'smart-grid-config.js';

const cssBuild = () => (
  gulp.src(`${config.src.css}/**/*`)
    .pipe(plumber())
    .pipe(gulp.dest(config.dest.css))
);

const sassBuild = () => (
  gulp.src(`${config.src.sass}/main.scss`, { sourcemaps: config.isDev })
  .pipe(plumber())
  .pipe(sassGlob())
  .pipe(sass({
    includePaths: ['./node_modules'],
  }).on('error', sass.logError))
  .pipe(gulpif(config.isProd, groupmedia()))
  .pipe(gulpif(config.isProd, autoprefixer()))
  .pipe(gulpif(config.isProd, cleancss({ level: 2 })))
  .pipe(rename({
    suffix: ".min",
  }))
  .pipe(gulp.dest(config.dest.css, { sourcemaps: config.isDev }))
);

// const smartGridBuild = (callback) => {
//   const smartGridConfig = importFresh(`../../${SMART_GRID_CONFIG_NAME}`);
//   smartGrid(`${config.src.sass}/generated`, smartGridConfig);

//   callback();
// };

// export const stylesBuild = gulp.series(smartGridBuild, sassBuild, cssBuild);
export const stylesBuild = gulp.series(sassBuild, cssBuild);

export const stylesWatch = () => {
  gulp.watch(`${config.src.sass}/**/*.scss`, sassBuild);
  gulp.watch(`${config.src.css}/**/*`, cssBuild);
  // gulp.watch(`./${SMART_GRID_CONFIG_NAME}`, smartGridBuild);
};
