/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('quotation')

describe('quotation', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('quotation', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('quotation', examples.default)

      expect($('p').text()).toContain('We provide services and information for residents, businesses and visitors to the London Borough of Camden.')
      expect($('.lbcamden-quotation-attribution').text()).toContain('Camden Council')
    })
  })
})
