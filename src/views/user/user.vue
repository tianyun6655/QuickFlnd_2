<template>
  <div class="user-container">
    <div class="user-info">
      <figure>
        <figcaption class="fl">
          <h4>
            Avatar
          </h4>
        </figcaption>
        <img src="/static/images/user-001.png" alt="" class="pic fr">
      </figure>
    </div>
    <div class="blank-18"></div>
    <group>
      <x-input title="Nickname" v-model="Nickname" placeholder-align='right' text-align='right'></x-input>
      <x-input title="Phone Number" v-model="number" placeholder-align='right' text-align='right'></x-input>
      <x-input title="Age" v-model="age" placeholder-align='right' text-align='right'></x-input>
      <popup-radio title="Gender" :options="optionsGender" v-model="gender">
        <p slot="popup-header" class="vux-1px-b gender-title">Choose gender</p>
      </popup-radio>
      <div style="padding:10px"><x-button type="primary" @click.native="submit">submit</x-button></div>
    </group>
  </div>
</template>

<script>
import API from "../../http/api";
import mixins from "../../mixins";
  export default {
  mixins: [mixins],
    data () {
      return {
        optionsGender: ['Male', 'Female'],
        gender: 'Female',
        Nickname: '',
        number: '',
        age: ''
      }
    },
    methods: {
      submit() {
        if (!this.Nickname || !this.age) {
          this.responseError("some information is missing");
          return;
        }
        this.age = Number(this.age)
        API.edit.update({ 
          uid: this.$store.state.user.userInfo.uid,
          nickname: this.nickname, 
          age: this.age 
        })
        .then(({ data }) => {
          this.responseError('success')
        })
        .catch(e => {
          this.responseError(e);
        })
        .finally(() => {
          this.loadingClose();
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~@/style/varibles.less';

  .user-container {
    width: 100%;
    height: 100%;

    .user-info {
      padding: 15px;
      position: relative;
      background: @bgColor;
      overflow: hidden;

      figure {
        .pic {
          display: block;
          width: 1.22rem;
          height: 1.22rem;
          border-radius: 50%;
          overflow: hidden;
        }

        figcaption {
          width: 50%;

          h4 {
            line-height: 1.22rem;
            font-weight: normal;
            font-size: .3rem;
            color: #666;
          }
        }
      }
    }

    /deep/ .weui-cells {
      margin-top: 0;

      &::before,
      &::after {
        height: 0;
        border-width: 0;
      }

      .weui-cell {
        padding: 16px 16px 15px;

        &::before {
          border-color: @bgLineColor;
        }

        .vux-label {
          font-size: 15px;
          color: #666;
        }

        .weui-cell__ft, .vux-cell-value {
          font-size: 12px;
          color: @textBlueColor;
        }

        &.vux-datetime {
          color: #666;
        }

        .weui-label {
          color: #666;
        }
      }
    }
  }

  .gender-title {
    text-align: center;
    padding: .2rem 0;
    font-weight: 600;
    font-size: .34rem;
    color: #444;
  }
</style>

<style lang="less">
  .dp-container {
    .dp-header {
      .vux-datetime-clear {
        font-weight: 600;
        font-size: .34rem !important;
        color: #444 !important;
      }
    }
  }
</style>
