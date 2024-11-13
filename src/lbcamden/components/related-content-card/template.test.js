/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('related-content-card')
describe('related-content-card', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('related-content-card', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })
})
