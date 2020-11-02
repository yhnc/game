<template>
  <el-menu
    class="el-menu-admin"
    router
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <div style="height: 80px;"></div>
      <!--index 没有用但是必需字段-->
      <el-submenu  v-for="(item,i) in adminMenus" :key="i" :index="(i).toString()" style="text-align: left">
        <span slot="title" style="font-size: 17px;">
          {{item.navItem}}
        </span>
      </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      adminMenus: [
        {navItem: '用户管理'},
        {navItem: '用户信息'},
        {navItem: '记录管理'}
      ]
    }
  }
}
</script>

<style scoped>
  .el-menu-admin {
    border-radius: 5px;
    height: 100%;
  }
</style>
