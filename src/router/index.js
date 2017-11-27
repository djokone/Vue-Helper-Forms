import Vue from 'vue'
import Router from 'vue-router'
import complexeForm from '@/exemples/complexeForm/complexeForm'
import formGenerator from '@/exemples/formGenerator/formGenerator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'complexeForm',
      component: complexeForm
    },
    {
      path: '/generator',
      name: 'formsGenerator',
      component: formGenerator
    }
  ]
})
