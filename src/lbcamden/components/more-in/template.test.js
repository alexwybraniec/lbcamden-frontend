import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('more-in')
describe('more-in', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('more-in', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })
})
