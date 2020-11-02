<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1;height: 80px;margin-left: -20px">
      <Header style="position: absolute;width: 98%;"></Header>
    </el-header>
    <!--<el-row style="height: 100%;">-->
    <el-container>
      <el-aside style="height: 112%;margin-top: -80px;width: 250px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
          <el-table :data="tableData" style="width: 100%" ref="multipleTable">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="55"></el-table-column>
<!--              <el-table-column prop="id" label="用户id"></el-table-column>-->
              <el-table-column prop="username" label="用户名"></el-table-column>
<!--              <el-table-column prop="password" label="用户密码"></el-table-column>-->
              <el-table-column label="用户状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.banned"
                    :active-value=false
                    :inactive-value=true
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="change($event, scope.row.id)"
                  ></el-switch>
                </template>
              </el-table-column>
          </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import Header from './Header'

export default {
  name: 'AdminIndex',
  components: {AdminMenu, Header},
  data () {
    return {
      dialogVisible: false,
      tableData: []
    }
  },
  mounted () {
    this.loadUsers()
  },
  methods: {
    loadUsers () {
      const _this = this
      this.$axios.get('/users').then(
        resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        }
      )
    },
    change ($event, id) {
      this.$axios.post('/ban/' + this.tableData[id - 1].id)
    }
  }
}
</script>

<style scoped>
  #admin-body {
  height: 95vh;
}
</style>
