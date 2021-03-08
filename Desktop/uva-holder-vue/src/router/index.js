import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/pages/LoginPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path:'/',
        name: 'Dashbord',
        component : () => import('../views/pages/DashboardPage.vue'),
        beforeEnter : (to, from, next) => {
            if(localStorage.getItem('userId') === null) next("/login");
            else next();
        }
    },
    {
        path:'/live-subissions',
        name: 'Dashbord',
        component : () => import('../views/pages/LiveSubmissionsPage.vue'),
        beforeEnter : (to, from, next) => {
            if(localStorage.getItem('userId') === null) next("/login");
            else next();
        }
    },
    {
        path:'/submissions',
        name: 'Submissions',
        component : () => import('../views/pages/SubmissionsPage.vue'),
        beforeEnter : (to, from, next) => {
            if(localStorage.getItem('userId') === null) next("/login");
            else next();
        }
    },
    {
        path:'/search-submissions',
        name: 'SearchSubmissions',
        component : () => import('../views/pages/SearchProblemPage.vue'),
        beforeEnter : (to, from, next) => {
            if(localStorage.getItem('userId') === null) next("/login");
            else next();
        }
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


export default router
