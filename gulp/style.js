import { watch, src, dest } from 'gulp'
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

function run (source, build) {
  return (src(source)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(csso({
      restructure: true,
      sourceMap: true,
      debug: false
    }))
    .pipe(rename({extname: ".css"}))
    .pipe(dest(build))
  )
}

const srcPath = text => `dist/scss/${text}`,
  buildPath = text => `./styles/${text}`;

const SCSS = {
  // source paths
  app: srcPath('app.scss'),
  colors: srcPath('colors/*.scss'),
  base: srcPath('base/*.scss'),
  pages: srcPath('pages/**/*.scss'),
  
  // build paths
  build: buildPath(''),
  buildPages: buildPath('pages'),
  
  runBase () { return (run(SCSS.app,SCSS.build)) },
  runPages () { return (run(SCSS.pages,SCSS.buildPages)) },
};

module.exports = () => {
  watch(SCSS.app, SCSS.runBase);
  watch(SCSS.base, SCSS.runBase);
  watch(SCSS.colors, SCSS.runBase);
  watch(SCSS.pages, SCSS.runPages);
}