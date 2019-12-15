import SDK from '../../../static/js/NIM_Web_SDK_v7.0.3'
import User from './user.store'
export default {
  namespaced: true,
  state: {
    nim: null,
    toList: [],
  },
  getters: {
    getNIM: (state) => { return state.nim }
  },
  // mutations
  // 同步触发数据变动
  // 调用方式 this.$store.commit('im/initNIM')
  mutations: {
    setToList(state, tolist) {
      state.toList = tolist
    },
    initNIM(state) {
      if (!User.state.userInfo.uid || !User.state.userInfo.token) { return }
      state.nim = SDK.NIM.getInstance({
        debug: false,
        appKey: '3a2c15109bc3b854708ba18f1d7e39ba',
        account: User.state.userInfo.uid,
        token: User.state.userInfo.token,
        transports: ['websocket'],
        db: false,
        // logFunc: new SDK.NIM.LoggerPlugin({
        //   url: '/webdemo/h5/getlogger',
        //   level: 'info'
        // }),
        syncSessionUnread: true,
        syncRobots: true,
        autoMarkRead: true, // 默认为true
        onconnect: function onConnect(event) {
          console.log('init success')
        },
        onerror: function onError(event) {
          // alert(JSON.stringify(event))
          debugger
          alert('网络连接状态异常')
        },
        onwillreconnect: function onWillReconnect() {
          console.log(event)
        },
        ondisconnect: function onDisconnect(error) {
          switch (error.code) {
            // 账号或者密码错误, 请跳转到登录页面并提示错误
            case 302:
              break
              // 被踢, 请提示错误后跳转到登录页面
            case 'kicked':
              break
            default:
              break
          }
        },
        onmsg: function onMsg(msg) {
          // 此处为委托消息事件，消息发送成功后，成功消息也在此处处理
          let _index = -1
          let toList = state.toList
          toList.map((item, index) => {
            if (
              item.other == msg.from || item.other == msg.to
            ) {
              _index = index
            }
          })
          if (_index > -1) {
            toList[_index]['list'].push({ type: 'come', text: msg.text })
          } else {
            toList.push({
              other: User.state.userInfo.uid == msg.from ? msg.to : msg.from,
              othername: JSON.parse(msg.custom)['name'],
              time: msg.time,
              self: User.state.userInfo.uid,
              list: [{
                type: 'come',
                text: msg.text
              }]
            })
          }
          state.toList = toList
        }
      })
    }
  }
}