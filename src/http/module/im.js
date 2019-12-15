//
import Http from '../http';

import * as httpUtils from '../utils';

/**
 * @description 测试 get 请求
 * @param param {Object}
 * */
export function get(param = {}) {
  return new Http().request({
    url: '/get',
    params: param,
    method: 'get'
  });
}

/**
 * @description 测试 post 请求
 * @param param {Object}
 * */
export function translate(param = {}) {
  return new Http().request({
    url: '/quick_find/im/translate',
    // data: httpUtils.makeFormData(param), // multipart/form-data
    // data: httpUtils.makeQueryString(param), // application/x-www-form-urlencoded
    data: param, //application/json
    method: 'post'
  });
}