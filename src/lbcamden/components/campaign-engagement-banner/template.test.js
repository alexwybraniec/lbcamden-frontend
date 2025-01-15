import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('campaign-engagement-banner')

describe('campaign-engagement-banner', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('card-gallery', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('campaign-engagement-banner', examples.default)

      expect($('h2').text()).toContain('Heading')
      expect($('p').text()).toContain('Short description')
      expect($('a').attr('href')).toContain('/test')
    })
  })
})
