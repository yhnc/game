// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

const axios = require('axios')
axios.defaults.baseURL = 'http://192.168.43.149:8080'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

window.router = router
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (to.meta.requireAdmin && to.path.startsWith('/admin')) {
//       if (store.state.user.admin) {
//         next()
//       } else {
//         next({
//           path: 'login',
//           query: {redirect: to.fullPath}
//         })
//       }
//     } else if (store.state.user.username) {
//       next()
//     } else {
//       next({
//         path: 'login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// }
// )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
