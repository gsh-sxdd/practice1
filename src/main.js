import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = process.env.NODE_ENV === 'development';



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.config.devtools = true;