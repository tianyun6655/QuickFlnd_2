<template>
  <div class="topic-container">
    <div class="topic-info" v-for="(item, index) in topicList.list" :key="index">
      <div class="user-info">
        <img @click="addFreind(item.uid)" src="/static/images/user-001.png" alt class="pic fl" />
        <div class="user-content fl">
          <h4>{{item.title}}</h4>
          <p class="topic-time">{{item.timestamp}}</p>
        </div>
      </div>
      <div class="topic-content">
        <div class="remarks pics">
          <p
            class="txt"
          >{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../http/api";
import mixins from "../../mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      topicList: []
    };
  },
  created() {
    this.gettopicList();
  },
  methods: {
    addFreind(uid) {
      const _this = this
      this.alertOpen("Do you want to add ?", function() {
        API.freind
          .add({ uid: _this.$store.state.user.userInfo.uid, friend_id: uid })
          .then(({ data }) => {
            // do something...
            _this.responseError('success');
          })
          .catch(e => {
            _this.responseError(e);
          })
          .finally(() => {
            _this.loadingClose();
          });
      });
    },
    gettopicList() {
      this.loadingOpen();
      API.topic
        .list({ uid: this.$store.state.user.userInfo.uid })
        .then(({ data }) => {
          this.topicList = data;
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

.topic-container {
  margin-bottom: 49px;
  background-color: #fff;

  .topic-info {
    .user-info {
      padding: 0.22rem;
      overflow: hidden;

      .pic {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }

      .user-content {
        padding-left: 0.22rem;
        padding-top: 0.14rem;
        width: calc(100% - 1rem);

        h4 {
          line-height: 0.42rem;
          font-weight: 600;
          font-size: 0.3rem;
          color: @textBlueColor;
        }

        .topic-time {
          line-height: 0.3rem;
          font-size: 0.22rem;
          color: @textColor;
        }
      }
    }

    .topic-content {
      padding: 0 0.32rem 0.22rem;

      h3 {
        line-height: 0.38rem;
        font-weight: 600;
        font-size: 0.26rem;
        color: #444;
      }

      .remarks {
        .txt {
          padding-right: 1rem;
          line-height: 0.36rem;
          font-size: 0.24rem;
          color: #666;
          word-break: normal !important;
          .ellipsis-mult(4);
        }

        &.pics {
          padding-left: 1.16rem;

          .txt {
            padding-right: 0;
          }
        }
      }

      .pic {
        margin-top: 0.12rem;

        img {
          max-width: 100%;
        }

        &.pics {
          padding-left: 1.16rem;
          overflow: hidden;

          .info {
            float: left;
            margin-right: 1%;
            width: 32%;

            .img {
              max-width: 100%;
            }

            &:nth-child(3n) {
              margin-right: 0;
            }

            &:nth-child(n + 3) {
              margin-bottom: 1%;
            }
          }
        }
      }
    }
  }
}
</style>
