// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import TodoList from './TodoList'

Vue.config.productionTip = false

/* eslint-disable no-new */
// 根实例, 如果没有模板, 会到挂载点去找
new Vue({
  el: '#app',
  components: { TodoList },
  template: '<TodoList/>'
})
