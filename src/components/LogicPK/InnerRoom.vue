<template>
  <div class="body_bgi">
    <el-container>
      <el-aside width="200px" class="headImg">
        <img src="../../assets/head.png" >
      </el-aside>
      <el-container>
        <el-header height="125px">
          <div class="headImg" >
            <img src="../../assets/head.png">
            <div style="float: right;margin: 20px">
              <el-button type="primary" width="280" style="height: 80px;font-size: 40px" v-on:click="startGame">开始游戏</el-button>
              <el-button  width="180" v-on:click="exitRoom">退出房间</el-button>
            </div>
          </div>
        </el-header>
        <el-main>
          <template v-if="startFlag==false">
            <h1>游戏即将开始</h1>
          </template>
          <template v-else>
            <div v-for="item in questionUrl" :key="item" style="float: left;margin: 0px">
              <img :src= item>
            </div>
          </template>
        </el-main>
        <el-header height="125px">
          <div height="150px">
            <div class="footImg">
              <img src="../../assets/head.png" style="float: left">
              <h1 v-for="item in cardUrl" :key="item" style="float: left;margin: 0px">
                <img :src= item>
              </h1>
              <div style="height: 150px;width: 300px;float: right">
                <el-button style="width: 180px;text-align: center;margin: 5px" v-on:click="selectQuestion">选题</el-button>
                <el-button style="width: 180px;text-align: center;margin: 5px" @click="answer()">提交答案</el-button>
                <el-dialog title="选择答案" :visible.sync="submitDialog" center :append-to-body='true' :lock-scroll="false" width="50%">
                  <SubAnswer @submit-msg="getSubmitMsg"></SubAnswer>
                </el-dialog>
                <el-button style="width: 180px;text-align: center;margin: 5px" @click="lookKnown()">查看已知</el-button>
                <el-dialog title="已获得信息" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="50%">
                  <Known  :toChildrenData="toChildrenData"></Known>
                </el-dialog>
              </div>
            </div>
          </div>
        </el-header>
      </el-container>
      <el-aside width="200px" class="headImg">
        <img src="../../assets/head.png">
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Known from './Known'
import SubAnswer from './SubmitAnswer'
var url = 'ws://192.168.43.149:8080/room/'
var ws = null

// const userToken = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userToken : null
// const token = userToken
export default {
  name: 'InnerRoom',
  components: {
    Known,
    SubAnswer
  },
  data () {
    return {
      toChildrenData: {
        question: [],
        name: [],
        result: []
      },
      userToken: window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userToken : null,
      submitDialog: false,
      dialogTableVisible: false,
      checked: 'ture',
      roomID: '',
      startFlag: false,
      test: [1, 2, 3, 4, 5],
      initQuestions: [],
      initCards: [],
      questionUrl: [],
      cardUrl: [],
      yourSelect: '',
      submitAnswer: [],
      guessFlag: ''
    }
  },
  mounted () {
    this.getParams()
    this.createWebsocket()
  },
  methods: {
    getParams () {
      var routerParams = this.$route.params.roomID
      this.roomID = routerParams
    },
    startGame () {
      console.log('-------------------------------------------' + this.userToken)
      this.$axios.get('/room/start?roomID=' + this.roomID, {headers: {'Authorization': this.userToken}}).then(success => {
        if (success.status === 200) {
          this.startFlag = true
          console.log(this.initCards)
          console.log(this.initQuestions)
          console.log('开始游戏')
          // console.log(success)
        } else {
          alert('您遇到了一些问题')
        }
      })
    },
    selectQuestion () {
      const _this = this
      this.$prompt('请选择（1-6）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        _this.yourSelect = _this.initQuestions[value - 1]
        console.log('yourSelect:', this.yourSelect)
        this.$message({
          type: 'success',
          message: '你选择的题是: ' + value
        })
        this.$axios.post('/room/play?roomID=' + this.roomID, {
          'type': '1',
          'data': {
            'sender': window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : null,
            'function': this.yourSelect
          }
        }, {headers: {'Authorization': this.userToken}}).then(success => {
          console.log('提交成功')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    getSubmitMsg (Subanswer) {
      this.submitAnswer = Subanswer
      console.log('向服务器上传答案:' + this.submitAnswer)
      this.submitDialog = false
      this.$axios.post('/room/play?roomID=' + this.roomID, {
        'type': '2',
        'data': {
          'sender': window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : null,
          'function': this.submitAnswer
        }
      }, {headers: {'Authorization': this.userToken}}).then(success => {
        console.log('上传答案成功', this.submitAnswer)
      })
    },
    answer () {
      this.submitDialog = true
    },
    lookKnown () {
      this.dialogTableVisible = true
    },
    createWebsocket () {
      const that = this
      if (ws) {
        alert('你已经在聊天室，不能再加入')
        return
      }
      console.log(url + this.roomID + '/' + this.token)
      ws = new WebSocket(url + this.roomID + '/' + this.userToken)
      // 与服务端建立连接触发
      ws.onopen = function () {
        console.log('与服务器成功建立连接')
      }
      // 服务端推送消息触发
      ws.onmessage = function (ev) {
        var obj = JSON.parse(ev.data)
        that.initCards = obj.card
        if (undefined === obj.question) { } else { that.initQuestions = obj.question }
        // that.initQuestions = obj.question
        that.guessFlag = obj.guessFlag
        if (undefined === that.guessFlag) {} else {
          if (!that.guessFlag) {
            that.$alert('答案错误，你输了')
          } else if (that.guessFlag) {
            that.$alert('恭喜你，你赢了')
          }
        }
        console.log('guessFlag:', that.guessFlag)
        console.log('objreceive:', obj.receiver)
        if (undefined === obj.receiver) {
        } else {
          that.toChildrenData.question = that.yourSelect
          // console.log('添加成功了么？', that.toChildrenData.question)
          that.toChildrenData.name = obj.name
          that.toChildrenData.result = obj.result
        }
        if (that.initQuestions === undefined) {
        } else {
          that.initQuestions.forEach(function (value, index, array) {
            var va = value
            var s = require('../../assets/questions/question' + va + '.png')
            that.$set(that.questionUrl, index, s)
          })
        }
        if (that.initCards === undefined) {} else {
          that.initCards.forEach(function (value, index, array) {
            var va = value
            var s = require('../../assets/cards/card' + va + '.png')
            that.$set(that.cardUrl, index, s)
          })
        }
        console.log('修改后', that.initQuestions)
        console.log('接收到消息')
      }

      // 发生错误触发
      ws.onerror = function () {
        console.log('连接错误')
      }
      // 正常关闭触发
      ws.onclose = function () {
        console.log('连接关闭')
      }
    },
    exitRoom () {
      if (ws) {
        ws.close()
        ws = null
      }
      this.$router.replace('/PKHome')
      location.reload()
    }
  }
}

</script>

<style>
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  color: #333;
  text-align: left;
  /*line-height: 60px;*/
}

.el-aside {
  /*background-color: #D3DCE6;*/
  /*color: #333;*/
  /*text-align: center;*/
  line-height: 640px;
  font-size: 20px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
  height: 350px;
}
.el-main img{
  height: 158px;
  width: 340px;
}

.el-container {
  /*background-image:url("../../assets/roomBackground.jpg");*/
  /*margin-bottom: 40px;*/
  /*height: 800px;*/
}
.body_bgi{
  background-image: url("../../assets/roomBackground.jpg");
  text-align: center;
  height: 652px;
}

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
/*  line-height: 260px;*/
/*}*/

/*.el-container:nth-child(7) .el-aside {*/
/*  line-height: 320px;*/
/*}*/
.headImg{
}
.headImg img{
  width: 150px;
  height: 130px;
}
.footImg{
  float: left;
}
.footImg img{
  width: 150px;
  height: 136px;
}
</style>
