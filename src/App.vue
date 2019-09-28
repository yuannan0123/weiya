<template>
  <div  v-cloak id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <!-- <Login :visible.sync="Model"></Login> -->
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  components: {
    Login
  },
  data () {
    return {
      Model: false
    }
  },
  created () {
    console.log('加载created')
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      console.log('页面刷新')
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted () {
    console.log('加载 mounted')
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
      // sessionStorage.removeItem('store')
    }
  }
}

</script>

<style lang="less">
body{
  font-size: 14px !important;
  line-height: 18px !important;
}
</style>
