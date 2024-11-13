import "../src/lbcamden/all.scss"

import * as govuk from 'govuk-frontend'
import * as lbcamden from "../src/lbcamden/all"

document.body.classList.add("govuk-frontend-supported")

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ["autodocs"],
  decorators: [
    (story => {
      setTimeout(() => {
        govuk.initAll()
        lbcamden.initAll()
      })
      return story()
    })
  ]
};

export default preview;
