import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TableMain from '../components/table-main'
import FoodstuffManagePage from '../components/foodstuff/foodstuff-manage-page'
import FoodstuffKindManagePage from '../components/foodstuff/foodstuff-kind-manage-page'
import TransactionOrderManagePage from '../components/transaction/transaction-order-manage-page'
import TransactionPaymentRecordPage from '../components/transaction/transaction-payment-record-page'
import SystemLogPage from '../components/system/system-log-page'
import SystemMonitoringPage from '../components/system/system-monitoring-page'
import AllMonitoringPage from '../components/system/monitoring/all-monitoring-page'
import FoodstuffMonitoringPage from '../components/system/monitoring/foodstuff-monitoring-page'
import TransactionMonitoringPage from '../components/system/monitoring/transaction-monitoring-page'
import ShoppingCartMonitoringPage from '../components/system/monitoring/shoppingCart-monitoring-page'
import BaseMonitoringPage from '../components/system/monitoring/base-monitoring-page'

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
    },
    {
      path: '/system-monitoring-page',
      name: 'SystemMonitoringPage',
      component: SystemMonitoringPage,
      children:[
        {
          path: '/all-monitoring-page',
          name: 'AllMonitoringPage',
          component: AllMonitoringPage
        },
        {
          path: '/foodstuff-monitoring-page',
          name: 'FoodstuffMonitoringPage',
          component: FoodstuffMonitoringPage
        },
        {
          path: '/transaction-monitoring-page',
          name: 'TransactionMonitoringPage',
          component: TransactionMonitoringPage
        },
        {
          path: '/shoppingCart-monitoring-page',
          name: 'ShoppingCartMonitoringPage',
          component: ShoppingCartMonitoringPage
        },
        {
          path: '/base-monitoring-page',
          name: 'BaseMonitoringPage',
          component: BaseMonitoringPage
        },
      ]
    },


  ]
})
