import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('directory-record')

describe('directory-record', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('directory-record', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  // describe('custom options', () => {
  //   it('renders attributes correctly', () => {
  //     const $ = render('card', examples.attributes)

  //     const $component = $('.lbcamden-card')
  //     expect($component.attr('data-test-attribute')).toEqual('value')
  //     expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  //   })

  //   it('renders classes', () => {
  //     const $ = render('card', examples.classes)

  //     const $component = $('.lbcamden-card')
  //     expect($component.hasClass('app-header--custom-modifier')).toBeTruthy()
  //   })

  //   it('renders element as a \'div\'', () => {
  //     const $ = render('card', examples.default)

  //     const $component = $('.lbcamden-card')
  //     expect($component[0].name).toBe('div')
  //   })

  //   it('renders element as a \'span\'', () => {
  //     const $ = render('card', examples['as a span'])

  //     const $component = $('.lbcamden-card')
  //     expect($component[0].name).toBe('span')
  //   })
  // })
})
