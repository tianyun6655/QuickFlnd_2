<template>
  <div class="chating-list">
    <div class="chating-info">
      <div class="timer">
        <span class="txt">20:35 PM</span>
      </div>
      <ul class="msg-list" id="msg-list"></ul>
    </div>
    <div class="chating-btn">
      <x-input title class="weui-vcode" v-model="input">
        <x-button slot="right" type="primary" mini @click.native="sendText()">Send</x-button>
      </x-input>
    </div>
  </div>
</template>

<script>
import API from "../../../http/api";
import mixins from "../../../mixins";
export default {
  mixins: [mixins],
  name: "ChatingList",
  data() {
    return {
      input: "",
      toid: "",
      name: ""
    };
  },
  computed: {
    ToList() {
      return this.$store.state.im.toList;
    }
  },
  mounted() {
    const toid = this.getQueryVariable()["toid"];
    const name = this.getQueryVariable()["name"];
    if (toid && name) {
      if (toid === this.$store.state.user.userInfo.uid) {
        this.responseError("error");
        return;
      }
      this.toid = toid;
      this.name = name;
    } else {
      this.responseError("no data");
    }
    this.setList();
  },
  methods: {
    // 渲染聊天记录
    setList() {
      let _TEM = "";
      this.$store.state.im.toList.map(item => {
        if (item.other == this.toid) {
          item.list.map(list => {
            let _tem = ''
            if (list.type == 'come') {
              _tem = `
                <li class=''>
                  <div class="info-content">
                    <img src="/static/images/user-001.png" class="pic" />
                    <div class="remarks">
                      ${list.text}
                    </div>
                  </div>
                </li>
              `;
            } else {
              _tem = `
                <li class='self'>
                <div class="info-content">
                  <img src="/static/images/user-002.png" class="pic" />
                  <div class="remarks">
                    ${list.text}
                  </div>
                </div>
              </li>
              `;
            }
            _TEM += _tem;
          })
        }
      });
      document.getElementById("msg-list").innerHTML = _TEM;
    },
    getQueryVariable() {
      let formattedParams = {};
      let _arr = [];
      location.href.split("#").map(u => {
        u.split("?").length > 1 &&
          u
            .split("?")[1]
            .split("&")
            .map(m => {
              _arr.push(m);
            });
      });
      for (let i = 0; i < _arr.length; i++) {
        formattedParams[_arr[i].split("=")[0]] = _arr[i].split("=")[1];
      }
      return formattedParams;
    },
    sendText() {
      if (!this.input) {
        return;
      }
      const _this = this;
      API.im
        .translate({ text: this.input })
        .then(({ data }) => {
          var msg = this.$store.state.im.nim.sendText({
            scene: "p2p",
            type: "text",
            to: this.toid,
            text: data.text,
            custom: JSON.stringify({ name: this.name }),
            done: function sendMsgDone(error, msg) {
              // ...
              // 自我发信的模板
              let toList = _this.$store.state.im.toList;
              let _index = -1;
              toList.map((item, index) => {
                if (
                  item.other == msg.from || item.other == msg.to
                ) {
                  _index = index;
                }
              });
              if (_index > -1) {
                toList[_index]["list"].push({
                  type: "go",
                  text: msg.text
                });
              } else {
                toList.push({
                  other:
                    _this.$store.state.user.userInfo.uid == msg.from
                      ? msg.to
                      : msg.from,
                  othername: JSON.parse(msg.custom)['name'], 
                  time: msg.time, 
                  self: _this.$store.state.user.userInfo.uid,
                  list: [{ type: "go", text: msg.text }]
                });
              }
              _this.$store.commit("im/setToList", toList);
              _this.input = "";
              _this.setList()
            }
          });
        })
        .catch(e => {
          this.responseError(e);
        })
        .finally(() => {
          this.loadingClose();
        });
    }
  },
  watch: {
    'ToList': {
      handler () {
        this.setList()
      },
      deep: true
    }
  }
};
</script>

<style lang="less">
@import "~@/style/varibles.less";
.chating-list {
  margin-bottom: 49px;
}

.chating-info {
  padding: 0 15px;

  .timer {
    margin: 16px auto;
    height: 16px;
    line-height: 16px;
    font-size: 0;
    text-align: center;

    .txt {
      padding: 0 0.3rem;
      display: inline-block;
      background: @bgLineColor;
      border-radius: 0.16rem;
      font-size: 0.2rem;
      color: @textWhiteColor;
    }
  }

  ul {
    overflow: hidden;

    li {
      margin-bottom: 0.4rem;
      overflow: hidden;

      .info-content {
        float: left;
        margin-bottom: 10px;
        max-width: 76%;
        overflow: hidden;

        &:last-child {
          margin-bottom: 0;
        }

        .pic {
          float: left;
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }

        .remarks {
          float: right;
          display: block;
          margin-top: 0.05rem;
          padding: 0.23rem 0.3rem;
          width: calc(100% - 0.9rem);
          line-height: 0.34rem;
          background: @bgBlueColor;
          border-radius: 0.06rem;
          font-size: 0.24rem;
          color: @textWhiteColor;
        }
      }

      &.self {
        .info-content {
          float: right;

          .pic {
            float: right;
          }

          .remarks {
            float: left;
            background: @bgGrayColor;
          }
        }
      }
    }
  }
}

.chating-btn {
  position: fixed;
  bottom: 49px;
  left: 0;
  width: 100%;
  height: 0.96rem;
  background: @bgColor;

  /deep/ .weui-cell {
    padding: 7px 16px 0;

    .weui-cell__bd {
      padding-right: 15px;

      .weui-input {
        padding: 15px;
        height: 34px;
        background: #f2f3f7;
        border-radius: 4px;
      }
    }

    .weui-btn {
      width: 70px;
      height: 34px;
      background: @bgBlueColor;
      font-size: 15px;

      &::after {
        height: 0;
        border: none;
      }
    }
  }

  .mint-field {
    float: left;
    width: 68%;
    height: 0.68rem;
    min-height: 0.68rem;
    background: #f2f3f7;
    border-radius: 0.08rem;

    /deep/ .mint-cell-wrapper {
      background: none;
    }

    /deep/ .mint-field-core {
      background: #f2f3f7;
    }
  }

  .mint-button {
    position: absolute;
    right: 0.32rem;
    top: 0.14rem;
    width: 27%;
    height: 0.68rem;
    line-height: 0.68rem;
    border-radius: 0.08rem;
    text-align: center;
    font-size: 0.3rem;
  }
}
</style>
