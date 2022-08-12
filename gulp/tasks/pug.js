import gulp from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import gulpif from "gulp-if";
import { setup as emittySetup } from "@zoxon/emitty";
import config from '../config.js';

const emittyPug = emittySetup(config.src.pug, "pug", {
  makeVinylFile: true,
});

global.isPugWatch = false;
global.emittyChangedFile = {
  path: "",
  stats: null,
};

export const pugBuild = () => (
  gulp.src(`${config.src.pug}/*.pug`)
    .pipe(plumber())
    .pipe(
      gulpif(
        global.isPugWatch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats,
        ),
      ),
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(`${config.dest.html}`))
);

export const pugWatch = () => {
  global.watch = true;
  gulp.watch(`${config.src.pug}/**/*.pug`, pugBuild)
  .on("all", (event, filepath, stats) => {
    global.emittyChangedFile = {
      path: filepath,
      stats,
    };
  });
};
