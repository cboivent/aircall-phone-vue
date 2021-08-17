import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import { createApolloProvider } from './services/ApolloService'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(VueMoment)

new Vue({
  router,
  store,
  apolloProvider: createApolloProvider(),
  render: h => h(App)
}).$mount('#app')
