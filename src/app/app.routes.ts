import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'score-list',
    pathMatch: 'full',
  },
  {
    path: 'score-list',
    loadComponent: () =>
      import('./pages/score-list/score-list.page').then((m) => m.ScoreListPage),
  },
  {
    path: 'score-order',
    loadComponent: () =>
      import('./pages/reorder-scores/reorder-scores.page').then(
        (m) => m.ReorderScoresPage
      ),
  },
  {
    path: 'score-history',
    loadComponent: () =>
      import('./pages/score-history/score-history.page').then(
        (m) => m.ScoreHistoryPage
      ),
  },
  {
    path: 'carnivals',
    loadComponent: () =>
      import('./pages/carnivals/carnivals.page').then((m) => m.CarnivalsPage),
  },
  {
    path: 'carnivals/:id',
    loadComponent: () =>
      import('./pages/carnival-detail/carnival-detail.page').then(
        (m) => m.CarnivalDetailPage
      ),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
];
