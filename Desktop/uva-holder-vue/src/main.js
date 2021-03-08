import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VueApexCharts,
  render: h => h(App)
}).$mount('#app')
