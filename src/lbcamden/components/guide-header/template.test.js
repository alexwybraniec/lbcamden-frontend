import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('guide-header')

describe('guide-header', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('guide-header', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })
})
