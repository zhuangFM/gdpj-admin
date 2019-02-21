import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableMain from '../components/table-main'
import FoodstuffManagePage from '../components/foodstuff/foodstuff-manage-page'
import FoodstuffKindManagePage from '../components/foodstuff/foodstuff-kind-manage-page'
import TransactionOrderManagePage from '../components/transaction/transaction-order-manage-page'
import TransactionPaymentRecordPage from '../components/transaction/transaction-payment-record-page'
import SystemLogPage from '../components/system/system-log-page'

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
    },
    {
      path: '/transaction-order-manage-page',
      name: 'TransactionOrderManagePage',
      component: TransactionOrderManagePage
    },
    {
      path: '/transaction-payment-record-page',
      name: 'TransactionPaymentRecordPage',
      component: TransactionPaymentRecordPage
    },
    {
      path: '/system-log-page',
      name: 'SystemLogPage',
      component: SystemLogPage
    }
  ]
})
