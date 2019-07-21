import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './module/home/home.component';

/**
 * 配置路由
 * 因为这里所属 app.module 模块下面的路由，所以必须先在app.module依赖注入
 */
const routes: Routes = [
  { path: '', component: HomeComponent },
  // 懒加载
  { path: 'login', loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule) },
  { path: 'java/notes', loadChildren: () => import('./module/javanotes/javanotes.module').then(m => m.JavaNotesModule) },
  // 过滤错误的组件
  // { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
