<template>
  <div id="app">
    <view-box
      ref="viewBox"
      :body-padding-top="(route.meta.headerShow === undefined || route.meta.headerShow) ? bodyPaddingTop : '0'"
      :body-padding-bottom="(route.meta.footerShow === undefined || route.meta.footerShow) ? bodyPaddingBottom : '0'"
    >
      <x-header
        v-show="route.meta.headerShow === undefined || route.meta.headerShow"
        ref="header"
        slot="header"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        :transition="headerTransition"
      >
        <span
          slot="right"
          @click="handleRightClick"
          :class="'type-' + rightTitleType"
        >{{rightTitle}}</span>
      </x-header>
      <router-view class="router-view" />
      <footer-bar
        slot="bottom"
        ref="footer"
        v-show="route.meta.footerShow === undefined || route.meta.footerShow"
      />
    </view-box>
  </div>
</template>

<script>
import AddTopicAPI from "./http/api";
import Footer from "./components/FooterBar";
import { mapState, mapMutations } from "vuex";
import mixins from "./mixins";

export default {
  name: "App",
  mixins: [mixins],
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path
    }),
    leftOptions() {
      return {
        showBack:
          this.route.path === "/dialogueing" ||
          this.route.path === "/notice" ||
          this.route.path === "/personal" ||
          this.route.path === "/personal/phone" ||
          this.route.path === "/personal/nickname" ||
          this.route.path === "/add",
        backText: "Return"
      };
    },
    rightOptions() {
      return {
        showMore: false
      };
    },
    headerTransition() {
      if (!this.direction) return "";
      return this.direction === "forward"
        ? "vux-header-fade-in-right"
        : "vux-header-fade-in-left";
    },
    title() {
      if (this.route.path === "/") return "Dialogue";
      if (this.route.path === "/dialogue") return "Dialogue";
      if (this.route.path === "/dialogueing") return "";
      if (this.route.path === "/contact") return "Contact";
      if (this.route.path === "/square") return "Square";
      if (this.route.path === "/notice") return "Notice";
      if (this.route.path === "/personal") return "Personal information";
      if (this.route.path === "/topic") return "Topic";
      if (this.route.path === "/add") return "Topic - Add";
      if (this.route.path === "/personal/phone") return "Phone Number";
      if (this.route.path === "/personal/nickname") return "Nickname";
    },
    rightTitle() {
      if (this.route.path === "/dialogue") return "Notice";
      if (this.route.path === "/topic") return "Add";
      if (this.route.path === "/add") return "Release";
      if (this.route.path === "/personal/phone") return "Save";
      if (this.route.path === "/personal/nickname") return "Save";
    },
    rightTitleType() {
      if (this.route.path === "/add") return "button";
    }
  },
  components: {
    "footer-bar": Footer
  },
  mounted() {
    this.$store.commit('im/initNIM')
    this.$nextTick(() => {
      this.bodyPaddingTop = (this.$refs.header.$el.clientHeight || 44) + "px";
      this.bodyPaddingBottom = (this.$refs.footer.$el.clientHeight || 49) + "px";
    });
  },
  created() {
    if (localStorage.getItem("user")) {
      this.setUserInfo(JSON.parse(localStorage.getItem("user")));
    }
  },
  data() {
    return {
      entryUrl: document.location.href,
      bodyPaddingTop: "",
      bodyPaddingBottom: ""
    };
  },
  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    ...mapMutations("addtopic", ["setFrom"]),

    handleRightClick() {
      if (this.route.path === "/dialogue") {
        this.$router.push({ path: "/notice" });
        return;
      }
      if (this.route.path === "/personal/phone") {
        alert("Success");
        return;
      }
      if (this.route.path === "/personal/nickname") {
        alert("Success");
        return;
      }
      if (this.route.path === "/topic") {
        this.$router.push({ path: "/add" });
        return;
      }
      if (this.route.path === "/add" && this.rightTitleType === "button") {
        if (
          !this.$store.state.addtopic.from ||
          !this.$store.state.addtopic.from.title ||
          !this.$store.state.addtopic.from.content
        ) {
          this.responseError("some information is missing");
          return;
        }
        this.loadingOpen();
        AddTopicAPI.topic
          .publish(this.$store.state.addtopic.from)
          .then(({ data }) => {
            this.setFrom({ title: '', content: '', uid: '' });
            this.$router.push("/topic");
          })
          .catch(e => {
            this.responseError(e);
          })
          .finally(() => {
            this.loadingClose();
          });
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/varibles.less";

.vux-header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  .type-button {
    background-color: #3ac8fd;
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 4px;
  }
}

.router-view {
  width: 100%;
}

.weui-tabbar {
  background: @bgColor;

  &::before {
    border-color: @bgLineColor;
  }

  /deep/ .weui-tabbar__item {
    padding-top: 4px;

    .weui-tabbar__icon {
      width: 24px;
      height: 24px;
    }

    .weui-tabbar__label {
      font-size: 11px;
      color: @textColor;
    }

    &.weui-bar__item_on {
      .weui-tabbar__label {
        color: @textBlueColor;
      }
    }
  }
}
</style>

<style lang="less">
@import "~vux/src/styles/1px.less";
</style>
