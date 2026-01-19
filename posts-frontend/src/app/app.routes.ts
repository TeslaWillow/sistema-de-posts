import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadComponent: () => import('@features/posts/pages/post-list/post-list.component'),
  },
  {
    path: 'posts/create',
    loadComponent: () => import('@features/posts/pages/post-create/post-create.component'),
  },
  {
    path: 'posts/bulk',
    loadComponent: () => import('@features/posts/pages/post-bulk/post-bulk.component'),
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('@features/posts/pages/post-detail/post-detail.component'),
  },
  {
    path: 'posts/edit/:id',
    loadComponent: () => import('@features/posts/pages/post-create/post-create.component'), // We reuse PostCreateComponent for editing
  },
  {
    path: '**',
    redirectTo: 'posts'
  }
];
