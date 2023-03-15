import { useAuthUserStore } from '../stores/users/authUser'
import {notification} from 'ant-design-vue'
import HomeView from '@/views/guards/users/home/HomeView.vue'
import ListRolesView from '@/views/guards/users/roles/ListRolesView.vue'
import EditRoleView from '@/views/guards/users/roles/EditRoleView.vue'
import CreateRoleView from '@/views/guards/users/roles/CreateRoleView.vue'
const checkAbilities = (to, from, next) => {
    const authUserStore = useAuthUserStore()
    if(authUserStore.auth.credentials.abilities.includes(to.meta.ability)){
        next()
    }else{
        notification['warning']({
            message:"Usted no tiene los permisos para acceder a este recurso"
        })
        next('/guards/users/home')
    }
}
export const homeRoutesUsers = [
    {
        path:"",
        component:HomeView
    },
    {
        path:"home",
        component:HomeView
    },
    {
        path:"roles",
        component:ListRolesView,
        meta:{
            ability:'roles-users-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"roles/:id",
        component:EditRoleView,
        meta:{
            ability:'roles-users-update'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"roles/add",
        component:CreateRoleView,
        meta:{
            ability:'roles-users-store'
        },
        beforeEnter:[checkAbilities]
    }
]