// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Angular 是怎么实现自动切换不同的开发环境呢？
 * 在执行 ng build ---prod 命令，进行项目构建的时候，会执行文件替换操作。而相应的文件替换规则，在 angular.json 文件中定义：
 * "production": {
 *   "fileReplacements": [
 *     {
 *       "replace": "src/environments/environment.ts",
 *       "with": "src/environments/environment.prod.ts"
 *     }
 *   ],
 * }
 */
export const environment = {
  production: false,
  baseUrl: '/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
