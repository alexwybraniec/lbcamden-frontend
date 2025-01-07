/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('image-component')

describe('image-component', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('image-component', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('image-component', examples.default)

      expect($('img').attr('src')).toEqual(examples.default.image.src)
      expect($('.lbcamden-image-component__caption').text()).toContain('We provide services and information for residents, businesses and visitors to the London Borough of Camden.')
    })
  })
})
