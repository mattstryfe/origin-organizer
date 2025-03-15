import { createRouter, createWebHistory } from 'vue-router'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { routes } from '@/schemas/routerLinksSchema'

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  // If not authed
  // TODO: Uncomment for actual permissions.
  // if (to.name !== 'LandingPage' && !useUserStore().userIsAuthenticated) {
  //   return { name: 'LandingPage'}
  // }
  if (to.name === 'EntryDetails') {
    useEntryFormStore().editModeToggle = true
  } else {
    useEntryFormStore().editModeToggle = false
  }
})

export default router
