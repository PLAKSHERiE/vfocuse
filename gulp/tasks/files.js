import gulp from "gulp";
import config from "../config.js";

const filesHandler = () => (
    gulp.src(`${config.src.files}/*`)
        .pipe(gulp.dest(config.dest.files))
);

const filesHandlerToRoot = () => (
    gulp.src(`${config.src.files}/root/*`, { dot: true })
        .pipe(gulp.dest(config.dest.root))
);

const phpHandler = () => (
    gulp.src(`${config.src.php}/**/*`)
        .pipe(gulp.dest(config.dest.php))
);

export const filesBuild = gulp.parallel(filesHandler, filesHandlerToRoot, phpHandler);

export const filesWatch = () => gulp.watch(`${config.src.files}/**/*`, filesHandler, filesHandlerToRoot);
export const phpWatch = () => gulp.watch(`${config.src.php}/**/*`, phpHandler, filesHandlerToRoot);
