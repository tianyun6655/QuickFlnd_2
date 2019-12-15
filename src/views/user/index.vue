<template>
  <div class="user-container">
    <div class="user-info">
      <figure>
        <img src="/static/images/user-001.png" alt="" class="pic fl">
        <figcaption class="fl">
          <h4>
            {{userInfo.userName}}
          </h4>
          <div class="remarks">ID:{{userInfo.uid}}</div>
        </figcaption>
      </figure>
      <x-button link="/personal">Edit</x-button>
    </div>
    <div class="blank-18"></div>
    <group>
      <cell title="Version" value="v.1.0.1" is-link link="/"></cell>
      <cell title="User Agreement" value="" is-link link="/"></cell>
      <cell title="Feedback" value="" is-link link="/"></cell>
      <cell title="Clear Cache" value="26M" is-link link="/"></cell>
    </group>
    <div class="blank-18"></div>
    <div @click="signOut">
      <x-button class="signout-btn" >Sign Out</x-button>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    data () {
      return {};
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo;
      }
    },
    mounted () {

    },
    methods: {
      signOut () {
        // alert()
        localStorage.removeItem('user');
        this.$router.replace({name: 'UserLogin'});
      }
    }
  };
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
        margin-left: 1.44rem;

        .pic {
          display: block;
          margin-left: -1.44rem;
          width: 1.22rem;
          height: 1.22rem;
          border-radius: 50%;
          overflow: hidden;
        }

        figcaption {
          width: 100%;

          h4 {
            margin-top: .18rem;
            line-height: .42rem;
            font-weight: 600;
            font-size: .3rem;
            color: #666;
          }

          .remarks {
            margin-top: .1rem;
            line-height: .34rem;
            font-size: .24rem;
            color: @textColor;
          }
        }
      }

      .weui-btn {
        position: absolute;
        right: 15px;
        top: 28px;
        width: 1.13rem;
        height: 35px;
        line-height: .7rem;
        background: @bgColor;
        border: @borderBlue;
        border-radius: 4px;
        font-weight: 600;
        font-size: 14px;
        color: @textBlueColor;

        &::after {
          width: 0;
          height: 0;
          border: none;
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

        .weui-cell__ft {
          font-size: 12px;
          color: @textBlueColor;
        }
      }
    }

    .signout-btn {
      height: 55px;
      background: #fff;
      border-radius: 0;
      font-size: 17px;
      font-weight: 600;
      color: @textBlueColor;

      &::after {
        border: none;
      }
    }
  }
</style>
