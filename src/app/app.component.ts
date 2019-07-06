import { Component } from '@angular/core';

/**
 * 提供Angular组件的配置数据的注解类。
 * 注册组件
 * 该 selector 用于标识该组件。该选择器是当 Angular 组件在页面中渲染出 HTML 元素时使用的名字。按照惯例，Angular 组件选择器会以前缀 app- 开头，后跟组件名称。
 */
@Component({
  selector: 'app-root', // CSS选择器，用于在模板中标识此指令并触发指令的实例化。
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
}
