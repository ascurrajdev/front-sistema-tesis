import HomeView from '@/views/guards/users/home/HomeView.vue'
import ListRolesView from '@/views/guards/users/roles/ListRolesView.vue'
import EditRoleView from '@/views/guards/users/roles/EditRoleView.vue'
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
    },
    {
        path:"roles/:id",
        component:EditRoleView,
    }
]