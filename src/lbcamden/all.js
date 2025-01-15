import { nodeListForEach } from './common'
import LBCamdenButton from './components/button/button'
import LBCamdenGuideContent from './components/guide-content/guide-content'
import LBCamdenGuideHeader from './components/guide-header/guide-header'
import LBCamdenHeader from './components/header/header'

import './all.scss'

function initAll (options) {
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $LBCamdenHeaders = scope.querySelectorAll('[data-module="lbcamden-header"]')
  nodeListForEach($LBCamdenHeaders, function ($LBCamdenHeader) {
    new LBCamdenHeader($LBCamdenHeader).init()
  })

  var $LBCamdenButtons = scope.querySelectorAll('[data-module="lbcamden-button"]')
  nodeListForEach($LBCamdenButtons, function ($LBCamdenButton) {
    new LBCamdenButton($LBCamdenButton).init()
  })

  var $LBCamdenGuideContents = scope.querySelectorAll('[data-module="lbcamden-guide-content"]')
  nodeListForEach($LBCamdenGuideContents, function ($LBCamdenGuideContent) {
    new LBCamdenGuideContent($LBCamdenGuideContent).init()
  })

  var $LBCamdenGuideHeaders = scope.querySelectorAll('[data-module="lbcamden-guide-header"]')
  nodeListForEach($LBCamdenGuideHeaders, function ($LBCamdenGuideHeader) {
    new LBCamdenGuideHeader($LBCamdenGuideHeader).init()
  })
}

export {
  LBCamdenButton,
  LBCamdenGuideContent,
  LBCamdenGuideHeader,
  LBCamdenHeader,
  initAll
}
