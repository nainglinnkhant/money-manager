import { createRouter, createWebHistory } from 'vue-router';

import store from '../store/index.js';

import MoneyManager from '../views/MoneyManager.vue';
import UserAuth from '../views/UserAuth.vue';

const NotFound = () => import('../views/NotFound.vue');

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes: [
          { path: '/', component: MoneyManager, meta: { userAuth: true } },
          { path: '/auth', component: UserAuth },
          { path: '/:notFound(.*)', component: NotFound }
     ]
})

router.beforeEach((to, _, next) => {
     if(to.meta.userAuth && !store.getters.isAuthenticated) {
          next('/auth');
     }
     else {
          next();
     }
});

export default router;
