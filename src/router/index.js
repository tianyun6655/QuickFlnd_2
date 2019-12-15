import Vue from 'vue';
import Router from 'vue-router';
import Notice from '@/views/notice/index';
import Dialogue from '@/views/dialogue/index';
import Dialogueing from '@/views/dialogue/dialogueing';
import Contact from '@/views/contact/index';
import Square from '@/views/square/index';
import Topic from '@/views/topic/index';
import Add from '@/views/topic/add';
import My from '@/views/user/index';
import Personal from '@/views/user/user';
import Phone from '@/views/user/phone';
import Nickname from '@/views/user/nickname';
import UserLogin from '@/views/user/login';
import UserRegister from '@/views/user/register';

Vue.use(Router);
let router = new Router({
  routes: [{
    path: '/notice',
    name: 'Notice',
    component: Notice,
    meta: {
      metaInfo: {
        title: 'Notice - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      footerShow: false
    }
  }, {
    path: '/dialogue',
    name: 'Dialogue',
    component: Dialogue,
    meta: {
      metaInfo: {
        title: 'Dialogue - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      }
    }
  }, {
    path: '/dialogueing',
    name: 'Dialogueing',
    component: Dialogueing,
    meta: {
      metaInfo: {
        title: 'Dialogueing - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      }
    }
  }, {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      metaInfo: {
        title: 'Contact - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      }
    }
  }, {
    path: '/square',
    name: 'Square',
    component: Square,
    meta: {
      metaInfo: {
        title: 'Square - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      }
    }
  }, {
    path: '/topic',
    name: 'Topic',
    component: Topic,
    meta: {
      metaInfo: {
        title: 'Topic - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      footerShow: true
    }
  }, {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: {
      metaInfo: {
        title: 'Add - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      footerShow: false
    }
  }, {
    path: '/my',
    name: 'My',
    component: My,
    meta: {
      metaInfo: {
        title: 'My - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      headerShow: false
    }
  }, {
    path: '/personal',
    name: 'Personal',
    component: Personal,
    meta: {
      metaInfo: {
        title: 'Personal information - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      footerShow: false
    }
  }, {
    path: '/personal/phone',
    name: 'Phone',
    component: Phone,
    meta: {
      metaInfo: {
        title: 'Change phone - Personal information - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      footerShow: false
    }
  }, {
    path: '/personal/nickname',
    name: 'Nickname',
    component: Nickname,
    meta: {
      metaInfo: {
        title: 'Change nickname - Personal information - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      footerShow: false
    }
  }, {
    path: '/',
    name: 'UserLogin',
    component: UserLogin,
    meta: {
      metaInfo: {
        title: 'Login - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      headerShow: false,
      footerShow: false
    }
  }, {
    path: '/user/register',
    name: 'UserRegister',
    component: UserRegister,
    meta: {
      metaInfo: {
        title: 'Register - Quick Flnd',
        keywords: 'Quick Flnd',
        description: 'Quick Flnd'
      },
      headerShow: false,
      footerShow: false
    }
  }]
});
router.beforeEach((to, from, next) => {
  if (['UserLogin', 'UserRegister'].includes(to.name) || localStorage.getItem('user')) {
    return next();
  }
  next({ name: 'UserLogin' });
});
export default router;