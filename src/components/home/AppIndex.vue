<template>
  <body style="background-color: lightpink">
  <el-card class="box-card" style="background-color: aliceblue">
    <div slot="header" class="clearFix">
      <h2 v-if="username">
        欢迎您，{{username}}
      </h2>
      <h2 v-else>
        欢迎您，<router-link :to="{name: 'Login'}">请先登录</router-link>
      </h2>
      <!--      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>
    <template>
      <div class="block">
        <el-carousel height="450px">
          <el-carousel-item v-for="(item,index) in src" :key="index">
            <div>
              <img :src="item.srcin">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </template>
  </el-card>
  <div class="copyright">
    <h5>@所有版权最终归2117寝所有@</h5>
  </div>
  </body>
</template>

<script>
// import store from '../../store/'

export default {
  name: 'AppIndex',
  data () {
    return {
      username: window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')).userName : null,
      src: [
        {srcin: require('../../assets/shouye2.jpg')},
        {srcin: require('../../assets/shouye4.png')},
        {srcin: require('../../assets/shouye3.jpg')},
        {srcin: require('../../assets/shouye1.jpg')}
      ]
    }
  }
}
</script>

<style scoped>
  #poster {
    background: url("../../assets/test.png") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0 auto;
  }

  .text {
    font-size: 20px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearFix:before,
  .clearFix:after {
    display: table;
    content: "";
  }

  .clearFix:after {
    clear: both
  }

  .box-card {
    width: 1200px;
    height: 600px;
    position: relative;
    top: 20%;
    left: 10%;
  }

  .tag {
    font-size: 18px;
  }

  .copyright {
    font-size: 20px;
    font-weight: bold;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    width: 1200px;
    height: 600px;
  }

</style>
