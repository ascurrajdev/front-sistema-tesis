import LoginView from '@/views/guards/users/auth/LoginView.vue'
import RegisterView from '@/views/guards/users/auth/RegisterView.vue'
export const authUsersRoutes = [
    {
        path:"login",
        component: LoginView
    },
    {
        path:"register",
        component: RegisterView
    },
]