<template>
    <el-menu
            :default-active="this.$route.path"
            router
            mode="horizontal"
            background-color="white"
            text-color="#222"
            active-text-color="red"
            style="min-width: 1000px">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
        </el-menu-item>
        <el-button v-if="user.username !== ''" style="color: #222;float: right;padding: 20px;" @click="logout">登出</el-button>
<!--        <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>-->
        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px "></i>
        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">2117游戏平台</span>
    </el-menu>
</template>

<script>
import store from '../../store'
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/game', navItem: '游戏'},
        {name: '/friends', navItem: '好友'},
        {name: '', navItem: '社区'}
      ],
      user: store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      console.log(this.user)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
</style>
