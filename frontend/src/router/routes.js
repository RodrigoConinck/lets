const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/LoginUser.vue'),
  },
  {
    path: '/MainPageUser',
    component: () => import('src/layouts/MainPageUser.vue'),
  },
  {
    path: '/UserArea',
    component: () => import('src/layouts/UserArea.vue')
  }
]

export default routes