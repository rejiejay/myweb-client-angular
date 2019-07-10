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
   * AES 加密
   * @param encryptData 待加密内容
   * @param sKey aesKey 32 字节的AES密钥
   * @param ivParameter 初始化向量 16 字节的初始化向量
   * @return 返回经 BASE64 处理之后的密文
   */
  // tslint:disable-next-line: variable-name
  encryptAES(encryptData: string, sKey: string, ivParameter: string) {
    // 先以 UTF-8 编码解码参数 返回 any 类型
    const content = CryptoJS.enc.Utf8.parse(encryptData);
    const aesKey = CryptoJS.enc.Utf8.parse(sKey);
    const iv = CryptoJS.enc.Utf8.parse(ivParameter);

    // 加密
    const encrypted = CryptoJS.AES.encrypt(content, aesKey, {
      // tslint:disable-next-line: object-literal-shorthand
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }

  /**
   * 数字签名加密
   * @param reqParam 请求体
   * @param username 需要加密的用户名称
   * @param token 加密所需的凭证
   */
  encryptSignature(reqParam: string, username: string, token: string) {
    interface EncryptData { username: string; token: string; }
    const encryptData: EncryptData = { username, token };
    const encryptDataStr = JSON.stringify(encryptData);

    // md5加密
    const bodyMd5 = CryptoJS.MD5(reqParam).toString(); // 小写

    const sKey = bodyMd5.substring(0, 32); // 密钥key 32 字节的AES密钥
    const ivParameter = bodyMd5.substring(bodyMd5.length - 16); // 向量 也是16位

    console.log('encryptData', encryptDataStr);
    console.log('sKey', sKey);
    console.log('ivParameter', ivParameter);

    return this.encryptAES(encryptDataStr, sKey, ivParameter);
  }

  /**
   * 通用post请求
   * @param url string
   * @param body object
   */
  postRxjsHttp(url: string, body: object) {
    const bodyStr = JSON.stringify(body);
    const headers = this.headers;
    const username = 'rejiejay'; // 这个是固定
    const token = localStorage.getItem('x-rejiejay-token');
    // tslint:disable-next-line: radix
    const tokenexpired = parseInt(localStorage.getItem('x-rejiejay-token-expired'));

    if (new Date().getTime() > tokenexpired) { // 当前时间是否大于过期时间
      // 当前时间大于过期时间的情况下

    }

    // 加密生成签名
    const signature = this.encryptSignature(bodyStr, username, token);
    headers.set('x-rejiejay-authorization', signature); // 设置请求头

    this.http.post(`${environment.baseUrl}${url}`, body, { headers });
  }
}
