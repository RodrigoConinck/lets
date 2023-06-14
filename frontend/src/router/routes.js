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
  }
]

export default routes