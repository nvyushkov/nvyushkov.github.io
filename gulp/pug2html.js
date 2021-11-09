import { src, dest, watch } from 'gulp'
import pug from 'gulp-pug'
import linter from 'gulp-pug-linter'


const
  includesPath = 'dist/pug/pages/includes/**/*.pug',
  commonPath = 'dist/pug/pages/common/*.pug',
  pagesPath = 'dist/pug/pages/*.pug',
  layoutPath = 'dist/pug/layout.pug',
  buildPath = './'

const run = source => {
  return src(source).
    pipe(linter({
      reporter: 'default',
    })).
    pipe(pug({pretty: true})).
    pipe(dest(buildPath))
}

function buildPages () {
  return (run(pagesPath))
}

module.exports = () => {
  watch(commonPath, buildPages)
  watch(includesPath, buildPages)
  watch(pagesPath, buildPages)
  watch(layoutPath, buildPages)
}