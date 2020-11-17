import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'event/:titulo',
    loadChildren: () =>
      import('./modules/event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'searchResult/:term',
    loadChildren: () =>
      import('./modules/search-result/search-result.module').then(
        (m) => m.SearchResultModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
