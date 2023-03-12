import type { Router } from 'vue-router'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (from, to, next) => {
    const { OPENAI } = window.preload.retrieve('config')
    if (!OPENAI.API_KEY && !OPENAI.ACCESS_TOKEN) {
      if (from.path !== '/500')
        next({ name: '500' })
      else
        next()
    }
    else {
      next()
    }
  })
}
