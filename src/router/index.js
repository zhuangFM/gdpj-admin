import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableMain from '../components/table-main'
import FoodstuffManagePage from '../components/foodstuff/foodstuff-manage-page'
import FoodstuffKindManagePage from '../components/foodstuff/foodstuff-kind-manage-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/table-main',
      name: 'TableMain',
      component: TableMain
    },
    {
      path: '/foodstuff-manage-page',
      name: 'FoodstuffManagePage',
      component: FoodstuffManagePage
    },
    {
      path: '/foodstuff-kind-manage-page',
      name: 'FoodstuffKindManagePage',
      component: FoodstuffKindManagePage
    }
  ]
})
