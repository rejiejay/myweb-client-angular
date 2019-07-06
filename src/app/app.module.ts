import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * Angular 应用是模块化的，它拥有自己的模块化系统，称作 NgModule。
 * 一个 NgModule 就是一个容器，用于存放一些内聚的代码块，这些代码块专注于某个应用领域、某个工作流或一组紧密相关的功能。
 * 它可以包含一些组件、服务提供商或其它代码文件，其作用域由包含它们的 NgModule 定义。
 * 它还可以导入一些由其它模块中导出的功能，并导出一些指定的功能供其它 NgModule 使用。
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
