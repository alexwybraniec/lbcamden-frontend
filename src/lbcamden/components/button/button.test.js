import { describe, expect, it } from 'vitest'
import { configureAxe } from "vitest-axe";
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

const userEvent = require('@testing-library/user-event').default
const { renderDOM, getExamples } = require('../../../../lib/jest-helpers')

import LBCamdenButton from './button';

const examples = getExamples('button')

describe('/components/button', () => {
  describe('/components/button/link', () => {
    it('triggers the click event when the space key is pressed', async () => {
      const clicked = jest.fn()
      const user = userEvent.setup()

      const button = renderExample(examples.link)
      button.addEventListener('click', clicked)
      button.focus()

      await user.keyboard('{Space}')
      expect(clicked).toHaveBeenCalledTimes(1)
    })

    describe('preventing double clicks', () => {
      it('prevents unintentional submissions when in a form', async () => {
        const submit = jest.fn(() => false)
        const user = userEvent.setup()
        const button = renderExample(examples['prevent double click'])
        const form = encloseInForm(button)

        form.onsubmit = submit

        await user.click(button)
        await user.click(button)

        expect(submit).toHaveBeenCalledTimes(1)
      })

      it('does not prevent intentional multiple clicks', async () => {
        const submit = jest.fn(() => false)
        const user = userEvent.setup()
        const button = renderExample(examples['prevent double click'])
        const form = encloseInForm(button)

        form.onsubmit = submit

        await user.click(button)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await user.click(button)

        expect(submit).toHaveBeenCalledTimes(2)
      })
      it('does not prevent multiple submissions when feature is not enabled', async () => {
        const submit = jest.fn(() => false)
        const user = userEvent.setup()
        const button = renderExample()
        const form = encloseInForm(button)

        form.onsubmit = submit

        await user.click(button)
        await user.click(button)

        expect(submit).toHaveBeenCalledTimes(2)
      })
      it('does not prevent subsequent clicks on different buttons', async () => {
        const submit = jest.fn(() => false)
        const user = userEvent.setup()
        const button = renderExample(examples['prevent double click'])
        const form = encloseInForm(button)
        const otherButton = button.cloneNode(true)
        form.appendChild(otherButton)

        form.onsubmit = submit

        await user.click(button)
        await otherButton.click(button)

        expect(submit).toHaveBeenCalledTimes(2)
      })
    })
  })
})

function encloseInForm (button) {
  const form = document.createElement('form')
  button.parentNode.appendChild(form)
  button.parentNode.removeChild(button)
  form.appendChild(button)
  return form
}

function renderExample (example = examples.default) {
  return renderDOM('button', example, {
    jsModules: [LBCamdenButton]
  })
}
