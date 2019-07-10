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
   * 数字加密
   * MD5加密
   * AES-128-CBC对称加密算法(128位AES/ECB/PKCS7Padding加密/解密)
   * BASE64 加密
   * @param reqParam 请求体
   * @param username 需要加密的用户名称
   * @param token 加密所需的凭证
   */
  encryptSignature(reqParam: string, username: string, token: string) {
    interface EncryptData { username: string; token: string; }
    const encryptData: EncryptData = { username, token };

    // md5加密
    const bodyMd5 = CryptoJS.MD5(reqParam).toString(); // 小写

    const key = CryptoJS.enc.Utf8.parse(bodyMd5.substring(0, 16)); // 密钥key 需要为16位。
    const iv = CryptoJS.enc.Utf8.parse(bodyMd5.substring(bodyMd5.length - 16)); // 向量 也是16位

    /**
     * CipherOption, 加密的一些选项:
     *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
     *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
     *   iv: 偏移量, mode === ECB 时, 不需要 iv
     * 返回的是一个加密对象
     */
    const crypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(encryptData), key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      // tslint:disable-next-line: object-literal-shorthand
      iv: iv
    });

    // 转为base64位进行传输(混淆)
    const cryptedArray = CryptoJS.enc.Utf8.parse(crypted);
    const cryptedbase64 = CryptoJS.enc.Base64.stringify(cryptedArray);

    return cryptedbase64;
  }

  /**
   * 通用post请求
   * @param url string
   * @param body object
   */
  postRxjsHttp(url: string, body: object) {
    const bodyStr = JSON.stringify(body);
    const headers = this.headers;

    // headers.set('x-rejiejay-authorization', '');

    this.http.post(`${environment.baseUrl}${url}`, body, { headers });
  }
}
