import {defineStore} from 'pinia'

export const useReservationStore = defineStore('reservations',{
    state:() => {
        return {
            form:{
                quantity:0,
            }
        }
    },
    actions:{
        setFormData(form){
            this.form = {
                ...this.form,
                ...form
            }
        }
    }
})
