<template>
  <div>
    <el-collapse >
      <el-collapse-item  title="在线好友" name="1">
        <el-table
            :data="onlineUsers"
            stripe
            style="width: 100%">
          <el-table-column prop="userName" label="姓名" width="500">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="离线好友" name="2">
        <el-table
            :data="offlineUsers"
            stripe
            style="width: 100%">
          <el-table-column prop="userName" label="姓名" width="500">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'Friends',
  data () {
    return {
      onlineUsers: [],
      offlineUsers: []
    }
  },
  mounted () {
    this.getFriend()
  },
  methods: {
    getFriend () {
      const _this = this
      var user = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : null
      this.$axios.get('lobby/friendList?userName=' + user).then(success => {
        if (success.status === 200) {
          _this.onlineUsers = success.data.data.onlineUsers
          _this.offlineUsers = success.data.data.offlineUsers
          // console.log()
        } else {
          alert('在查看好友列表时您遇到了一些问题')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
