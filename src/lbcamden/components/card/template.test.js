import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('card')

describe('card', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('card', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('custom options', () => {
    it('renders attributes correctly', () => {
      const $ = render('card', examples.attributes)

      const $component = $('.lbcamden-card')
      expect($component.attr('data-test-attribute')).toEqual('value')
      expect($component.attr('data-test-attribute-2')).toEqual('value-2')
    })

    it('renders classes', () => {
      const $ = render('card', examples.classes)

      const $component = $('.lbcamden-card')
      expect($component.hasClass('app-header--custom-modifier')).toBeTruthy()
    })

    it('renders element as a \'div\'', () => {
      const $ = render('card', examples.default)

      const $component = $('.lbcamden-card')
      expect($component[0].name).toBe('div')
    })

    it('renders element as a \'span\'', () => {
      const $ = render('card', examples['as a span'])

      const $component = $('.lbcamden-card')
      expect($component[0].name).toBe('span')
    })
  })

  describe('card with images', () => {
    it('renders classes', () => {
      const $ = render('card', examples['with image'])

      const $component = $('.lbcamden-card')
      expect($component.hasClass('lbcamden-card--image')).toBeTruthy()
    })

    it('has a content wrapper ', () => {
      const $ = render('card', examples['with image'])

      const $component = $('.lbcamden-card .lbcamden-card__content_wrapper')
      expect($component.length).toEqual(1)
    })
  })

  describe('card decorations', () => {
    describe('Type 1', () => {
      it('renders classes', () => {
        const $ = render('card', examples['decorated type 1'])

        const $component = $('.lbcamden-card')
        expect($component.hasClass('lbcamden-card--alt-1')).toBeTruthy()
      })
    })

    describe('Type 2', () => {
      it('renders classes', () => {
        const $ = render('card', examples['decorated type 2'])

        const $component = $('.lbcamden-card')
        expect($component.hasClass('lbcamden-card--alt-2')).toBeTruthy()
      })
    })

    describe('Type 3', () => {
      it('renders classes', () => {
        const $ = render('card', examples['decorated type 3'])

        const $component = $('.lbcamden-card')
        expect($component.hasClass('lbcamden-card--alt-3')).toBeTruthy()
      })
    })

    describe('with border', () => {
      it('renders classes', () => {
        const $ = render('card', examples['decorated type 1 with top border'])

        const $component = $('.lbcamden-card')
        expect($component.hasClass('lbcamden-card--top-border')).toBeTruthy()
      })
    })
  })
})
