<template>
    <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.userName"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.userPwd"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 48%;background: orangered;border: none" v-on:click="register">注册
            </el-button>
            <el-button type="primary" style="width: 48%;background: green;border: none" v-on:click="login">登录
            </el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        userPwd: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      // const _this = this
      // console.log(this.$store.state)
      this.$axios
        .post('/account/login', {
          userName: this.loginForm.userName,
          password: this.loginForm.userPwd
        })
        .then(successResponse => {
          if (successResponse.data.status === 200) {
            // var data = this.loginForm
            this.$store.commit('login', successResponse.data.data)
            const path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            // this.$router.replace('/index')
          } else {
            this.$alert(successResponse.data.message, '错误', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    register: function () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style>
    #poster {
        background: url("../assets/roomBackground.jpg") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }

    body {
        margin: 0;
    }

    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }

</style>
