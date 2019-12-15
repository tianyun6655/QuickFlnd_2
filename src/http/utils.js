/**
 * Created by WebStorm
 * Description: next..
 * User: lojwen
 * Author: longjinwen
 * Email: 204084802@qq.com
 * Date: 2019/12/1
 * Time: 13:34 下午
 */

import qs from 'qs';

/**
 * @deprecated 将对象转成 FormData
 * @param object {Object}
 * */
export function makeFormData (object) {
  let formData = new FormData();
  Object.keys(object).forEach(key => {
    formData.append(key, object[key]);
  });
  return formData;
}

/**
 * @deprecated 将对象转成 query string
 * @param object {Object}
 * */
export function makeQueryString (object) {
  return qs.stringify(object);
}

/**
 * @deprecated 将对象和 BASE_URL 拼成完成 url
 * @param object {Object}
 * @param baseUrl {String | Null}
 * */
export function makeUrl (object, baseUrl = null) {
  !baseUrl && (baseUrl = window.__domain);
  return baseUrl + '?' + qs.stringify(object);
}
