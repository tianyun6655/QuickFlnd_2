// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import router from './router';
import Meta from 'vue-meta';
import store from './store';
import 'styles/reset.css';
import {
  XHeader,
  Tabbar,
  XButton,
  CheckIcon,
  XInput,
  Group,
  CellBox,
  Cell,
  Datetime,
  PopupRadio,
  PopupPicker,
  XImg,
  ViewBox,
  TabbarItem,
  DevicePlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
} from 'vux';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(Meta);
Vue.component('x-header', XHeader);
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('x-button', XButton);
Vue.component('check-icon', CheckIcon);
Vue.component('x-input', XInput);
Vue.component('group', Group);
Vue.component('cell-box', CellBox);
Vue.component('cell', Cell);
Vue.component('datetime', Datetime);
Vue.component('popup-radio', PopupRadio);
Vue.component('popup-picker', PopupPicker);
Vue.component('x-img', XImg);
Vue.component('view-box', ViewBox);
// plugins
Vue.use(DevicePlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(WechatPlugin);

/* const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
} */

sync(store, router);

router.beforeEach((to, from, next) => {
  if (to.meta.metaInfo) {
    store.commit('CAHNGE_META_INFO', to.meta.metaInfo);
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  metaInfo() {
    return {
      title: this.$store.state.metaInfo.title,
      meta: [{
        name: 'keywords',
        content: this.$store.state.metaInfo.keywords
      }, {
        name: 'description',
        content: this.$store.state.metaInfo.description
      }]
    };
  },
  components: { App },
  template: '<App/>',

});