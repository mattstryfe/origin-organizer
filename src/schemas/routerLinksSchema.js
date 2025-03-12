export const routes = [
  {
    title: 'Home',
    icon: 'mdi-home',
    color: 'blue-grey',
    routeName: 'LandingPage',
    class: 'hover-gradient',
    hideInMainNav: true,
    path: '/',
    component: () => import('@/pages/LandingPage.vue')
  },
  {
    title: 'Add Entry',
    icon: 'mdi-plus',
    color: 'info',
    routeName: 'AddEntry',
    class: 'hover-gradient',
    path: '/addentry',
    component: () => import('@/pages/AddEntryPage.vue')
  },
  {
    title: 'Entry Details',
    icon: 'mdi-cog',
    color: 'teal',
    class: 'hover-gradient',
    path: '/entrydetails/:entryId',
    component: () => import('@/pages/EntryDetailsPage.vue'),
    props: true
  },
  {
    title: 'Planner',
    icon: 'mdi-calendar-arrow-right',
    color: 'orange-darken-3',
    class: 'hover-gradient'
  },
  {
    title: 'Flock Manager',
    icon: 'mdi-bird',
    color: 'yellow-lighten-2',
    routeName: 'FlockManager',
    class: 'hover-gradient',
    path: '/flockmanager',
    component: () => import('@/pages/FlockManagerPage.vue')
  },
  {
    title: 'Calendar',
    icon: 'mdi-calendar',
    color: 'indigo-darken-1',
    class: 'hover-gradient'
  },
  {
    title: 'Reports',
    icon: 'mdi-chart-bar',
    color: 'red-darken-2',
    class: 'hover-gradient'
  },
  {
    title: 'Gene Tools',
    icon: 'mdi-atom',
    color: 'yellow-darken-2',
    class: 'hover-spin-continuous'
  }
]
