import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('info-callout')

describe('info-callout', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('info-callout', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('info-callout', examples.default)

      expect($('h2').text()).toContain('Heading')
      expect($('a').first().text()).toContain('Link label')
    })
  })
})
