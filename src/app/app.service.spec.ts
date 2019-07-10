/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyServiceService } from './app.service';

/**
 * describe函数封装一个 "测试集"
 */
describe(
  'MyServiceService 测试集',  // 预期的话语
  () => {

    /**
     * 在每个 describe函数封装的测试集 开始之前执行
     * 这里一般执行setup的过程
     */
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [MyServiceService],
        imports: [
          HttpClientTestingModule
        ]
      });
    });

    /**
     * describe函数封装一个 "测试集" 下的 it函数封装 测试用例
     */
    it(
      'encryptSignature数字加密', // 预期的话语
      inject([MyServiceService], // 倚赖注入
        (service: MyServiceService) => { // 注入后即可使用
          /**
           * 通过expect函数，作为程序断言来判断相等关系。
           * 这个可以执行多个 expect() 来测试需要测试的代码，只要任何一个 expect() 结果为 false 就表示该测试用例为失败状态。
           * toBe() 等同 ===
           * toNotBe() 等同 !==
           * toBeDefined() 等同 !== undefined
           * toBeUndefined() 等同 === undefined
           * toBeNull() 等同 === null
           * toBeTruthy() 等同 !!obj
           * toBeFalsy() 等同 !obj
           * toBeLessThan() 等同 <
           * toBeGreaterThan() 等同 >
           * toEqual() 相当于 ==
           * toNotEqual() 相当于 !=
           * toContain() 相当于 indexOf
           * toBeCloseTo() 数值比较时定义精度，先四舍五入后再比较。
           * toHaveBeenCalled() 检查function是否被调用过
           * toHaveBeenCalledWith() 检查传入参数是否被作为参数调用过
           * toMatch() 等同 new RegExp().test()
           * toNotMatch() 等同 !new RegExp().test()
           * toThrow() 检查function是否会抛出一个错误
           */
          const reqParam = 'username=rejiejay&password=DFqew1938167';
          const username = 'rejiejay';
          const token = 'c4ca4238a0b923820dcc509a6f75849b';
          // tslint:disable-next-line: max-line-length
          const expectResult = 'nTX79kJ9ubOpi4O+oAXMUwKzcFs/VKJBGiAyUwAMasbWBBbE+yc9p7c4PL+N00YURzC1UWOCMGjhN4aQyWZOa61mSN4K7DFR1jfkD8tT5Ow=';

          expect(service.encryptSignature(reqParam, username, token)).toBe(expectResult);
        })
    );

    it(
      'AES 加密',
      inject([MyServiceService],
        (service: MyServiceService) => {
          const encryptData = 'username=rejiejay&password=DFqew1938167';
          const sKey = 'I0YmM5NTgtY2IyYi00OWIzLWFkZTktZj';
          const ivParameter = 'BjNzhiZDctOGMxOS';

          const expectResult = 'H0tnzRzip/Ta7irN9I1iZlOsrKTKEvoPcoQC2FmGihAh9ovfy/YMeOjQdtved315';

          expect(service.encryptAES(encryptData, sKey, ivParameter)).toBe(expectResult);
        })
    );
  }
);
