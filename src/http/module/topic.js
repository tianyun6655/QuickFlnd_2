/**
 * Created by WebStorm
 * Description: next..
 * User: lojwen
 * Author: longjinwen
 * Email: 204084802@qq.com
 * Date: 2019-06-17
 * Time: 22:38
 */

//
import Http from '../http';

import * as httpUtils from '../utils';

export function list(param = {}) {
  return new Http().request({
    url: '/quick_find/topic/list',
    // data: httpUtils.makeFormData(param), // multipart/form-data
    // data: httpUtils.makeQueryString(param), // application/x-www-form-urlencoded
    data: param, //application/json
    method: 'post'
  });
}

export function publish(param = {}) {
  return new Http().request({
    url: '/quick_find/topic/publish',
    // data: httpUtils.makeFormData(param), // multipart/form-data
    // data: httpUtils.makeQueryString(param), // application/x-www-form-urlencoded
    data: param, //application/json
    method: 'post'
  });
}