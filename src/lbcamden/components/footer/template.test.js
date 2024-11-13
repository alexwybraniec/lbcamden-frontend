/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('footer')

describe('footer', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('footer', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('entire component must have a role of `contentinfo`', () => {
    const $ = render('footer', examples.default)

    const $component = $('.lbcamden-footer')
    expect($component.attr('role')).toEqual('contentinfo')
  })

  it('renders attributes correctly', () => {
    const $ = render('footer', examples.attributes)

    const $component = $('.lbcamden-footer')
    expect($component.attr('data-test-attribute')).toEqual('value')
    expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  })

  it('renders classes', () => {
    const $ = render('footer', examples.classes)

    const $component = $('.lbcamden-footer')
    expect($component.hasClass('app-footer--custom-modifier')).toBeTruthy()
  })

  describe('navigation', () => {
    it('passes accessibility tests', async () => {
      const $ = render('footer', examples['with primary and utility navigation and social navigation'])

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('no items displayed when no item array is provided', () => {
      const $ = render('footer', examples.default)

      expect($('.lbcamden-footer__navigation').length).toEqual(0)
    })

    it('renders lists of links', () => {
      const $ = render('footer', examples['with primary navigation'])

      const $list = $('ul.lbcamden-footer__list')
      const $items = $list.find('li.lbcamden-footer__list-item')
      const $firstItem = $items.find('a:first-child')
      expect($items.length).toEqual(3)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders utility links', () => {
      const $ = render('footer', examples['with primary, secondary and utility navigation, sponsor image and social navigation'])

      const $list = $('ul.lbcamden-footer__list--utility')
      const $items = $list.find('li.lbcamden-footer__list-item')
      const $firstItem = $items.find('a:first-child')
      expect($items.length).toEqual(2)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Secondary item 1')
    })

    it('renders attributes on links', () => {
      const $ = render('footer', examples['with navigation item attributes'])

      const $navigationLink = $('.lbcamden-footer__list a')
      expect($navigationLink.attr('data-attribute')).toEqual('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })
  })
})
