<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="游戏大厅" name="first">
      <el-button type="primary" style="float:left;font-size: 30px">快速加入</el-button>
      <el-button type="primary" style="float:left;font-size: 30px" v-on:click="createRoom">创建房间</el-button>
      <el-table :data="roomData" style="width: 100%">
        <el-table-column prop="roomID" label="房间ID" width="180" ></el-table-column>
        <el-table-column prop="tempNumber" label="已有人数" width="180"></el-table-column>
        <el-table-column prop="maxNumber" label="最多人数" width="180"></el-table-column>
        <el-table-column prop="" label="状态" width="180">未满</el-table-column>
        <el-table-column prop="" label="座位" width="180">随机</el-table-column>
        <el-table-column><el-button type="primary" width="180" slot-scope="scope" v-on:click="enterRoom(scope.row.roomID)">进入房间</el-button></el-table-column>
<!--        <el-table-column><el-button type="primary" width="180" slot-scope="scope" v-on:click="getRoomID(scope.row.roomID)">查看房间号</el-button></el-table-column>-->
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="大厅人员" name="second">
      <div >
        <el-input type="text" v-model="search.searchname"
                  placeholder="搜索" style="width: 200px" ></el-input>
        <el-row>
          <el-button type="primary" v-on:click="addFriend" style="height: 40px;margin: 5px">添加好友</el-button>
        </el-row>
      </div>
      <template>
        <el-table :data="userData" style="width: 100%" stripe :cell-style="{'height':'60px','padding':'0px'}"
                  :header-cell-style="{'backgroundColor':'#D0DCE6'}">
          <el-table-column prop="userID" label="ID" width="50px"></el-table-column>
          <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="userEmail" label="邮箱" align="center" width="200px"></el-table-column>
          <el-table-column prop="userStatus" label="状态" align="center"></el-table-column>
          <el-table-column prop="address" label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" v-on:click="addFriend">添加好友</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <el-tab-pane label="玩法介绍" name="third">
      <img :src="imgUrl1" style="width: 50%;height: 100%">
      <img :src="imgUrl2" style="width: 50%;height: 100%">
      <img :src="imgUrl3" style="width: 50%;height: 100%">
    </el-tab-pane>
    <el-tab-pane label="帮助" name="fourth">帮助</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      imgUrl1: require('../../assets/logicGame.jpg'),
      imgUrl2: require('../../assets/logicGame2.jpg'),
      imgUrl3: require('../../assets/logicGame3.jpg'),
      search: {searchname: ''},
      roomData: [],
      ROOMID: '',
      userData: [{
        userID: 5,
        userName: 'xwk',
        userEmail: '1231321',
        userStatus: '在线'
      }, {
        userID: 10,
        userName: 'cxz',
        userEmail: '555555',
        userStatus: '在线'
      }, {
        userID: 22,
        userName: 'wwc',
        userEmail: '1452364',
        userStatus: '在线'
      }]
    }
  },
  mounted () {
    this.getRoomInfo()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    createRoom () {
      var userToken = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userToken : null
      this.$axios.post('/room/create', {
        userName: window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : null,
        gameType: 2,
        maxNumber: 4
      }, {headers: {'Authorization': userToken}}).then(success => {
        if (success.status === 200) {
          this.roomData = success.data.data
          this.getRoomInfo()
          console.log(success)
        } else {
          this.alert('创建房间失败')
        }
      })
    },
    getRoomInfo () {
      var userToken = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userToken : null
      this.$axios.get('/room/getRooms', {headers: {'Authorization': userToken}}).then(success => {
        if (success.status === 200) {
          this.roomData = success.data.data
        } else {
          alert('您遇到了一些问题')
        }
      })
    },
    enterRoom (id) {
      this.getRoomID(id)
      this.$router.push({
        path: '/innerroom',
        name: 'InnerRoom',
        params: {
          roomID: this.ROOMID
        }
      })
      // location.reload()
    },
    getRoomID (id) {
      this.ROOMID = id
      console.log(this.ROOMID)
    },
    addFriend () {
      this.$axios.post('/account/addfriend', {
        userA: window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : null,
        userB: this.search.searchname
      }).then(success => {
        if (success.data) alert('添加成功')
        else alert('无此人，添加失败')
      })
    }
  }
}
</script>

<style  scoped>
el-input{
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 13px 14px;
  width: 620px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
}
</style>
