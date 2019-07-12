import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import CryptoJS from 'crypto-js';

import { environment } from './../environments/environment';
import { Consequencer, consequent } from './../utils/Consequencer';
import { MyLoading } from './../utils/MyLoading';

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
  /**
   * 构造函数
   * @param http 声明注入的http模块
   */
  constructor(public http: HttpClient, public router: Router) {
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
   * AES-128-CBC-PKCS7Padding 对称加密
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

    return this.encryptAES(encryptDataStr, sKey, ivParameter);
  }

  /**
   * 通用请求
   * 1. 弹出和关闭loading框
   * 2. 判断token是否过期，主动刷新
   * 3. 封装通用的get 和 post 请求，减少代码量
   * @param requestMethod 请求方法get 和 post （小写
   * @param requestURL 请求地址
   * @param requesBody 请求体（get请求不需要填写
   */
  async GeneralRxjsHttp(requestMethod: string, requestURL: string, requesBody: object) {
    const self = this;
    interface RefreshTokenBody { // 刷新 token 凭证 请求参数
      password: string;
    }

    interface AuthorizationResult { // 刷新 token 凭证 返回参数
      result: number;
      data: {
        token: string;
        tokenexpired: number;
      };
      message: string;
    }

    let httpRequestResult: Consequencer;

    const username = 'rejiejay'; // 这个是固定
    let token = localStorage.getItem('x-rejiejay-token');
    // tslint:disable-next-line: radix
    let tokenexpired = parseInt(localStorage.getItem('x-rejiejay-token-expired') || '0');
    const password = localStorage.getItem('x-rejiejay-password');
    const refreshTokenBody: RefreshTokenBody = { password };

    /**
     * 生成请求头
     */
    const createHttpHeaders = () => {
      token = localStorage.getItem('x-rejiejay-token');
      // tslint:disable-next-line: radix
      tokenexpired = parseInt(localStorage.getItem('x-rejiejay-token-expired') || '0');
      /**
       * 生成签名
       */
      let signature = '';
      if (requestMethod === 'get') {
        // 加密生成签名
        let reqParam = '';
        const indexOfrequestURL = requestURL.indexOf('?');
        if (indexOfrequestURL !== -1) { // 判断是否有问号
          reqParam = requestURL.substring(indexOfrequestURL + 1);
        }

        signature = this.encryptSignature(reqParam, username, token);
      } else {
        // 加密生成签名
        const bodyStr = JSON.stringify(requesBody);
        signature = this.encryptSignature(bodyStr, username, token);
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'x-rejiejay-authorization': signature
      });

      return headers;
    };

    /**
     * 主动刷新token
     */
    const activeRefresh = () => new Promise(
      (resolve, reject) => self.http.post(`${environment.baseUrl}/login/refresh/rejiejay`, refreshTokenBody, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
          'x-rejiejay-authorization': self.encryptSignature(JSON.stringify(refreshTokenBody), username, token)
        })
      }).subscribe(
        (val: AuthorizationResult) => {
          if (val.result === 1) {
            // 刷新成功
            token = val.data.token;
            tokenexpired = val.data.tokenexpired;
            localStorage.setItem('x-rejiejay-token', token);
            localStorage.setItem('x-rejiejay-token-expired', tokenexpired.toString());
            resolve(consequent.success(null, null));
          } else {
            alert(val.message);
            reject(httpRequestResult = consequent.error(val.message, 0, null));
          }
        },
        error => {
          alert(error);
          reject(consequent.error(error, 0, null));
        }
      )
    );

    // 弹出模态框
    MyLoading.show();

    /**
     * 判断 当前时间是否大于过期时间
     * 当前时间大于过期时间的情况下, 主动刷新token
     */
    if (new Date().getTime() > tokenexpired) {
      httpRequestResult = await activeRefresh().then(
        (resolve: Consequencer) => resolve,
        (error: Consequencer) => error,
      );

      if (httpRequestResult.result !== 1) {
        // 不为1 表示主动刷新token失败，跳转到登录页面
        this.router.navigate(['login']);
        MyLoading.hide(); // 关闭模态框
        return httpRequestResult;
      }
    }

    /**
     * 判断请求方法，开始通用请求
     */
    if (requestMethod === 'get') {
      // 通用get请求
      const generalGetHttp = () => new Promise(
        (resolve, reject) => this.http.get(`${environment.baseUrl}${requestURL}`, { headers: createHttpHeaders() }).subscribe(
          (val: Consequencer) => {
            if (val.result === 1) {
              resolve(consequent.success(val.data, 'successful'));
            } else if (val.result === 40004) { // 后端验证表示过期
              // 需要前端主动刷新token(所以这里不需要弹出模态框)
              reject(consequent.error(val.message, 40004, val.data));
            } else {
              alert(val.message);
              reject(consequent.error(val.message, val.result, val.data));
            }
          },
          error => {
            alert(error);
            reject(consequent.error(error, 0, null));
          }
        )
      );

      // 开始通用get请求
      httpRequestResult = await generalGetHttp().then(
        (resolve: Consequencer) => resolve,
        async (error: Consequencer) => {
          if (error.result === 40004) {
            return await activeRefresh().then(
              (resolve: Consequencer) => resolve,
              (reject: Consequencer) => reject,
            );
          } else {
            return error;
          }
        }
      );

    } else {
      // 通用post请求
      const generalPostHttp = () => new Promise(
        (resolve, reject) => self.http.post(`${environment.baseUrl}${requestURL}`, requesBody, { headers: createHttpHeaders() }).subscribe(
          (val: Consequencer) => {
            if (val.result === 1) {
              resolve(consequent.success(val.data, 'successful'));
            } else if (val.result === 40004) { // 后端验证表示过期
              // 需要前端主动刷新token(所以这里不需要弹出模态框)
              reject(consequent.error(val.message, 40004, val.data));
            } else {
              alert(val.message);
              reject(consequent.error(val.message, val.result, val.data));
            }
          },
          error => {
            alert(error);
            reject(consequent.error(error, 0, null));
          }
        )
      );

      // 开始通用post请求
      httpRequestResult = await generalPostHttp().then(
        (resolve: Consequencer) => resolve,
        async (error: Consequencer) => {
          if (error.result === 40004) {
            return await activeRefresh().then(
              (resolve: Consequencer) => resolve,
              (reject: Consequencer) => reject,
            );
          } else {
            return error;
          }
        }
      );
    }

    MyLoading.hide(); // 关闭模态框
    return httpRequestResult; // 返回封装的结果即可
  }

  apiget(requestURL: string) {
    return this.GeneralRxjsHttp('get', requestURL, null);
  }

  apipost(requestURL: string, requesBody: object) {
    return this.GeneralRxjsHttp('post', requestURL, requesBody);
  }
}
