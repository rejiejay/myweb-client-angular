import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * 大概是配置路由的
 * 路由要先在app.module里面依赖注入，在这边引入才不会报错
 */
const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'login', loadChildren: () => import('./../module/login/login.module').then(m => m.LoginModule) },
  // 过滤错误的组件
  // { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
