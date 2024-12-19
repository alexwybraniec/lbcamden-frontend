/* eslint-env jest */

const { KnownDevices } = require('puppeteer')
const iPhone = KnownDevices['iPhone 6']
const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

describe('/components/header', () => {
  describe('/components/header/preview', () => {
    describe('when JavaScript is available', () => {
      afterEach(async () => {
        await page.evaluate(() => window.sessionStorage.clear())
      })

      describe('on desktop devices', () => {
        describe('the navigation function', () => {
          it('the menu toggle button should be hidden', async () => {
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const target = await page.evaluate(() => document.querySelector('button[aria-controls="super-navigation-menu"]').hasAttribute('hidden'))
            expect(target).toEqual(true)
          }, 10000)
        })
      })
      describe('on all devices', () => {
        describe('the search function', () => {
          it('clicking search button should give self \'open\' class', async () => {
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const initialState = await page.evaluate(() => document.body.querySelector('button[aria-controls="super-search-menu"]').classList.contains('lbcamden-header__open-button'))
            await page.click('button[aria-controls="super-search-menu"]')
            const newState = await page.evaluate(() => document.body.querySelector('button[aria-controls="super-search-menu"]').classList.contains('lbcamden-header__open-button'))
            expect(initialState).toBe(false)
            expect(newState).toBe(true)
          })
          //
          // it('clicking search button should move focus to search input', async () => {
          //   await page.emulate(iPhone)
          //   await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
          //
          //   const initialState = await page.evaluateHandle(() => document.activeElement)
          //   await page.click('button[aria-controls="super-search-menu"]')
          //   const newState = await page.evaluateHandle(() => document.activeElement)
          //   expect(initialState._remoteObject.className).toBe('HTMLBodyElement')
          //   expect(newState._remoteObject.className).toBe('HTMLInputElement')
          // })

          it('the search container should be hidden', async () => {
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const target = await page.evaluate(() => document.getElementById('super-search-menu').hasAttribute('hidden'))
            expect(target).toEqual(true)
          })
        })
        //
        // describe('the navigation function', () => {
        //
        // })
      })

      describe('on mobile devices', () => {
        // describe('the search function', () => {
        //
        // })
        describe('the mobile nav function', () => {
          it('the menu container should be hidden', async () => {
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const target = await page.evaluate(() => document.getElementById('super-search-menu').hasAttribute('hidden'))
            expect(target).toEqual(true)
          })

          it('the menu toggle button should not be hidden', async () => {
            await page.emulate(iPhone)
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const target = await page.evaluate(() => document.querySelector('button[aria-controls="super-navigation-menu"]').hasAttribute('hidden'))
            expect(target).toEqual(false)
          })

          it('the menu toggle button should have aria-expanded value of false', async () => {
            await page.emulate(iPhone)
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const target = await page.evaluate(() => document.querySelector('button[aria-controls="super-navigation-menu"]').getAttribute('aria-expanded'))
            expect(target).toBe('false')
          })

          it('the menu toggle button should expose navigation options when clicked', async () => {
            await page.emulate(iPhone)
            await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
            const initialState = await page.evaluate(() => document.getElementById('super-navigation-menu').getAttribute('hidden'))
            await page.click('button[aria-controls="super-navigation-menu"]')
            const newState = await page.evaluate(() => document.getElementById('super-navigation-menu').getAttribute('hidden'))
            expect(initialState).toBe('true')
            expect(newState).not.toBe('true')
          })
        })
      })
    })
    describe('when JavaScript is not available', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(false)
      })

      afterEach(async () => {
        await page.evaluate(() => window.sessionStorage.clear())
      })

      describe('the menu items', () => {
        it('clicking menu link should change the window location (mobile)', async () => {
          await page.emulate(iPhone)
          await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })

          const initialState = await page.evaluate(() => window.location.href)
          await page.click('.lbcamden-header__navigation-item-link')
          const newState = await page.evaluate(() => window.location.href)
          expect(initialState).not.toEqual(newState)
        })

        it('clicking menu link should change the window location (desktop)', async () => {
          await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })

          const initialState = await page.evaluate(() => window.location.href)
          await page.click('.lbcamden-header__navigation-item-link')
          const newState = await page.evaluate(() => window.location.href)
          expect(initialState).not.toEqual(newState)
        })
      })

      describe('the search function', () => {
        it('clicking search link should change the window location (mobile)', async () => {
          await page.emulate(iPhone)
          await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })

          const initialState = await page.evaluate(() => window.location.href)
          await page.click('.lbcamden-header__search-item-link')
          const newState = await page.evaluate(() => window.location.href)
          expect(initialState).not.toEqual(newState)
        })

        it('clicking search link should change the window location (desktop)', async () => {
          await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })

          const initialState = await page.evaluate(() => window.location.href)
          await page.click('.lbcamden-header__search-item-link')
          const newState = await page.evaluate(() => window.location.href)
          expect(initialState).not.toEqual(newState)
        })

        it('the search container should not be hidden', async () => {
          await page.goto(baseUrl + '/components/header/preview', { waitUntil: 'load' })
          const target = await page.evaluate(() => document.getElementById('super-search-menu').hasAttribute('hidden'))
          expect(target).toEqual(false)
        })
      })
    })
  })
})
