/* eslint-env jest */

const { getExamples, renderDOM, setViewportWidth } = require('../../../../lib/jest-helpers')
const LBCamdenHeader = require('./header').default
const LBCamdenButton = require('../button/button').default
const userEvent = require('@testing-library/user-event').default

const examples = getExamples('header')

beforeEach(() => {
  window.sessionStorage.clear()
  window.location.hash = ''

  for (const child of document.body.children) {
    child.remove()
  }
})

describe('/components/header', () => {
  describe('/components/header/preview', () => {
    describe('when JavaScript is available', () => {
      const setup = (example = examples.default) => renderDOM('header', example, {
        jsModules: [LBCamdenHeader, LBCamdenButton]
      })

      describe('on desktop devices', () => {
        beforeEach(() => setViewportWidth(1024))

        describe('the navigation function', () => {
          it('the menu toggle button should be hidden', async () => {
            const target = setup().querySelector('button[aria-controls="super-navigation-menu"]')
            expect(target.hidden).toEqual(true)
          })
        })
      })

      describe('on all devices', () => {
        describe('the search function', () => {
          it('clicking search button should give self \'open\' class', async () => {
            const target = setup()
            const user = userEvent.setup()

            const searchButton = target.querySelector('button[aria-controls="super-search-menu"]')
            const initialState = searchButton.classList.contains('lbcamden-header__open-button')

            await user.click(searchButton)
            const newState = searchButton.classList.contains('lbcamden-header__open-button')

            expect(initialState).toBe(false)
            expect(newState).toBe(true)
          }, 60000)
          //
          // it('clicking search button should move focus to search input', async () => {
          //   await page.emulate(iPhone)
          //   await page.goto(getComponentStoryUrl('header'), { waitUntil: 'load' })
          //
          //   const initialState = await page.evaluateHandle(() => document.activeElement)
          //   await page.click('button[aria-controls="super-search-menu"]')
          //   const newState = await page.evaluateHandle(() => document.activeElement)
          //   expect(initialState._remoteObject.className).toBe('HTMLBodyElement')
          //   expect(newState._remoteObject.className).toBe('HTMLInputElement')
          // })

          it('the search container should be hidden', async () => {
            const target = setup().querySelector('#super-search-menu')
            expect(target.hasAttribute('hidden')).toEqual(true)
          })
        })
        //
        // describe('the navigation function', () => {
        //
        // })
      })

      describe('on mobile devices', () => {
        beforeEach(() => setViewportWidth(320))

        // describe('the search function', () => {
        //
        // })
        describe('the mobile nav function', () => {
          it('the menu container should be hidden', async () => {
            const target = setup().querySelector('#super-search-menu')
            expect(target.hasAttribute('hidden')).toEqual(true)
          })

          it('the menu toggle button should not be hidden', async () => {
            const target = setup().querySelector('button[aria-controls="super-navigation-menu"]')
            expect(target.hasAttribute('hidden')).toEqual(false)
          })

          it('the menu toggle button should have aria-expanded value of false', async () => {
            const target = setup().querySelector('button[aria-controls="super-navigation-menu"]')
            expect(target.getAttribute('aria-expanded')).toBe('false')
          })

          it('the menu toggle button should expose navigation options when clicked', async () => {
            const user = userEvent.setup()
            const target = setup()
            const menu = target.querySelector('#super-navigation-menu')
            const initialState = menu.hidden

            await user.click(target.querySelector('button[aria-controls="super-navigation-menu"]'))
            const newState = menu.hidden

            expect(initialState).toEqual(true)
            expect(newState).toEqual(false)
          })
        })
      })
    })
    describe('when JavaScript is not available', () => {
      const setup = (example = examples.default) => renderDOM('header', example, {
        jsEnabled: false
      })

      describe('the menu items', () => {
        it('clicking menu link should change the window location (mobile)', async () => {
          setViewportWidth(320)

          const target = setup()
          const user = userEvent.setup()
          const link = target.querySelector('.lbcamden-header__navigation-item-link')

          const initialState = window.location.href
          await user.click(link)

          expect(initialState).not.toEqual(window.location.href)
        })

        it('clicking menu link should change the window location (desktop)', async () => {
          setViewportWidth(1024)

          const target = setup()
          const user = userEvent.setup()
          const link = target.querySelector('.lbcamden-header__navigation-item-link')

          const initialState = window.location.href
          await user.click(link)

          expect(initialState).not.toEqual(window.location.href)
        })
      })

      describe('the search function', () => {
        it('clicking search link should change the window location (mobile)', async () => {
          setViewportWidth(320)
          const target = setup()
          const user = userEvent.setup()
          const link = target.querySelector('.lbcamden-header__search-item-link')
          link.href = '#search'

          const initialState = window.location.href
          await user.click(link)

          expect(initialState).not.toEqual(window.location.href)
        })

        it('clicking search link should change the window location (desktop)', async () => {
          setViewportWidth(1024)
          const target = setup()
          const user = userEvent.setup()
          const link = target.querySelector('.lbcamden-header__search-item-link')
          link.href = '#search'

          const initialState = window.location.href
          await user.click(link)

          expect(initialState).not.toEqual(window.location.href)
        })

        it('the search container should not be hidden', async () => {
          const target = setup()
          expect(target.querySelector('#super-search-menu').hasAttribute('hidden')).toEqual(false)
        })
      })
    })
  })
})
