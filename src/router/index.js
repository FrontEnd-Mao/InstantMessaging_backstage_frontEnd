import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../view/home/Home.vue')
const FormList = () => import('../view/customerForm/FormList.vue')
const ProcessList = () => import('../view/process/ProcessList.vue')
const Login = () => import('../view/login/Login.vue')
const CustormForm = () => import('../view/customerForm/EditForm.vue')
const WorkFlow = () => import('../view/process/WorkFlow.vue')
const AllNotice = () => import('../view/notice/AllNotice.vue')
const EditNotice = () => import('../view/notice/EditNotice.vue')
const MailList = () => import('../view/mailList/MailList.vue')
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/MailList',
          name: 'MailList',
          component: MailList,
        },
        {
          path: '/FormList',
          name: 'FromList',
          component: FormList,
        },
        {
          path: '/ProcessList',
          name: 'ProcessList',
          component: ProcessList
        },
        {
          path: '/AllNotice',
          name: 'AllNotice',
          component: AllNotice
        },
        {
          path: '/EditNotice',
          name: 'EditNotice',
          component: EditNotice
        }
      ]
    },

    {
      path: '/CustormForm',
      name: 'CustormForm',
      component: CustormForm,
    },
    {
      path: '/WorkFlow',
      name: 'WorkFlow',
      component: WorkFlow,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },


  ]
})

//暴露router
export default router 