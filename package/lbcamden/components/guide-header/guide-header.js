export default function LBCamdenGuideHeader ($module) {
  this.$module = $module
}

LBCamdenGuideHeader.prototype.init = function () {
  if (!this.$module) {
    return
  }

  window.addEventListener('hashchange', () => this.updateActiveLink())
  this.updateActiveLink({ handleNotFound: true })
}

LBCamdenGuideHeader.prototype.updateActiveLink = function ({ handleNotFound } = {}) {
  // This is needed to prevent internal navigation by anchor links (most importantly, "skip to main content")
  // from navigating to a 'not found' view
  if (!handleNotFound) {
    if (!this.$module.querySelector(`[href="${window.location.hash}"]`)) {
      return
    }
  }

  const isEmptyHash = !window.location.hash || window.location.hash === '#'
  let i = 0

  for (const link of this.getLinks()) {
    if (i === 0 && isEmptyHash) {
      link.classList.toggle(':active', true)
    } else {
      const fullUrl = new URL(link.href, window.location.href)
      const isActive = !isEmptyHash && fullUrl.href === window.location.href

      link.classList.toggle(':active', isActive)
    }

    i += 1
  }
}

LBCamdenGuideHeader.prototype.getLinks = function () {
  return this.$module.querySelectorAll('.govuk-link')
}
