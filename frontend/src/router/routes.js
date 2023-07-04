const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginUser.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/LoginUser.vue'),
  },
  {
    path: '/register',
    component: () => import('layouts/CreateUser.vue'),
  },
  {
    path: '/UserArea',
    component: () => import('src/layouts/UserArea.vue')
  }
]

export default routes