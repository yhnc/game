<template>
  <div >
    <el-card class="box-card" style="float: left;border-width: 10px" >
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">沙漠掘金</span>
        <el-button style="float: right; padding: 3px 0" type="text" >开始游戏</el-button>
      </div>
      <div style="padding: 0px">
        <img :src="imgUrl1">
      </div>
    </el-card>
    <el-card class="box-card" style="float: left;border-width: 10px">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">逻辑对决</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="beginGame">开始游戏</el-button>
      </div>
      <div>
        <img :src="imgUrl2">
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GamePage',
  data () {
    return {
      imgUrl1: require('../../assets/shamo.jpg'),
      imgUrl2: require('../../assets/LogicPK.png')
    }
  },
  methods: {
    beginGame () {
      this.$router.push('/PKHome')
    }
  }
}
</script>
<style>
.text {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
img{
  width: 440px;
  height: 224px;
}
</style>
