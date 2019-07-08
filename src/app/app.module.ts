import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 双向数据绑定
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';

import { MyServiceService } from './service/my-service.service';


/**
 * Angular 应用是模块化的，它拥有自己的模块化系统，称作 NgModule。
 * 一个 NgModule 就是一个容器，用于存放一些内聚的代码块，这些代码块专注于某个应用领域、某个工作流或一组紧密相关的功能。
 * 它可以包含一些组件、服务提供商或其它代码文件，其作用域由包含它们的 NgModule 定义。
 * 它还可以导入一些由其它模块中导出的功能，并导出一些指定的功能供其它 NgModule 使用。
 */
@NgModule({
  declarations: [ // 组件声明
    AppComponent, // 要先声明了才能用
    LoginComponentComponent // 声明路由，倚赖注入
  ],
  imports: [ // 模块引用（这里应该是倚赖注入，但是不知道为啥要这样做
    BrowserModule,
    HttpClientModule, // 引入Http模块
    AppRoutingModule, // 已经注入路由模块
    FormsModule // 引入模块，就可以在视图里面使用 [(ngModel)]="inputValue"
  ],
  providers: [ // 配置服务(service)的地方
    MyServiceService
  ],
  bootstrap: [AppComponent] // 启动模板使用声明的 AppComponent 组件
})
export class AppModule { }
