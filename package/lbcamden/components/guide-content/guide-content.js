export default function LBCamdenGuideContent ($module) {
  this.$module = $module
}

LBCamdenGuideContent.prototype.init = function () {
  if (!this.$module) {
    return
  }

  window.addEventListener('hashchange', () => this.showActiveGuide())
  this.showActiveGuide({ handleNotFound: true })
  this.$module.classList.add('lbcamden-guide-content--loaded')
}

LBCamdenGuideContent.prototype.showActiveGuide = function ({ handleNotFound } = {}) {
  if (!this.$module) return

  if (!window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname + window.location.search)
  }

  const articles = this.getArticles()
  const activeItem = this.getActiveItem()

  // This is needed to prevent internal navigation by anchor links (most importantly, "skip to main content")
  // from navigating to a 'not found' view
  if (!handleNotFound && !activeItem) {
    return
  }

  for (const item of articles) {
    this.setArticleVisibility(item, item === activeItem)
  }

  if (activeItem) {
    const notFoundContent = this.getNotFoundArticle()
    this.setArticleVisibility(notFoundContent, false, {
      hiddenAttr: true
    })
  } else {
    const notFoundContent = this.getNotFoundArticle()

    this.setArticleVisibility(notFoundContent, true, {
      setContent: DEFAULT_NOT_FOUND_CONTENT,
      setHeading: DEFAULT_NOT_FOUND_HEADING,
      setPagination: { next: articles[0] },
      hiddenAttr: true
    })
  }

  window.scrollTo({ top: 0, behavior: 'instant' })
}

LBCamdenGuideContent.prototype.setPagination = function ({ next, prev }) {
  const [prevTarget, nextTarget] = this.getPaginationTargets()

  prevTarget.querySelector('.govuk-pagination__link-label').innerText = prev && getHeading(prev)
  nextTarget.querySelector('.govuk-pagination__link-label').innerText = next && getHeading(next)

  prevTarget.querySelector('.govuk-pagination__link').href = prev && `#${prev.dataset.guideArticle}`
  nextTarget.querySelector('.govuk-pagination__link').href = next && `#${next.dataset.guideArticle}`

  this.$module.classList.toggle('lbcamden-guide-content--prev', !!prev)
  this.$module.classList.toggle('lbcamden-guide-content--next', !!next)
}

LBCamdenGuideContent.prototype.setArticleVisibility = function (article, visible, { setPagination, setContent, setHeading, hiddenAttr } = {}) {
  const content = article.querySelector('.lbcamden-guide-content__item')

  if (visible) {
    const articles = this.getArticles()
    const i = articles.indexOf(article)

    const prev = articles[i - 1]
    const next = articles[i + 1]

    if (content && setContent) {
      content.innerHTML = setContent
    }

    if (setHeading) {
      const h2 = article.querySelector('h2')

      if (h2) {
        h2.innerText = setHeading
      }
    }

    this.setPagination(setPagination || { next, prev })
  }

  if (hiddenAttr) {
    article.hidden = !visible
  } else {
    article.classList.toggle('lbcamden-guide-content--hidden', !visible)
  }
}

LBCamdenGuideContent.prototype.getArticles = function () {
  return Array.from(this.$module.querySelectorAll('[data-guide-article]'))
}

LBCamdenGuideContent.prototype.getActiveItem = function () {
  const targets = this.getArticles()
  const id = window.location.hash.substring(1)

  if (!id) {
    return targets[0]
  }

  for (const t of targets) {
    if (t.dataset.guideArticle === id) {
      return t
    }
  }
}

LBCamdenGuideContent.prototype.getPaginationTargets = function () {
  return [
    this.$module.querySelector('.govuk-pagination__prev'),
    this.$module.querySelector('.govuk-pagination__next')
  ]
}

LBCamdenGuideContent.prototype.getNotFoundArticle = function () {
  return this.$module.querySelector('[data-guide-not-found]')
}

const DEFAULT_NOT_FOUND_HEADING = 'Sorry, this content has been moved or deleted.'
const DEFAULT_NOT_FOUND_CONTENT = '<p>Try navigating the topic or search the site.</p>'

function getHeading (content) {
  const heading = content.querySelector('[data-guide-heading]')
  return heading && heading.innerText
}
