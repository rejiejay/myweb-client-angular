import { Component } from '@angular/core';

import { MyServiceService } from './app.service';
import { ActivatedRoute } from '@angular/router';


/**
 * 提供Angular组件的配置数据的注解类。
 * 注册组件
 * selector： 用于标识该组件。该选择器是当 Angular 组件在页面中渲染出 HTML 元素时使用的名字。按照惯例，Angular 组件选择器会以前缀 app- 开头，后跟组件名称。
 * 父传子：<父组件 [msg]="msg"></父组件> 父组件传入给子组件，子组件接收需要 import { Input } from '@angular/core'; @input() msg:string; 接收
 * 父获子：<子组件 #childDiv></子组件> import { ViewChild } from '@angular/core'; @ViewChild("childDiv") childDiv:any; 通过装饰器获取子组件
 * 子传父：和Vue很类似，import { Output, EventEmitter } from '@angular/core'; @Output() public childPutTo = new EventEmitter();
 *        this.childPutTo.emit('我是广播'); <父组件 (childPutTo)="method()"></父组件>
 */
@Component({
  selector: 'app-root', // CSS选择器，用于在模板中标识此指令并触发指令的实例化。
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  // 此处可以声明变量，然后变量会绑定到页面上（花括号{{}}，（生命周期：应该是初始化生成

  /**
   * 构造方法
   * 可以 public storage: MyServiceService 引入 service
   *   然后进而调用service里面的方法
   * 通过 public route: ActivatedRoute 引入路由
   * this.route 调用里面的方法，可以打印出来
   */
  constructor(public storage: MyServiceService, public route: ActivatedRoute) {
    /**
     * 这里可以改变属性的值，可能是因为还没有渲染，因为是构造方法
     * [class]=属性
     * [innerHTML]=值
     * 数组循环 *ngFor="let item of list"
     * *ngIf="false"
     * [ngSwitch]=属性
     * [ngClass]="{'red': false, 'blue': true}"
     * (keyup)="method($event)" 监听事件
     * 公共方法:定义到服务(service)里面,就可以实现方法跨组件调用
     */
  }

  /**
   * 注册了个点击事件
   */
  gotoLink() {
    console.log(1);
  }

}
