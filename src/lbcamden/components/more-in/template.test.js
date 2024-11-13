/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

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
