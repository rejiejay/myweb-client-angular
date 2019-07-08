import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * 必须要在module里面声明(引入并且配置)才可以进行使用
 */
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  /**
   * 构造函数
   * @param http 声明注入的http模块
   */
  constructor(public http: HttpClient) {
    /**
     * rxjs
     */
    this.getRxjsData().subscribe(value => { /** 成功获取到异步请求后可以进行其他操作 */ });

    /**
     * http底层封装了rxjs
     * 这个倒是不难，复杂的是封装而已
     */
    // this.http.get('url').subscribe(response => { console.log(response); });
  }
  getRxjsData() {
    /**
     * 和 new Promise() 是有些类似的;
     * 但是rejx可以中途撤回（Promise 是无法撤回的），也可以发射多个值，
     */
    return new Observable(observer => {
      // 这里可以调用异步请求
      // observer.next('gogo'); // 请求成功后就调用这个方法就好，类似于 Promise resolve 但是可以执行多次
      // observer.error('dowm'); // 这个类似 Promise reject
    });
  }

}
