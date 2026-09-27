import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const SITE = 'HeimerClean'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: `${SITE} — Deep clean PC optimization for Windows` },
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('./pages/StorePage.vue'),
      meta: { title: `Pricing & plans — ${SITE}` },
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('./pages/DownloadPage.vue'),
      meta: { title: `Download for Windows — ${SITE}` },
    },
    {
      path: '/docs/:slug?',
      name: 'docs',
      component: () => import('./pages/DocsPage.vue'),
      meta: { title: `Docs — ${SITE}` },
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('./pages/SupportPage.vue'),
      meta: { title: `Support — ${SITE}` },
    },
    {
      path: '/legal/:slug',
      name: 'legal',
      component: () => import('./pages/LegalPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./pages/NotFoundPage.vue'),
      meta: { title: `Page not found — ${SITE}` },
    },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      const target = { el: to.hash, top: 88 }
      if (to.path === from.path) return { ...target, behavior: 'smooth' }
      return new Promise((resolve) => setTimeout(() => resolve(target), 420))
    }
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title as string
})
