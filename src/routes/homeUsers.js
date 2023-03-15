import HomeView from '@/views/guards/users/home/HomeView.vue'
import ListRolesView from '@/views/guards/users/roles/ListRolesView.vue'
import EditRoleView from '@/views/guards/users/roles/EditRoleView.vue'
import CreateRoleView from '@/views/guards/users/roles/CreateRoleView.vue'
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
    },
    {
        path:"roles/add",
        component:CreateRoleView,
    }
]