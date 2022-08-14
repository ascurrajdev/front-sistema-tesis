import LoginView from '@/views/guards/clients/auth/LoginView.vue'
import RegisterView from '@/views/guards/clients/auth/RegisterView.vue'
export const authClientsRoutes = [
    {
        path:"login",
        component: LoginView
    },
    {
        path:"register",
        component: RegisterView
    },
]