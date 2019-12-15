import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import user from './module/user.store';
import addtopic from './module/addtopic.store';
import im from './module/im.store';

const state = {
  metaInfo: {
    title: 'Quick Flnd',
    keywords: 'Quick Flnd',
    description: 'Quick Flnd'
  }
};
const mutations = {
  CAHNGE_META_INFO(state, metaInfo) {
    state.metaInfo = metaInfo;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    user,
    addtopic,
    im
  },
});