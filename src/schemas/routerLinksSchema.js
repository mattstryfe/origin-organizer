export const routes = [
  {
    class: 'hover-gradient',
    color: 'blue-grey',
    component: () => import('@/pages/LandingPage.vue'),
    hideInMainNav: true,
    icon: 'mdi-home',
    name: 'LandingPage',
    path: '/',
    title: 'Home'
  },
  {
    class: 'hover-gradient',
    color: 'info',
    component: () => import('@/pages/AddEntryPage.vue'),
    icon: 'mdi-plus',
    name: 'AddEntry',
    path: '/addentry',
    showInMobileNav: true,
    title: 'Add Entry'
  },
  {
    class: 'hover-gradient',
    color: 'teal',
    component: () => import('@/pages/EntryDetailsPage.vue'),
    hideInMainNav: true,
    icon: 'mdi-cog',
    name: 'EntryDetails',
    path: '/entrydetails/:entryId',
    props: true,
    title: 'Entry Details'
  },
  {
    class: 'hover-gradient',
    color: 'yellow-lighten-2',
    component: () => import('@/pages/FlockManagerPage.vue'),
    icon: 'mdi-bird',
    name: 'FlockManager',
    path: '/flockmanager',
    showInMobileNav: true,
    title: 'Flock Manager'
  },
  {
    class: 'hover-gradient',
    color: 'orange-darken-3',
    disabled: true,
    title: 'Planner',
    icon: 'mdi-calendar-arrow-right'
  },
  {
    class: 'hover-gradient',
    color: 'indigo-darken-1',
    disabled: true,
    icon: 'mdi-calendar',
    title: 'Calendar'
  },
  {
    class: 'hover-gradient',
    color: 'red-darken-2',
    disabled: true,
    icon: 'mdi-chart-bar',
    title: 'Reports'
  },
  {
    class: 'hover-spin-continuous',
    color: 'yellow-darken-2',
    disabled: true,
    icon: 'mdi-atom',
    title: 'Gene Tools'
  }
]
