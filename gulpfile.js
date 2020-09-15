const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const jsmin = require('gulp-uglify');

// Images

const images = () => {
  return gulp.src("build/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]));
}

exports.images = images;

// Sprite

const sprite = () => {
  return gulp.src("build/img/**/icon-s-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build"));
}

exports.sprite = sprite;

// Webp

const makewebp = () => {
  return gulp.src("build/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.makewebp = makewebp;

// Scripts

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(jsmin())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
}

exports.scripts = scripts;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(htmlmin())
  .pipe(gulp.dest("build"));
}

exports.html = html;

// Copy

const copy = () => {
  return gulp.src([
    "source/*.html",
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Build

const build = gulp.series(
  clean, copy, styles, images, sprite, makewebp, scripts, html
);

exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
  gulp.watch("source/js/script.js", gulp.series("scripts"));
}

exports.watcher = watcher;

// Start

exports.default = gulp.series(
  build, server, watcher
);
