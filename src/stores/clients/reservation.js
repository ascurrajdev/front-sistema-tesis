import {defineStore} from 'pinia'

export const useReservationStore = defineStore('reservations',{
    state:() => {
        return {
            id:null,
            form:{
                quantity:0,
                product_price:0,
                quantity_days:0,
                config:{},
                currency:{},
                data:{},
            }
        }
    },
    actions:{
        setFormData(form){
            this.form = {
                ...this.form,
                ...form
            }
        },
        setId(id){
            this.id = id
        }
    },
    getters:{
        getAmountTotalProduct:(state) => new Intl.NumberFormat('es').format(state.form.quantity * state.form.product_price * state.form.quantity_days),
        getAmountInitialPayment:(state) => new Intl.NumberFormat('es').format(state.form.quantity * state.form.product_price * state.form.quantity_days * (state.form.config.initial_payment_percent/100)),
    },
    persist:{
        enabled:true,
        strategies:[{storage:localStorage}]
    }
})
