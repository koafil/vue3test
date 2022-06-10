import Main from '@/pages/Main';
import UserPage from '@/pages/UserPage';
import About from '@/pages/About';
import PostIdPage from '@/pages/PostIdPage';
import PostPageWithStore from '@/pages/PostPageWithStore';
import PostPageCompositionApi from '@/pages/PostPageCompositionApi';
import { createWebHistory } from 'vue-router';
import { createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: UserPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/store',
    component: PostPageWithStore
  },
  {
    path: '/composition',
    component: PostPageCompositionApi
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL) 
});

export default router;