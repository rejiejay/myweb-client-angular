import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponentComponent } from './login-component/login-component.component';

/**
 * 大概是配置路由的
 * 路由要先在app.module里面依赖注入，在这边引入才不会报错
 */
const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  // { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
