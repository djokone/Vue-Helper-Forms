import Vue from 'vue'
import Router from 'vue-router'
import complexeForm from '@/exemples/complexeForm/complexeForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'complexeForm',
      component: complexeForm
    }
  ]
})
