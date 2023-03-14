import {defineStore} from 'pinia'
export const authUserStore = defineStore('authUser',{
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

    }
})