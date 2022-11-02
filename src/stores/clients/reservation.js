import {defineStore} from 'pinia'

export const useReservationStore = defineStore('reservations',{
    state:() => {
        return {
            form:{
                quantity:0,
                product_price:0,
                quantity_days:0,
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
    },
    getters:{
        getAmountTotalProduct:(state) => new Intl.NumberFormat('es').format(state.form.quantity * state.form.product_price * state.form.quantity_days),
    }
})
