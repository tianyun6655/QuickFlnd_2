export default {
  namespaced: true,
  state: {
    from: {
      title: "",
      content: ""
    }
  },
  mutations: {
    /**
     * @description 提交用户信息
     * @param state {Object} 本 store 模块state
     * @param userInfo {Object} 用户信息
     * */
    setFrom(state, From) {
      state.from = From
    }
  }
}