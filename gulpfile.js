// Run tasks with $ ./node_modules/.bin/gulp
require('es6-promise').polyfill();

var gulp = require('gulp'),
    gettext = require('gulp-angular-gettext'),
    jshint = require('gulp-jshint'),
    path = require('path');

/**
 * Default tasks to be run before start.
 */

// Compiles translation files (*.po) to *.json and saves them in the directory 'i18n'.
gulp.task('translations', function () {
    return gulp.src(path.join('openslides_saml', 'locale', 'angular-gettext', '*.po'))
        .pipe(gettext.compile({
            format: 'json'
        }))
        .pipe(gulp.dest(path.join('static', 'i18n', 'openslides_saml')));
});

// Gulp default task. Runs all other tasks before.
gulp.task('default', ['translations'], function () {});

/**
 * Extra tasks that have to be called manually. Useful for development.
 */

// Extracts translatable strings using angular-gettext and saves them in file
// locale/angular-gettext/template-en.pot.
gulp.task('pot', function () {
    return gulp.src([
            'openslides_saml/static/templates/**/*.html',
            'openslides_saml/static/js/**/*.js',
        ])
        .pipe(gettext.extract('template-en.pot', {}))
        .pipe(gulp.dest(path.join('openslides_saml', 'locale', 'angular-gettext')));
});

// Checks JavaScript using JSHint
gulp.task('jshint', function () {
    return gulp.src([
            'gulpfile.js',
            path.join('openslides_saml', 'static', 'js', 'openslides_saml', '*.js'),
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
