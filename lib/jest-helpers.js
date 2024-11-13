'use strict'

const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')
const nunjucks = require('nunjucks')
const outdent = require('outdent')
const yaml = require('js-yaml')
const mediaQuery = require('css-mediaquery')

const { compileStringAsync, compileAsync } = require('sass')

const configPaths = require('../config/paths.json')
const { componentNameToMacroName } = require('./helper-functions.js')
const { pathToFileURL } = require('url')

nunjucks.configure([configPaths.src, configPaths.components], {
  trimBlocks: true,
  lstripBlocks: true
})

/**
 * Render a component's macro for testing
 * @param {string} componentName
 * @param {string} params parameters that are used in the component macro
 * @param {any} children any child components or text, pass the children to the macro
 * @returns {function} returns cheerio (jQuery) instance of the macro for easy DOM querying
 */
function render (componentName, params, children = false) {
  if (typeof params === 'undefined') {
    throw new Error('Parameters passed to `render` should be an object but are undefined')
  }

  const macroName = componentNameToMacroName(componentName)
  const macroParams = JSON.stringify(params, null, 2)

  let macroString = `{%- from "${componentName}/macro.njk" import ${macroName} -%}`

  // If we're nesting child components or text, pass the children to the macro
  // using the 'caller' Nunjucks feature
  if (children) {
    macroString += `{%- call ${macroName}(${macroParams}) -%}${children}{%- endcall -%}`
  } else {
    macroString += `{{- ${macroName}(${macroParams}) -}}`
  }

  const output = nunjucks.renderString(macroString)
  return cheerio.load(output)
}

function renderDOM (componentName, params, { children = false, jsModules = [], jsEnabled = jsModules.length > 0 } = {}) {
  const $ = render(componentName, params, children)
  const parent = document.createElement('div')
  parent.innerHTML = $('body').html()
  document.body.classList.toggle('js-enabled', jsEnabled)

  const node = parent.children[0]
  document.body.appendChild(node)

  for (const JsModule of jsModules) {
    new JsModule(node).init()
  }

  return node
}

function renderTemplate (params = {}, blocks = {}) {
  let viewString = '{% extends "src/lbcamden/template.njk" %}'

  for (const [blockName, blockContent] of Object.entries(blocks)) {
    viewString += outdent`

      {% block ${blockName} -%}
        ${blockContent}
      {%- endblock %}`
  }

  const output = nunjucks.renderString(viewString, params)
  return cheerio.load(output)
}

/**
 * Get examples from a component's metadata file
 * @param {string} componentName
 * @returns {object} returns object that includes all examples at once
 */
function getExamples (componentName) {
  const file = fs.readFileSync(
    path.join(configPaths.components, componentName, `${componentName}.yaml`),
    'utf8'
  )

  const docs = yaml.safeLoad(file)

  const examples = {}

  for (const example of docs.examples) {
    examples[example.name] = example.data
    if (example.isDefault) {
      examples.default = example.data
    }
  }

  return examples
}

/**
 * Render Sass
 *
 * @param {object} options Options to pass to sass.render
 * @return {promise} Result of calling sass.render
 */
async function renderSass ({ data, includePaths, outputStyle, file, ...options }) {
  const params = {
    loadPaths: includePaths || [configPaths.src, configPaths.node_modules],
    style: outputStyle ?? 'expanded',
    ...options
  }

  return data ? await compileStringAsync(data, { ...params, url: file ? pathToFileURL(file) : undefined }) : await compileAsync(file, params)
}

/**
 * Get the raw HTML representation of a component, and remove any other
 * child elements that do not match the component.
 * Relies on B.E.M naming ensuring that child components relating to a component
 * are namespaced.
 * @param {function} $ requires an instance of cheerio (jQuery) that includes the
 * rendered component.
 * @param {string} className the top level class 'Block' in B.E.M terminology
 * @returns {string} returns HTML
 */
function htmlWithClassName ($, className) {
  const $component = $(className)
  const classSelector = className.replace('.', '')
  // Remove all other elements that do not match this component
  $component.find(`[class]:not([class^=${classSelector}])`).remove()
  return $.html($component)
}

function setViewportWidth (width) {
  window.matchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      width
    }),
    addListener: () => {},
    removeListener: () => {}
  })
}

module.exports = { render, renderDOM, getExamples, htmlWithClassName, renderSass, renderTemplate, setViewportWidth }
