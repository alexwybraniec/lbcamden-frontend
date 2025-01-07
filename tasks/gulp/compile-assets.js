'use strict'

const { componentNameToJavaScriptModuleName } = require('../../lib/helper-functions')

const path = require('path')

const gulp = require('gulp')
const configPaths = require('../../config/paths.json')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const rollup = require('gulp-better-rollup')
const taskArguments = require('./task-arguments')
const uglify = require('gulp-uglify')
const eol = require('gulp-eol')
const glob = require('glob')
const rename = require('gulp-rename')
const cssnano = require('cssnano')

// Compile CSS and JS task --------------
// --------------------------------------

// Set the destination
const destinationPath = function () {
  // Public & Dist directories do no need namespaced with `lbcamden`
  if (taskArguments.destination === 'dist' || taskArguments.destination === 'public') {
    return taskArguments.destination
  } else {
    return `${taskArguments.destination}/lbcamden/`
  }
}

const errorHandler = function (error) {
  // Log the error to the console
  console.error(error.message)

  // Ensure the task we're running exits with an error code
  this.once('finish', () => process.exit(1))
  this.emit('end')
}

gulp.task('scss:compile', (done) => {
  const compileStylesheet = configPaths.src + 'all.scss'
  const sassOptions = {
    includePaths: ['node_modules']
  }
  gulp.src(compileStylesheet)
    .pipe(plumber(errorHandler))
    .pipe(sass(sassOptions))
    // minify css add vendor prefixes and normalize to compiled css
    .pipe(postcss([
      autoprefixer,
      cssnano
    ]))
    .pipe(rename({
      basename: 'lbcamden-frontend',
      extname: '.min.css'
    })
    )
    .pipe(gulp.dest(taskArguments.destination + '/'))

  done()
})

// Compile js task for preview ----------
// --------------------------------------
gulp.task('js:compile', (done) => {
  // For dist/ folder we only want compiled 'all.js'
  const fileLookup = configPaths.src + 'all.js'

  // Perform a synchronous search and return an array of matching file names
  const srcFiles = glob.sync(fileLookup)

  srcFiles.forEach(function (file) {
    // This is combined with desinationPath in gulp.dest()
    // so the files are output to the correct folders
    const newDirectoryPath = path.dirname(file).replace('src/lbcamden', '')

    // We only want to give component JavaScript a unique module name
    let moduleName = 'LBCamdenFrontend'
    if (path.dirname(file).includes('/components/')) {
      moduleName = componentNameToJavaScriptModuleName(path.parse(file).name)
    }

    return gulp.src(file)
      .pipe(rollup({
        // Used to set the `window` global and UMD/AMD export name
        // Component JavaScript is given a unique name to aid individual imports, e.g GOVUKFrontend.Accordion
        name: moduleName,
        // UMD allows the published bundle to work in CommonJS and in the browser.
        format: 'umd'
      }))
      .pipe(uglify())
      .pipe(rename({
        basename: 'lbcamden-frontend',
        extname: '.min.js'
      })
      )
      .pipe(eol())
      .pipe(gulp.dest(destinationPath() + newDirectoryPath))
  })
  done()
})

gulp.task('js:copy-govukfrontend', () => {
  return gulp.src([
    configPaths.node_modules + 'govuk-frontend/dist/govuk/all.bundle.js'
  ])
    .pipe(uglify())
    .pipe(
      rename({
        basename: 'govuk-frontend',
        extname: '.min.js'
      })
    )
    .pipe(eol())
    .pipe(gulp.dest(destinationPath()))
})
