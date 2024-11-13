/* eslint-env jest */

const axe = require('../../../../lib/axe-helper')

const { render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('image')

describe('image', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('image', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders srcset and sizes attributes on the source element', async () => {
      const $ = render('image', examples.default)
      const $source = $('source[type="image/webp"]')

      expect($source.attr('srcset')).toEqual('/example-assets/images/300x200.webp 300w, /example-assets/images/600x400.webp 600w, /example-assets/images/1200x800.webp 1200w, /example-assets/images/1800x1200.webp 1800w')
      expect($source.attr('sizes')).toEqual('100vw')
    })

    it('renders attributes on the img element', async () => {
      const $ = render('image', examples.default)
      const $img = $('img')

      expect($img.attr('src')).toEqual(examples.default.src)
      expect($img.attr('alt')).toEqual(examples.default.alt)
      expect($img.attr('loading')).toEqual('lazy')
    })
  })

  describe('multiple viewports example', () => {
    it('renders srcset and sizes attributes on the source element', async () => {
      const $ = render('image', examples['with multiple viewports'])
      const $source = $('source[type="image/webp"]')

      expect($source.attr('srcset')).toEqual('/example-assets/images/300x200.webp 300w, /example-assets/images/600x400.webp 600w, /example-assets/images/1200x800.webp 1200w, /example-assets/images/1800x1200.webp 1800w')
      expect($source.attr('sizes')).toEqual('(min-width: 768px) 50vw, 100vw')
    })
  })

  describe('single source example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('image', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders attributes on the img element', async () => {
      const $ = render('image', examples['single source'])
      const $img = $('img')

      expect($img.attr('src')).toEqual(examples['single source'].src)
      expect($img.attr('alt')).toEqual(examples['single source'].alt)
      expect($img.attr('width')).toEqual('300')
      expect($img.attr('height')).toEqual('200')
      expect($img.attr('loading')).toEqual('lazy')
    })
  })

  describe('custom options', () => {
    it('renders classes correctly', () => {
      const $ = render('image', examples.classes)

      const $component = $('img')
      expect($component.hasClass('app-image--custom-modifier')).toBeTruthy()
    })

    it('renders custom attributes on the img element', () => {
      const $ = render('image', examples.attributes)

      const $component = $('img')
      expect($component.attr('data-test-attribute')).toEqual('value')
    })
  })
})
