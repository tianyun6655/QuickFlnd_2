<template>
  <div class="login-container">
    <div class="pic">
      <img src="/static/images/bg.png" alt />
      <h1>Quick Flnd</h1>
    </div>
    <div class="wrap-content">
      <div class="content">
        <h3>Log In</h3>
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
          <x-input v-model="form.code" title placeholder="Password" type="password">
            <img
              slot="label"
              style="display:block;"
              src="/static/images/icon-002.png"
              width="21"
              height="21"
            />
          </x-input>
        </group>
        <x-button type="primary" class="login-btn" @click.native="handleLogin">Log In</x-button>
        <x-button plain type="primary" class="register-btn" link="/user/register">Registered</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../http/api";
import mixins from "../../mixins";
import { mapMutations } from "vuex";

export default {
  mixins: [mixins],
  data() {
    return {
      form: { phone: "", code: "" }
    };
  },
  mounted() {
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    handleLogin() {
      if (
        !this.form.phone ||
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          this.form.phone
        )
      ) {
        this.responseError("please enter cell phone number");
        return;
      }
      if (
        !this.form.code
      ) {
        this.responseError("please enter passward");
        return;
      }
      this.form.code = Number(this.form.code);
      this.loadingOpen();
      API.login
        .login(this.form)
        .then(({ data }) => {
          this.setUserInfo(data);
          localStorage.setItem("user", JSON.stringify(data));
          this.$store.commit('im/initNIM')
          this.$router.push("/contact");
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
      margin-bottom: 15px;
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
      color: @textWhiteColor;
    }

    .register-btn {
      margin-top: 0.2rem;
    }
  }
}
</style>
