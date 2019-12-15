<template>
  <div class="notice-list">
    <ul>
      <li class="add">
        <div class="notice-content fl">
          <h3>XXX apply to add you</h3>
          <p class="info-time">2019-06-23 17:30</p>
        </div>
        <div class="notice-btns fr">
          <x-button class="btn-refuse" plain @click.native="handldRefuse">Refuse</x-button>
          <x-button class="btn-agree" type="primary" @click.native="handldAgree">Agree</x-button>
        </div>
      </li>
      <li class="dialogue">
        <div class="notice-content fl">
          <h3>Xxx has been requested by your friend</h3>
          <p class="info-time">2019-06-23 17:30</p>
        </div>
        <div class="notice-btns fr">
          <x-button class="btn-dialogue" type="primary" @click.native="handldDialogue">Dialogue</x-button>
        </div>
      </li>
      <li class="message">
        <div class="notice-content fl">
          <h3>Xxx sent you a message</h3>
          <p class="info-time">2019-06-23 17:30</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      handldRefuse () {
        alert('Refuse')
      },
      handldAgree () {
        alert('Agree')
      },
      handldDialogue () {
        alert('Dialogue')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~@/style/varibles.less';

  .notice-list {
    ul {
      padding: 0 .32rem;

      li {
        padding: .3rem 0;
        border-bottom: @borderTop;
        overflow: hidden;

        .notice-content {
          h3 {
            padding-right: .2rem;
            line-height: .38rem;
            font-weight: normal;
            font-size: .26rem;
            color: @textBlueColor;
            .ellipsis-mult(1);
          }

          .info-time {
            line-height: .3rem;
            font-size: .22rem;
            color: @textColor;
          }
        }

        .notice-btns {
          padding-top: .03rem;
          font-size: 0;

          .weui-btn {
            display: inline-block;
            padding: 0;
            width: 1.2rem;
            height: .6rem;
            line-height: .6rem;
            border-radius: .3rem;
            font-size: .24rem;
            text-align: center;
          }

          .weui-btn + .weui-btn {
            margin-top: 0;
            margin-left: .2rem;
          }

          .btn-refuse {
            border: @borderTop;
          }

          .btn-dialogue {
            width: 1.6rem;
          }
        }

        &.add {
          .notice-content {
            width: calc(100% - 2.6rem);
          }
        }

        &.dialogue {
          .notice-content {
            width: calc(100% - 1.6rem);
          }
        }

        &.message {
          .notice-content {
            width: 100%;

            h3 {
              padding-right: 0;
            }
          }
        }
      }
    }
  }
</style>
