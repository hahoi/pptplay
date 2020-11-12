
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/index.vue'),
      },
      {
        path: 'ImportantCase', component: () => import('pages/ImportantCase.vue'),
      },
      {
        path: 'PptPlay', component: () => import('pages/PptPlay.vue'),
      },
      {
        path: 'PptEdit', component: () => import('pages/PptEdit.vue'),
      },
      { 
        path: 'PptPrint', component: () => import('pages/PptPrint.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }

]
export default routes

export const powerRouter = [

]

