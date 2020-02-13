import Vue from 'vue'
import App from './App.vue'
import './components'
import { events } from './lib/events'
import './lib/sounds'
import './styles/main.scss'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  mounted() {
    events.$emit('title')
  },
})
