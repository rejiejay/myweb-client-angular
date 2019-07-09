import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import CryptoJS from 'crypto-js';

import { environment } from './../environments/environment';

/**
 * 必须要在module里面声明(引入并且配置)才可以进行使用
 */
@Injectable({
  /**
   * 告诉 Angular在根注入器中注册这个服务,这也是使用CLI生成服务时默认的方式.
   * 这种方式注册,不需要再@NgModule装饰器中写providers,而且在代码编译打包时,可以执行摇树优化，会移除所有没在应用中使用过的服务。推荐使用此种方式注册服务.
   */
  providedIn: 'root'
})
export class MyServiceService {

  public headers = new HttpHeaders().set(
    'Content-type',
    'application/json; charset=UTF-8'
  );

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

  /**
   * 通用post请求
   * @param url string
   * @param body any
   */
  postRxjsHttp(url: string, body: any) {
    // md5加密
    const bodyStr = JSON.stringify(body);
    console.log(bodyStr);
    const bodyMd5 = CryptoJS.MD5(bodyStr).toString();
    console.log(bodyMd5);

    const headers = this.headers;

    this.http.post(`${environment.baseUrl}${url}`, body, { headers });

    return bodyMd5;
  }
}
