//
import axios from 'axios';

import Vue from 'vue';
import {apiDomain} from '../config';

class Http extends Vue {
  constructor () {
    super();
  }

  request (config) {
    return new Promise((resolve, reject) => {

      config = Object.assign({
        headers: {}
      }, config);

      axios.create({
        baseURL: apiDomain,
        timeout: 1000 * 30,
        validateStatus: function (status) {
          return status === 200;
        }
      })
        .request(config)
        .then(response => {

          if (response.data.code === 200) {
            return resolve(response.data);
          }
          reject({
            httpStatus: 200,
            message: response.data.message
          });

        })
        .catch(error => {
          if (error.response) {

            // 非200状态码
            return reject({
              httpStatus: error.response.status,
              message: error.response.data.message || 'network error(' + error.response.status + ')'
            });
          }

          // 无响应 || 断网
          reject({httpStatus: 0, message: 'network error(0)'});

        });

    });

  }

}

export default Http;
