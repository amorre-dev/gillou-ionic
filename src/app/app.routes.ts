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
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
];
