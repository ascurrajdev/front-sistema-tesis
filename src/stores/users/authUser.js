import {defineStore} from 'pinia'
import apiUsers from '@/services/apiUsers'
export const useAuthUserStore = defineStore('authUser',{
    state:() => {
        return{
            auth:{
                isLogged:false,
                user:null,
                credentials:null
            } 
        }
    },
    actions:{
        async loginUser(credentials){
            const {data} = await apiUsers.post('login',credentials)
            this.auth = {
                isLogged: true,
                user:data.data.user,
                credentials:data.data.token
            }
        }
    }
})