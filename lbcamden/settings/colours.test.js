/* eslint-env jest */

import { renderSass } from '../../../lib/jest-helpers.js'

import paths from '../../../config/paths.json' with { type: "json" }

const sassConfig = {
  includePaths: [paths.src, 'node_modules/'],
  outputStyle: 'compressed'
}

describe('Organisation colours', () => {
  it('should define websafe colours that meet contrast requirements', async () => {
    const sass = `
    @import "helpers/colour";

    @import "sass-color-helpers/stylesheets/color-helpers";

    $minimum-contrast: 4.5;

    $govuk-body-background-colour: #ffffff;

    @each $brandColour in map-keys($lbcamden-colours) {

      $colour: lbcamden-colour($brandColour);
      $contrast: ch-color-contrast($govuk-body-background-colour, $colour);
      @if ($brandColour != 'white') {
        @if ($contrast < $minimum-contrast) {
          @warn "Contrast ratio for #{$brandColour} too low."
          + " #{$colour} on #{$govuk-body-background-colour} has a contrast of: #{$contrast}."
          + " Must be higher than #{$minimum-contrast} for WCAG AA support.";
        }
      }
    }`

    await renderSass({ data: sass, ...sassConfig })
  })
})
