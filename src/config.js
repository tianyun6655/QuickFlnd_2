/**
 * Created by WebStorm
 * Description: next..
 * User: JinwenLong
 * Author: longjinwen
 * Email: 204084802@qq.com
 * Date: 2019/12/14
 * Time: 2:34 下午
 */

//

export const mode = process.env.NODE_ENV;

export const apiDomain = (() => {
  return {
    test: 'http://47.254.23.147:8085',
    development: 'http://47.254.23.147:8085',
    production: 'http://47.254.23.147:8085',
  }[mode];
})();
