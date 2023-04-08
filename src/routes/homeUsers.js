import { useAuthUserStore } from '../stores/users/authUser'
import {notification} from 'ant-design-vue'
import HomeView from '@/views/guards/users/home/HomeView.vue'
import ListRolesView from '@/views/guards/users/roles/ListRolesView.vue'
import EditRoleView from '@/views/guards/users/roles/EditRoleView.vue'
import CreateRoleView from '@/views/guards/users/roles/CreateRoleView.vue'
import ListUsersView from '@/views/guards/users/users/ListUsersView.vue'
import CreateUsersView from '@/views/guards/users/users/CreateUsersView.vue'
import EditUsersView from '@/views/guards/users/users/EditUsersView.vue'
import ListProductsView from '@/views/guards/users/products/ListProductsView.vue'
import ListCurrencies from '@/views/guards/users/currencies/ListCurrencies.vue'
import ListPayments from '@/views/guards/users/payments/ListPayments.vue'
import ListAgencies from '@/views/guards/users/agencies/ListAgencies.vue'
import ListInvoices from '@/views/guards/users/invoices/ListInvoices.vue'
import ListCollections from '@/views/guards/users/collections/ListCollections.vue'
import ListReservations from '@/views/guards/users/reservations/ListReservations.vue'
import CreateProductView from '@/views/guards/users/products/CreateProductView.vue'
import EditProductView from '@/views/guards/users/products/EditProductView.vue'
import CreateCurrencyView from '@/views/guards/users/currencies/CreateCurrencyView.vue'
import EditCurrencyView from '@/views/guards/users/currencies/EditCurrencyView.vue'
import CreatePaymentView from '@/views/guards/users/payments/CreatePaymentView.vue'
const checkAbilities = (to, from, next) => {
    const authUserStore = useAuthUserStore()
    if(authUserStore.auth.credentials.abilities.includes(to.meta.ability) || authUserStore.auth.credentials.abilities.includes('*')){
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
        path:"invoices",
        component:ListInvoices,
        meta:{
            ability:'invoices-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"reservations",
        component:ListReservations,
        meta:{
            ability:'invoices-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"collections",
        component:ListCollections,
        meta:{
            ability:'collections-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"currencies",
        component:ListCurrencies,
        meta:{
            ability:'currencies-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"currencies/add",
        component:CreateCurrencyView,
        meta:{
            ability:'currencies-store',
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"currencies/:id/edit",
        component:EditCurrencyView,
        meta:{
            ability:'currencies-update',
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"payments",
        component:ListPayments,
        meta:{
            ability:'payments-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"payments/add",
        component:CreatePaymentView,
        meta:{
            ability:'payments-store'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"agencies",
        component:ListAgencies,
        meta:{
            ability:'agencies-index'
        },
        beforeEnter:[checkAbilities]
    },

    {
        path:"products",
        component:ListProductsView,
        meta:{
            ability:'products-index'
        },
        beforeEnter:[checkAbilities],
    },
    {
        path:"products/add",
        component:CreateProductView,
        meta:{
            ability:'products-store'
        },
        beforeEnter:[checkAbilities],
    },
    {
        path:"products/:id/edit",
        component:EditProductView,
        meta:{
            ability:'products-update'
        },
        beforeEnter:[checkAbilities],
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
    },
    {
        path:"users",
        component:ListUsersView,
        meta:{
            ability:'users-index'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"users/:id",
        component:EditUsersView,
        meta:{
            ability:'users-update'
        },
        beforeEnter:[checkAbilities]
    },
    {
        path:"users/add",
        component:CreateUsersView,
        meta:{
            ability:'users-store'
        },
        beforeEnter:[checkAbilities]
    }
]