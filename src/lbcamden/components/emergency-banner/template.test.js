import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('emergency-banner')
describe('emergency-banner', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('emergency-banner', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('custom options', () => {
    it('renders classes', () => {
      const $ = render('emergency-banner', examples.classes)

      const $component = $('.lbcamden-emergency-banner')
      expect($component.hasClass('app-emergency-banner--custom-modifier')).toBeTruthy()
    })
  })
})
