<template>
  <ul class="chat-list">
    <li v-for="(item, index) in toList" :key="index">
      <figure>
        <router-link :to="'/dialogueing?toid=' + item.other + '&name=' + item.othername" class="pic">
          <img src="/static/images/user-001.png" alt />
        </router-link>
        <figcaption class="pull-left">
          <h4>
            <router-link to="/dialogueing">{{decodeURI(item.othername)}}</router-link>
          </h4>
          <p class="remarks">{{item.list[item.list.length - 1]['text']}}</p>
          <div class="time">{{formatData(item.time, 'yyyy-MM-dd hh:mm:ss')}}</div>
        </figcaption>
      </figure>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      toList: []
    };
  },
  mounted() {
    this.toList = this.$store.state.im.toList;
  },
  methods: {
    formatData(value, fmt) {
      if (!value) {
        return "";
      }
      let getDate = new Date(value);
      let o = {
        "M+": getDate.getMonth() + 1,
        "d+": getDate.getDate(),
        "h+": getDate.getHours(),
        "m+": getDate.getMinutes(),
        "s+": getDate.getSeconds(),
        "q+": Math.floor((getDate.getMonth() + 3) / 3),
        S: getDate.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/varibles.less";

.chat-list {
  padding: 0 15px;
  background: @bgColor;
  overflow: hidden;
}

.chat-list li {
  padding: 15px 0;
  position: relative;
  overflow: hidden;

  figure {
    margin-left: 78px;

    .pic {
      display: block;
      float: left;
      margin-left: -78px;
      width: 58px;
      height: 58px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: top;
      }
    }

    .pull-left {
      float: left;
      position: relative;
      width: 100%;

      h4 {
        line-height: 19px;
        font-weight: 600;
        font-size: 13px;
        color: @bgBlueColor;
      }

      .remarks {
        margin-top: 0.06rem;
        height: 0.66rem;
        line-height: 0.33rem;
        font-size: 12px;
        color: #666;
        overflow: hidden;
        .ellipsis-mult(2);
      }

      .time {
        position: absolute;
        right: 0;
        top: 0;
        height: 0.38rem;
        line-height: 0.38rem;
        font-size: 11px;
        color: #9092a5;
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(73, 74, 79, 0.2);
  }
}
</style>
