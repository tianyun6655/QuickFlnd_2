<template>
  <ul class="chat-list">
    <li v-for="(item, index) in contactList.list" :key="index">
      <figure>
        <router-link :to="'/dialogueing?toid=' + item.friend + '&name=' + item.name" class="pic">
          <img src="/static/images/user-001.png" alt />
        </router-link>
        <figcaption class="pull-left">
          <h5 >{{item.name || item.friend}}</h5>
        </figcaption>
      </figure>
    </li>
  </ul>
</template>

<script>
import API from "../../../http/api";
import mixins from "../../../mixins";
export default {
  mixins: [mixins],
  name: "List",
  data() {
    return {
      contactList: []
    };
  },
  created() {
    this.getContactList();
  },
  methods: {
    getContactList() {
      this.loadingClose()
      this.loadingOpen();
      API.freind
        .list({ id: this.$store.state.user.userInfo.uid })
        .then(({ data }) => {
          this.contactList = data;
        })
        .catch(e => {
          this.responseError(e);
        })
        .finally(() => {
          this.loadingClose();
        });
    },
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
    margin-left: 50px;

    .pic {
      display: block;
      float: left;
      margin-left: -50px;
      width: 35px;
      height: 35px;
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

      h5 {
        line-height: 35px;
        font-weight: normal;
        font-size: 15px;
        color: @bgGrayColor;
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
