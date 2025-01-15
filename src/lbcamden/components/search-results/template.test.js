import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('search-results')

describe('search-results', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('search-results', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })
})
