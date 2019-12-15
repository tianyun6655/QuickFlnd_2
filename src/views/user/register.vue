<template>
  <div class="login-container">
    <div class="pic">
      <img src="/static/images/bg.png" alt />
      <h1>Quick Flnd</h1>
    </div>
    <div class="wrap-content">
      <div class="content">
        <h3>Registered</h3>
        <group>
          <x-input
            v-model="form.phone"
            title
            placeholder="Phone number"
            keyboard="number"
            is-type="china-mobile"
          >
            <img
              slot="label"
              style="display:block;"
              src="/static/images/icon-001.png"
              width="21"
              height="21"
            />
          </x-input>
          <x-input
            v-model="form.code"
            title
            :max="6"
            placeholder="Enter confirmation code"
            class="weui-vcode"
          >
            <img
              slot="label"
              style="display:block;"
              src="/static/images/icon-003.png"
              width="21"
              height="21"
            />
            <x-button
              slot="right"
              plain
              type="primary"
              mini
              class="send-btn"
              @click.native="sendCode"
            >{{ sendStatus ? sendTime : 'Verification'}}</x-button>
          </x-input>
        </group>
        <x-button type="primary" class="login-btn" @click.native="handleRegistered">Registered</x-button>
        <x-button plain type="primary" class="register-btn" link="/">Log In</x-button>
        <check-icon :value.sync="checked">
          I have read and agreed to the
          <em>agreement</em>
        </check-icon>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../http/api";
import mixins from "../../mixins";
let Timer = null;
export default {
  mixins: [mixins],
  data() {
    return {
      form: { phone: "", code: "" },
      checked: false,
      sendStatus: false,
      sendTime: 60
    };
  },
  methods: {
    sendCode() {
      const _this = this;
      this.sendStatus = true;
      if (Timer) {
        return;
      }
      Timer = setInterval(function() {
        _this.sendTime--;
        if (_this.sendTime === 0) {
          _this.sendTime = 60;
          _this.sendStatus = false;
          clearInterval(Timer);
          Timer = null;
        }
      }, 1000);
    },
    handleRegistered() {
      if (
        !this.form.phone ||
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          this.form.phone
        )
      ) {
        this.responseError("please enter cell phone number");
        return;
      }
      if (!this.form.code) {
        this.responseError("please enter code");
        return;
      }
      if (!this.checked) {
        this.responseError("agree with the agreement");
        return;
      }
      this.form.code = Number(this.form.code);
      this.loadingOpen();
      API.register
        .register(this.form)
        .then(({ data }) => {
          const _this = this;
          this.responseError("login in now");
          setTimeout(() => {
            _this.$router.push("/");
          }, 2000);
        })
        .catch(e => {
          this.responseError(e);
        })
        .finally(() => {
          this.loadingClose();
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/varibles.less";

.login-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(55, 54, 50, 1);

  .pic {
    position: relative;

    img {
      width: 100%;
    }

    h1 {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 100%;
      font-weight: 600;
      font-size: 0.6rem;
      color: @textWhiteColor;
      text-align: center;
    }
  }

  .wrap-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 95%;
    transform: translate(-50%, -50%);
    background: @bgColor;
    border-radius: 0.1rem;
  }

  .content {
    padding: 0.3rem;

    h3 {
      line-height: 0.54rem;
      font-size: 0.38rem;
      color: #0b0b0b;
      text-align: center;
    }

    /deep/ .weui-cells {
      margin-top: 0;
      font-size: 14px;

      &::before,
      &::after {
        height: 0;
        border-width: 0;
      }

      .weui-cell {
        padding: 14px 0 15px;

        &::before {
          height: 0;
          border-width: 0;
        }

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 1px;
          border-bottom: @borderTop;
        }

        .weui-cell__hd {
          margin-right: 15px;
        }

        .weui-input {
          height: 20px;
          font-size: 14px;
          color: @textColor;

          ::-webkit-input-placeholder {
            color: @textColor;
          }
        }

        .send-btn {
          padding-right: 0;
          height: 20px;
          line-height: 20px;
          border-width: 0;
          font-size: 0.28rem;
          color: @textBlueColor;
        }
      }
    }

    .weui-btn {
      border-radius: 0.4rem;
      font-size: 15px;

      &::after {
        border: none;
      }
    }

    .login-btn {
      margin-top: 0.6rem;
      border-radius: 0.4rem;
      font-size: 15px;
      color: @textWhiteColor;
    }

    .register-btn {
      margin-top: 0.2rem;
      border-radius: 0.4rem;
      font-size: 15px;
    }

    .vux-check-icon {
      margin: 0.3rem 0 0.1rem;

      /deep/ .weui-icon-circle {
        font-size: 16px;
      }

      /deep/ .weui-icon-success {
        font-size: 16px;

        &:before {
          color: @textBlueColor;
        }
      }

      span {
        font-size: 12px;
        color: @textColor;

        em {
          color: @textBlueColor;
        }
      }
    }
  }
}
</style>
