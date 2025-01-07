/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('search')

describe('search', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('search', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('input renders with id', () => {
      const $ = render('search', examples.default)

      const $component = $('.lbcamden-search__input')
      expect($component.attr('id')).toEqual('lbcamden-search__box')
    })

    it('input renders with name', () => {
      const $ = render('search', examples.default)

      const $component = $('.lbcamden-search__input')
      expect($component.attr('name')).toEqual('search')
    })

    it('renders with a form', () => {
      const $ = render('search', examples.default)

      const $formGroup = $('form')
      expect($formGroup.length).toBeTruthy()
    })

    it('renders label with "for" attribute reffering the input "id"', () => {
      const $ = render('search', examples.default)

      const $label = $('.govuk-label')
      expect($label.attr('for')).toEqual('lbcamden-search__box')
    })

    it('renders default form action', () => {
      const $ = render('search', examples.default)

      const $component = $('.lbcamden-search')
      expect($component.attr('action')).toBe('/search')
    })
  })

  describe('custom options', () => {
    it('renders classes correctly', () => {
      const $ = render('search', examples.classes)

      const $component = $('.lbcamden-search')
      expect($component.hasClass('search-class-test')).toBeTruthy()
    })

    it('input renders with value', () => {
      const $ = render('search', examples['Search input with value'])

      const $component = $('.lbcamden-search__input')
      expect($component.attr('value')).toEqual('Housing Repairs')
    })

    it('renders alt classname', () => {
      const $ = render('search', examples['Colour variant'])

      const $component = $('.lbcamden-search')
      expect($component.attr('class')).toContain('lbcamden-search--alt')
    })

    it('renders custom label and call to action text', () => {
      const $ = render('search', examples.labelText)

      const $component1 = $('.lbcamden-search label')
      const $component2 = $('.lbcamden-search__btn')
      expect($component1.text()).toContain('Search test')
      expect($component2.text()).toContain('Search test')
    })

    it('renders custom placeholder text', () => {
      const $ = render('search', examples['Placeholder text'])

      const $component = $('.lbcamden-search__input')
      expect($component.attr('placeholder')).toBe('Customised placeholder')
    })

    it('contains POST method', () => {
      const $ = render('search', examples['method attribute'])

      const $component = $('.lbcamden-search')
      expect($component.attr('method')).toBe('post')
    })

    it('renders custom form action', () => {
      const $ = render('search', examples['action attribute'])

      const $component = $('.lbcamden-search')
      expect($component.attr('action')).toBe('/q')
    })

    it('includes additonal parameter hidden inputs', () => {
      const $ = render('search', examples['additional parameters'])

      const $component = $('[name=highlighting]')
      expect($component.attr('value')).toBe('true')
    })

    it('input renders with custom name', () => {
      const $ = render('search', examples['name attribute'])

      const $component = $('.lbcamden-search__input')
      expect($component.attr('name')).toEqual('find')
    })
  })
})
