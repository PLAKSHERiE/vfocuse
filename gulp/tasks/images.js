import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import config from '../config.js';

const copyImages = () => (
  gulp.src(`${config.src.img}/**/*`)
    .pipe(changed(config.dest.img))
    .pipe(gulpif(config.isProd, imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      pngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),

    ]))).pipe(gulp.dest(config.dest.img))
);

const convertWebp = () => (
  gulp.src(`${config.src.img}/**/*.{jpg,png}`)
  .pipe(changed(config.dest.img, { extension: '.webp' }))
  .pipe(imagemin([
    imageminWebp({ quality: 80 }),
  ]))
  .pipe(rename({
    extname: '.webp',
  }))
  .pipe(gulp.dest(config.dest.img))
);

export const imagesBuild = gulp.series(copyImages, convertWebp);

export const imagesWatch = () => gulp.watch(`${config.src.img}/**/*`, imagesBuild);
