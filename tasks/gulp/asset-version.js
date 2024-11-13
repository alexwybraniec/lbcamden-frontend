'use strict'

const configPaths = require('../../config/paths.json')
const gulp = require('gulp')
const fs = require('fs')
const taskArguments = require('./task-arguments')
const rename = require('gulp-rename')
const del = require('del')
const vinylPaths = require('vinyl-paths')

// Update assets' versions ----------
// Add all.package.json version
// ----------------------------------
gulp.task('update-assets-version', () => {
  const pkg = require('../../' + configPaths.package + 'package.json')
  fs.writeFileSync(taskArguments.destination + '/VERSION.txt', pkg.version + '\r\n')
  return gulp.src([
    taskArguments.destination + '/lbcamden-frontend.min.css',
    taskArguments.destination + '/lbcamden-frontend.min.js'
  ])
    .pipe(vinylPaths(del))
    .pipe(rename(obj => {
      obj.basename = obj.basename.replace(/(lbcamden.*)(?=\.min)/g, '$1-' + pkg.version)
      return obj
    }))
    .pipe(gulp.dest(taskArguments.destination + '/'))
})

gulp.task('update-govuk-assets-version', () => {
  const govukPkg = require('../../' + configPaths.node_modules + 'govuk-frontend/package.json')
  fs.writeFileSync(taskArguments.destination + '/GOVUK-VERSION.txt', govukPkg.version + '\r\n')
  return gulp.src([
    taskArguments.destination + '/govuk-frontend.min.js'
  ])
    .pipe(vinylPaths(del))
    .pipe(rename(obj => {
      obj.basename = obj.basename.replace(/(govuk.*)(?=\.min)/g, '$1-' + govukPkg.version)
      return obj
    }))
    .pipe(gulp.dest(taskArguments.destination + '/'))
})
