import {defineStore} from 'pinia'
import axios from 'axios'
export const useAuthClientStore = defineStore('authClient',{
    setup(){
        const router = useRouter();
        return {
            router
        }
    },
    state:() => {
        return{
            auth:{
                client:null,
                credentials:null,
                isLogged:false
            }
        }
    },
    actions: {
        async loginClient(credentials){
            try{
                let {data} = await axios.post(`${import.meta.env.VITE_API_URL_CLIENT}/login`,credentials)
                this.auth = {
                    client:data.data.client,
                    credentials:data.data.token,
                    isLogged:true
                }
            }catch(err){
                throw err
            }
        }
    },
    persist:{
        enabled:true,
        strategies:[{storage:localStorage}]
    }
})