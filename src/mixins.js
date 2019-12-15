/**
 * Created by WebStorm
 * Description: next..
 * User: JinwenLong
 * Author: longjinwen
 * Email: 204084802@qq.com
 * Date: 2019/12/14
 * Time: 3:19 下午
 */

//

export default {
  methods: {
    responseError(error) {
      this.$vux.toast.text(typeof error === 'object' ?
        (error.message || error.toString()) :
        error, 'top');
    },
    loadingOpen(text = 'Loading') {
      this.$vux.loading.show({
        text
      });
    },
    loadingClose() {
      this.$vux.loading.hide();
    },
    alertOpen(text = '', onConfirmFn, onCancelFn = function() {}) {
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '',
        content: text,
        confirmText: 'Yes',
        cancelText: 'No',
        onCancel() {
          onCancelFn()
        },
        onConfirm() {
          onConfirmFn()
        }
      })
    }

  }
};
