<template>
  <tabbar @on-index-change="onIndexChange">
    <tabbar-item :selected="route.path === '/dialogue'" link="/dialogue">
      <img slot="icon" :src="img1">
      <span slot="label">Dialogue</span>
    </tabbar-item>
    <tabbar-item :selected="route.path === '/contact'" link="/contact">
      <img slot="icon" :src="img2">
      <span slot="label">Contact</span>
    </tabbar-item>
    <tabbar-item :selected="route.path === '/topic'" link="/topic">
      <img slot="icon" :src="img3">
      <span slot="label">Topic</span>
    </tabbar-item>
    <tabbar-item :selected="route.path === '/my'" link="/my">
      <img slot="icon" :src="img4">
      <span slot="label">Me</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      })
    },
    data () {
      return {
        selected: 0,
        img1: '/static/images/footer-sel-001.png',
        img2: '/static/images/footer-002.png',
        img3: '/static/images/footer-003.png',
        img4: '/static/images/footer-004.png'
      }
    },
    watch: {
      'selected': {
        handler () {
          if (this.selected === 0) {
            this.img1 = '/static/images/footer-sel-001.png'
          } else {
            this.img1 = '/static/images/footer-001.png'
          }
          if (this.selected === 1) {
            this.img2 = '/static/images/footer-sel-002.png'
          } else {
            this.img2 = '/static/images/footer-002.png'
          }
          if (this.selected === 2) {
            this.img3 = '/static/images/footer-sel-003.png'
          } else {
            this.img3 = '/static/images/footer-003.png'
          }
          if (this.selected === 3) {
            this.img4 = '/static/images/footer-sel-004.png'
          } else {
            this.img4 = '/static/images/footer-004.png'
          }
        }
      }
    },
    methods: {
      onIndexChange (newIndex, oldIndex) {
        this.selected = newIndex
      }
    }
  }
</script>
