import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
 /*
  @todo using site routing for now...
  {
    path: '',
    component: AppComponent,
    canActivate: [],
    children: [

      {
        path: '',
        loadChildren: () =>
          import('./modules/site/site.module').then(
            (m) => m.SiteModule
          )
      },
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
