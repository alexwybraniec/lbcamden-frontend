import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('service-banner')
describe('service-banner', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('service-banner', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('custom options', () => {
    it('renders classes', () => {
      const $ = render('service-banner', examples.classes)

      const $component = $('.lbcamden-service-banner')
      expect($component.hasClass('app-service-banner--custom-modifier')).toBeTruthy()
    })
  })
})
