import {createRouter, createWebHistory} from 'vue-router'
import {publicsRoutes} from './public'
import {authClientsRoutes} from './authClients'
import {authUsersRoutes} from './authUsers'
import {homeRoutesClients} from './homeClients'
import MenuLayout from '@/components/MenuLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import {useAuthClientStore} from '@/stores/clients/authClient'
export const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/guards",
            // component: AuthLayout,
            children: [
                {
                    path:"clients",
                    component:AuthLayout,
                    children: [
                        {
                            path:"auth",
                            children: authClientsRoutes,
                            beforeEnter:(to, from, next) => {
                                const authClientStore = useAuthClientStore()
                                if(!authClientStore.auth.isLogged){
                                    next()
                                }
                                next('/guards/clients/home')
                            }
                        },
                        {
                            path:"",
                            children: homeRoutesClients,
                            beforeEnter:(to,from,next) => {
                                const authClientStore = useAuthClientStore()
                                if(authClientStore.auth.isLogged){
                                    next()
                                }
                                next("/guards/clients/auth/login")
                            }
                        }
                    ],
                },
                {
                    path:"users",
                    children: [
                        {
                            path:"auth",
                            children: authUsersRoutes
                        },
                        {
                            path:"",
                            children: homeRoutesUsers,
                            beforeEnter:(to, from, next) => {
                                
                            }
                        }
                    ]
                }
            ],
        },
        {
            path:"/",
            component: MenuLayout,
            children: publicsRoutes
        },
        {
            path:"/:pathMatch(.*)*",
            component: NotFoundView
        }
    ]
})