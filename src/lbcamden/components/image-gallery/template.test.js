/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('image-gallery')

describe('image-gallery', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('image-gallery', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('image-gallery', examples.default)

      expect($('.lbcamden-card__content p').first().text()).toContain('We provide services and information for residents, businesses and visitors to the London Borough of Camden.')
      expect($('img').first().attr('src')).toEqual(examples.default.items[0].image.src)
    })
  })
})
