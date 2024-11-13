/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('video-embed')

describe('video-embed', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('video-embed', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('video-embed', examples.default)

      expect($('iframe').attr('title')).toContain('No Excuses Camden Local Offer Quality teaching and learning for ALL learners')
    })
  })
})
