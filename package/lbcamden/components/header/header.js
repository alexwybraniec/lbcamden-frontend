import { nodeListForEach, settings } from '../../common'

function LBCamdenHeader ($module) {
  this.$module = $module
  this.$navigationToggle = this.$module.querySelector('.lbcamden-header__navigation-top-toggle-button')
  this.$navigationMenu = this.$module.querySelector('.lbcamden-header__navigation-items')
  this.$searchToggle = this.$module.querySelector('.lbcamden-header__search-toggle-button')
  this.$searchMenu = this.$module.querySelector('.lbcamden-header__search-items')
  this.$emergencyBanner = this.$module.querySelector('.lbcamden-header__emergency-banner')
  this.$buttons = this.$module.querySelectorAll('button[aria-controls][data-toggle-mobile-group][data-toggle-desktop-group]')
  this.$menuButtons = this.$module.querySelectorAll('.lbcamden-header__navigation-item--with-children')
  this.$phaseBanner = document.querySelector('.govuk-phase-banner')
  this.$navContainer = this.$module.children[0]
  // this.$menuButtons = this.$module.querySelectorAll('.lbcamden-header__navigation-second-toggle-button')
  this.hiddenButtons = this.$module.querySelectorAll('button[hidden]')
  this.$contentShiftContainer = this.$module.querySelector('.lbcamden-header__bar') || this.$module
  this.menuOpen = false
  this.searchOpen = false
  this.lastWindowSize = null
}

LBCamdenHeader.prototype.init = function () {
  if (!this.$module) {
    return
  }
  this.$module.classList.add('js-module-initialised')
  if (typeof window.matchMedia === 'function') {
    this.setupResponsiveChecks()
  }
}

LBCamdenHeader.prototype.setupResponsiveChecks = function () {
  this.mql = window.matchMedia('(min-width: ' + settings.desktop + ')')
  this.mql.addListener(this.checkMode.bind(this))
  this.checkMode()
}

LBCamdenHeader.prototype.checkMode = function () {
  if (this.mql.matches) {
    this.teardownMobileMenu()
    this.setupDesktopMenu()
  } else {
    this.teardownDesktopMenu()
    this.setupMobileMenu()
  }
}

LBCamdenHeader.prototype.setupMobileMenu = function () {
  this.setAttributes('mobile')
  if (this.$navigationMenu != null) {
    this.$navigationToggle.boundMenuClick = this.handleMenuButtonClick.bind(this)
    this.$navigationToggle.addEventListener('click', this.$navigationToggle.boundMenuClick, true)
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.boundSearchClick = this.handleSearchButtonClick.bind(this)
    this.$searchToggle.addEventListener('click', this.$searchToggle.boundSearchClick, true)
  }
}

LBCamdenHeader.prototype.teardownMobileMenu = function () {
  this.unsetAttributes('mobile')
  if (this.$navigationMenu != null) {
    this.$navigationToggle.removeEventListener('click', this.$navigationToggle.boundMenuClick, true)
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.removeEventListener('click', this.$searchToggle.boundSearchClick, true)
  }
}

LBCamdenHeader.prototype.setupDesktopMenu = function () {
  this.setAttributes('desktop')
  if (this.$searchMenu != null) {
    this.$searchToggle.boundSearchClick = this.handleSearchButtonClick.bind(this)
    this.$searchToggle.addEventListener('click', this.$searchToggle.boundSearchClick, true)
  }
}

LBCamdenHeader.prototype.teardownDesktopMenu = function () {
  this.unsetAttributes('desktop')
  if (this.$navigationMenu != null) {
    this.$navigationToggle.removeEventListener('click', this.$navigationToggle.boundMenuClick, true)
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.removeEventListener('click', this.$searchToggle.boundSearchClick, true)
  }
}

LBCamdenHeader.prototype.menuItemClick = function (e) {
  let theTargetID = e.target.getAttribute('aria-controls')
  if (theTargetID == null) {
    theTargetID = e.target.parentNode.getAttribute('aria-controls')
    e.target.parentNode.classList.toggle('lbcamden-header__open-button')
  } else {
    e.target.classList.toggle('lbcamden-header__open-button')
  }

  this.$module.querySelectorAll('.lbcamden-header__navigation-second-toggle-button:not([aria-controls=' + theTargetID + '])').forEach(i => i.classList.remove('lbcamden-header__open-button'))

  const theTarget = document.getElementById(theTargetID)

  // AW: Only close other sub-menus when in desktop mode
  if (this.mql.matches === true) {
    this.$module.querySelectorAll('.lbcamden-header__navigation-dropdown-menu:not(#' + theTargetID + ')').forEach(i => i.setAttribute('hidden', true))
  }

  document.getElementById(theTargetID).getAttribute('hidden') != null ? document.getElementById(theTargetID).removeAttribute('hidden') : document.getElementById(theTargetID).setAttribute('hidden', 'true')

  if (this.mql.matches === true) {
    this.menuContentShift(theTarget.offsetHeight)
  }
  if (this.$searchMenu != null) {
    this.closeSearch(this.$searchToggle, this.$searchMenu)
  }
}

LBCamdenHeader.prototype.menuContentShift = function (offsetPixels) {
  if (this.$emergencyBanner) {
    this.$emergencyBanner.style.marginTop = offsetPixels + 'px'
  } else {
    this.$contentShiftContainer.style.marginBottom = offsetPixels + 'px'
  }
}

LBCamdenHeader.prototype.setAttributes = function ($type) {
  if ($type === 'mobile') {
    if (this.$navigationMenu != null) {
      this.$navigationToggle.removeAttribute('hidden')
      this.$navigationToggle.setAttribute('aria-expanded', false)
      this.$navigationMenu.setAttribute('hidden', true)
    }
  }
  if (this.$searchMenu != null) {
    this.$searchMenu.setAttribute('hidden', true)
    this.$searchToggle.setAttribute('aria-expanded', false)
    this.$searchToggle.setAttribute('aria-label', 'Show search menu')
    this.$module.querySelector('.lbcamden-header__search-item-link').setAttribute('hidden', true)
    this.$module.querySelector('.lbcamden-header__search-and-popular').removeAttribute('hidden')
    this.$searchToggle.removeAttribute('hidden')
  }
  nodeListForEach(this.$menuButtons, function ($button) {
    $button.querySelector('.lbcamden-header__navigation-item-link').setAttribute('hidden', true)
    $button.querySelector('.lbcamden-header__navigation-second-toggle-button').removeAttribute('hidden')
    // Save bounded functions to use when removing event listeners during teardown
    $button.boundMenuItemClick = this.menuItemClick.bind(this)
    // Handle events
    $button.querySelector('button').addEventListener('click', $button.boundMenuItemClick, true)
  }.bind(this))
}

LBCamdenHeader.prototype.unsetAttributes = function ($type) {
  if ($type === 'mobile') {
    if (this.$navigationMenu != null) {
      this.$navigationToggle.setAttribute('hidden', true)
      this.$navigationMenu.removeAttribute('hidden')
    }
    if (this.$searchMenu != null) {
      this.$searchToggle.setAttribute('hidden', true)
      this.$searchMenu.removeAttribute('hidden')
    }
  }
  this.$module.style.marginBottom = '0px'
  this.searchOpen = false
  this.menuOpen = false
  if (this.$navigationMenu != null) {
    this.closeDesktopMenus()
  }
  if (this.$searchMenu != null) {
    this.$searchToggle.classList.remove('lbcamden-header__open-button')
  }
  nodeListForEach(this.$menuButtons, function ($button) {
    $button.querySelector('button').removeEventListener('click', $button.boundMenuItemClick, true)
  })
}

LBCamdenHeader.prototype.handleMenuButtonClick = function () {
  if (this.menuOpen === true) {
    this.closeMenu(this.$navigationToggle, this.$navigationMenu)
  } else {
    this.openMenu(this.$navigationToggle, this.$navigationMenu)
  }
}

LBCamdenHeader.prototype.handleSearchButtonClick = function () {
  if (this.searchOpen === true) {
    this.closeSearch(this.$searchToggle, this.$searchMenu)

    if (this.mql.matches === true) {
      this.$module.style.marginBottom = '0'
      this.menuContentShift(0)
    }
  } else {
    this.openSearch(this.$searchToggle, this.$searchMenu)

    if (this.mql.matches === true) {
      this.menuContentShift(this.$searchMenu.offsetHeight)
    }
  }
}

LBCamdenHeader.prototype.openMenu = function ($button, $target) {
  this.menuOpen = true
  $button.classList.add('lbcamden-header__open-button')
  $button.setAttribute('aria-expanded', !0)
  $button.setAttribute('aria-label', 'Hide navigation menu')
  $button.classList.add('lbcamden-header__open-button')
  $target.removeAttribute('hidden')
  if (this.$searchMenu != null) {
    this.closeSearch(this.$searchToggle, this.$searchMenu)
  }
}

LBCamdenHeader.prototype.closeMenu = function ($button, $target) {
  this.menuOpen = false
  this.menuContentShift(0)
  if (this.$navigationMenu != null) {
    $button.classList.remove('lbcamden-header__open-button')
    $button.setAttribute('aria-expanded', !1)
    $button.setAttribute('aria-label', 'Show navigation menu')
    $button.classList.remove('lbcamden-header__open-button')
    $target.setAttribute('hidden', !0)
  }
}

LBCamdenHeader.prototype.closeDesktopMenus = function () {
  this.$module.querySelectorAll('.lbcamden-header__navigation-dropdown-menu').forEach(x => x.setAttribute('hidden', true))
}

LBCamdenHeader.prototype.openSearch = function ($button, $target) {
  this.searchOpen = true
  $button.setAttribute('aria-expanded', !0)
  $button.setAttribute('aria-label', 'Hide navigation menu')
  this.$module.querySelectorAll('.lbcamden-header__open-button').forEach(x => x.classList.remove('lbcamden-header__open-button'))
  $button.classList.add('lbcamden-header__open-button')
  $target.style.top = this.$navContainer.offsetHeight + 'px'
  $target.removeAttribute('hidden')
  // document.getElementById('lbs-search__box').focus()
  if (this.mql.matches !== true) {
    this.closeMenu(this.$navigationToggle, this.$navigationMenu)
  } else {
    this.closeDesktopMenus()
  }
}

LBCamdenHeader.prototype.closeSearch = function ($button, $target) {
  this.searchOpen = false
  $button.setAttribute('aria-expanded', !1)
  $button.setAttribute('aria-label', 'Show navigation menu')
  $button.classList.remove('lbcamden-header__open-button')
  $target.setAttribute('hidden', !0)
}

export default LBCamdenHeader
