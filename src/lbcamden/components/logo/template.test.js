/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('logo')

describe('logo', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('logo', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('custom options', () => {
    it('renders classes correctly', () => {
      const $ = render('logo', examples.classes)

      const $component = $('.lbcamden-logo')
      expect($component.hasClass('logo-class-test')).toBeTruthy()
    })

    it('renders custom fill colour', () => {
      const $ = render('logo', examples.fillColour)

      const $component = $('.lbcamden-logo path')
      expect($component.attr('fill')).toContain('ae094e')
    })
  })

  describe('SVG logo', () => {
    const $ = render('logo', examples.default)
    const $svg = $('.lbcamden-logo')

    it('sets focusable="false" so that IE does not treat it as an interactive element', () => {
      expect($svg.attr('focusable')).toEqual('false')
    })

    it('sets aria-hidden="true" so that it is ignored by assistive technologies', () => {
      expect($svg.attr('aria-hidden')).toEqual('true')
    })

    describe('fallback PNG', () => {
      const $fallbackImage = $('.govuk-header__logotype-crown-fallback-image')

      it('is invisible to modern browsers', () => {
        expect($fallbackImage.length).toEqual(0)
      })
    })
  })
})
