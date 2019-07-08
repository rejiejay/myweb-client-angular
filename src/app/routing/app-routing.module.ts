import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './../component/login/login.component';

/**
 * 大概是配置路由的
 * 路由要先在app.module里面依赖注入，在这边引入才不会报错
 */
const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'login', loadChildren: () => import('./../login/login.module').then(m => m.LoginModule) },
  // { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
