import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 双向数据绑定
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app.routing'; // 路由
import { AppComponent } from './app.component';
import { HomeComponent } from './module/home/home.component';
import { MyServiceService } from './app.service';
// import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh); // 中文

/**
 * 模块化的Angular应用系统，称作 NgModule。
 *
 * 一个 NgModule 就是一个容器，用于存放一些内聚的代码块，这些代码块专注于某个应用领域、某个工作流或一组紧密相关的功能。
 * 它可以包含一些组件、服务提供商或其它代码文件，其作用域由包含它们的 NgModule 定义。
 * 它还可以导入一些由其它模块中导出的功能，并导出一些指定的功能供其它 NgModule 使用。
 */
@NgModule({
  /**
   * 组件声明
   * 声明才能在页面使用
   */
  declarations: [
    AppComponent,
    HomeComponent,
  ],

  /**
   * 模块引用
   * 倚赖注入
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // 引入Http模块
    FormsModule, // 引入模块，就可以在视图里面使用 [(ngModel)]="inputValue"
    // NgZorroAntdModule, // ant模块
    AngularEditorModule,

    AppRoutingModule, // 注入自定义路由模块
  ],

  /**
   * 配置服务(service)
   */
  providers: [
    // { provide: NZ_I18N, useValue: zh_CN },

    MyServiceService,
  ],

  /**
   * 启动模板
   * 使用声明的 AppComponent 组件
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
