import {createRouter, createWebHistory} from 'vue-router'
import {publicsRoutes} from './public'
import {authClientsRoutes} from './authClients'
import {authUsersRoutes} from './authUsers'
import {homeRoutesClients} from './homeClients'
import {homeRoutesUsers} from './homeUsers'
import MenuLayout from '@/components/MenuLayout.vue'
import AuthLayoutClient from '@/components/AuthLayoutClient.vue'
import AuthLayoutUser from '@/components/AuthLayoutUser.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import {useAuthClientStore} from '@/stores/clients/authClient'
import { useAuthUserStore } from '../stores/users/authUser'
export const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/guards",
            children: [
                {
                    path:"clients",
                    component:AuthLayoutClient,
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
                            children: authUsersRoutes,
                            beforeEnter:(to, from, next) => {
                                const authUserStore = useAuthUserStore()
                                if(!authUserStore.auth.isLogged){
                                    next()
                                }
                                next("/guards/users/home")
                            }
                        },
                        {
                            path:"",
                            children: homeRoutesUsers,
                            component:AuthLayoutUser,
                            beforeEnter:(to, from, next) => {
                                const authUserStore = useAuthUserStore()
                                if(authUserStore.auth.isLogged){
                                    next()
                                }
                                next("/guards/users/auth/login")
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