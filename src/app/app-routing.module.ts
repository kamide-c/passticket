import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('./modules/explore/explore.module').then((m) => m.ExploreModule),
  },
  {
    path: 'explore/:stringToSeek',
    loadChildren: () =>
      import('./modules/explore/explore.module').then((m) => m.ExploreModule),
  },
  {
    path: 'event/:id',
    loadChildren: () =>
      import('./modules/event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'searchResult',
    loadChildren: () =>
      import('./modules/search-result/search-result.module').then(
        (m) => m.SearchResultModule
      ),
  },
  {
    path: 'searchResult/:stringToSeek',
    loadChildren: () =>
      import('./modules/search-result/search-result.module').then(
        (m) => m.SearchResultModule
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
