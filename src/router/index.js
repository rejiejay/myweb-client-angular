import Vue from 'vue'
import Router from 'vue-router'
import reserve from '@/components/reserve'          // 预约首页
import reserveList from '@/components/reserveList'  // 服务项目列表页
import qiYouList from '@/components/qiYouList'      // 油品列表页
import main from '@/components/main'                
import shopList from '@/components/shopList'        // 门店列表页
import storeInfo from '@/components/storeInfo'      // 门店详情页
import confirm from '@/components/confirm'          // 确认预约页
import reservationState from '@/components/reservationState'            // 预约详情页
import reservationRecordList from '@/components/reservationRecordList'  // 预约记录页
import examples from '@/components/examples'      // 人保/平安 示例
import comment from '@/components/comment'        // 评价
import piccPage from '@/components/piccPage'        // 人保预约页面
import pingAn from '@/components/pingAn'        // 平安预约页面


Vue.use(Router)


 const routes= [
    {
      path: '/',
      name: 'reserve',
      component: reserve,
      meta:{title:'服务预约'}
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      meta:{title:'服务预约'}
    },
    {
      path: '/reserveList',
      name: 'reserveList',
      component: reserveList,
      meta:{title:'服务列表'}
    },
    {
      path: '/qiYouList',
      name: 'qiYouList',
      component: qiYouList,
      meta:{title:'油品列表'}
    },
    {
      path: '/shopList',
      name: 'shopList',
      component: shopList,
      meta:{title:'选择预约门店'}
    },
    {
      path: '/storeInfo',
      name: 'storeInfo',
      component: storeInfo,
      meta:{title:'门店详情'}
    },

    {
      path: '/confirm',
      name: 'confirm',
      component: confirm,
      meta:{title:'服务预约'}
    },
    {
      path: '/reservationState',
      name: 'reservationState',
      component: reservationState,
      meta:{title:'预约状态'}
    },
    {
      path: '/reservationRecordList',
      name: 'reservationRecordList',
      component: reservationRecordList,
      meta:{title:'预约记录'}
    },
    {
      path: '/examples',
      name: 'examples',
      component: examples,
      meta:{title:'示例'}
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment,
      meta:{title:'评价'}
    },
    {
      path: '/piccPage',
      name: 'piccPage',
      component: piccPage,
      meta:{title:'人保预约'}
    },
    {
      path: '/LCY',
      name: 'pingAn',
      component: pingAn,
      meta:{title:'理车云'}
    },
  
 
  ];
  let router = new Router({
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
  
  });
    

  

  router.beforeEach((to, from, next) => {
    if (to.meta.title) { // 路由发生变化修改页面 title
      document.title = to.meta.title;
    }
  
    next();
  });



export default router
