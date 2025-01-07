/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

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
