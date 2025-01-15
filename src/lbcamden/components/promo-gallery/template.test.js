import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('promo-gallery')

describe('promo-gallery', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('promo-gallery', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders contents', () => {
      const $ = render('promo-gallery', examples.default)

      const $component = $('li').first()
      expect($component.text()).toContain('Housing Repairs')
    })
  })

  describe('custom options', () => {
    it('renders classes', () => {
      const $ = render('promo-gallery', examples.classes)

      const $component = $('.lbcamden-promo-gallery')
      expect($component.hasClass('app-promo-gallery--custom-modifier')).toBeTruthy()
    })
  })

  describe('with heading', () => {
    it('renders heading', () => {
      const $ = render('promo-gallery', examples['with heading and description'])

      const $component = $('h2')
      expect($component.text()).toContain('Popular')
    })
  })

  describe('with show all button in panel', () => {
    it('renders heading', () => {
      const $ = render('promo-gallery', examples['with show all button in panel'])

      const $component = $('.lbcamden-link--promo--large')
      expect($component.text()).toContain('All services')
      expect($component.attr('href')).toEqual('#')
    })

    it('renders in panel', () => {
      const $ = render('promo-gallery', examples['with show all button in panel'])

      const $component = $('.lbcamden-promo-gallery--panel')
      expect($component).toBeTruthy()
    })
  })
})
