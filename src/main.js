import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';
import './plugins/vant.js'
import router from './router/index'
import VueBus from 'vue-bus';
Vue.use(ElementUI);
Vue.use(VueBus);
Vue.config.productionTip = false
Vue.prototype.apiUrl = 'http://localhost:8081';
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
