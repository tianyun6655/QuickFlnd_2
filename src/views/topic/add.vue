<template>
  <div class="add" ref="add">
    <input v-model="title" type="text" placeholder="Enter the subject (40 words)" class="add-title" />
    <textarea
      v-model="content"
      class="add-content"
      placeholder="Enter what you want to say at the moment..."
    ></textarea>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Add",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    ...mapMutations("addtopic", ["setFrom"]),
    updateFrom() {
      this.setFrom({ title: this.title, content: this.content, uid: this.$store.state.user.userInfo.uid });
    }
  },
  watch: {
    title() {
      this.updateFrom();
    },
    content() {
      this.updateFrom();
    }
  }
};
</script>

<style lang="less" scoped>
.add {
  background-color: #ffffff;
  padding: 0 16px;
  .add-title {
    width: 100%;
    border-bottom: 1px solid #eee;
    line-height: 34px;
    padding: 7px 0;
    &::placeholder {
      color: #eee;
    }
  }
  .add-content {
    width: 100%;
    border: 0px;
    margin-top: 10px;
    min-height: 200px;
    &::placeholder {
      color: #eee;
    }
  }
}
</style>
