/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

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
