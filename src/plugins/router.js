import { createRouter, createWebHistory } from 'vue-router'
// import Eggs from '@/pages/egg-details.vue'
// import Breeding from '@/pages/breeding-plans.vue'
// import Hatching from '@/pages/hatching-data.vue'
import HomePage from '@/pages/home-page.vue'
// import SOP from '@/pages/standard-of-perfection.vue'
// import ChickenDetails from '@/components/bird-details.vue'
// import Finances from '@/pages/money-tracker.vue';
// import MoneyTracker from '@/pages/money-tracker.vue';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  // {
  //   path: '/details',
  //   component: ChickenDetails
  // },
  
  // {
  //   path: '/eggs',
  //   component: Eggs
  // },
  // {
  //   path: '/breeding',
  //   component: Breeding
  // },
  // {
  //   path: '/sop',
  //   component: SOP
  // },
  // {
  //   path: '/hatching',
  //   component: Hatching
  // },
  // {
  //   path: '/finance',
  //   component: MoneyTracker
  // }
]
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router