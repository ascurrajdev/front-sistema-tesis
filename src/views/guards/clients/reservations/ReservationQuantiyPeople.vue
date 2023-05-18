<script setup>
import {reactive, watch, ref, defineEmits} from 'vue'
import {useAuthClientStore} from '@/stores/clients/authClient'
import {useI18n} from 'vue-i18n'
import axios from 'axios'
import { useRouter } from 'vue-router'
import {useReservationStore} from '@/stores/clients/reservation'
const emits = defineEmits(['confirm'])
const {t} = useI18n()
const router = useRouter();
router.push({query:{step:1}})
const authClient = useAuthClientStore()
const productsReservation = ref({})
axios.get(`${import.meta.env.VITE_API_URL_CLIENT}/reservations/products`,{
    headers:{
        'Authorization':`Bearer ${authClient.auth.credentials.plainTextToken}`
    }
}).then(({data}) => {
    productsReservation.value = data.data
    formState.product_id = data.data[0].id
    handleChangeProduct(data.data[0].id)
})
const reservationStore = useReservationStore()
const formState = reactive({
    quantity:0,
    product_id:null
})
const activeConfirm = ref(false)
const getAmountWithCurrency = (product) => {
    return product.currency.currency_format + " " + new Intl.NumberFormat('es').format(product.amount)
}
const handleChangeProduct = (product_id) => {
    let product = productsReservation.value.find((product) => product.id == product_id)
    formState.product_price = product.amount
    formState.product = product;
}
const handleFocusQuantityPeople = (e) => {
    e.target.select()
}
watch(formState, (form) => {
    reservationStore.setFormData({...form})
    if(form.quantity > 0){
        activeConfirm.value = true
    }else{
        activeConfirm.value = false
    }
},{
    deep: true
})
const onConfirm = () => {
    emits('confirm')
}
</script>
<template>
    <a-row type="flex" class="items-center mt-10 justify-center">
        <a-form 
            :model="formState"
            layout="vertical"
        >   
            <a-form-item
                name="product_id"
            >
                <a-select
                    @change="handleChangeProduct"
                    v-model:value="formState.product_id"
                >
                    <a-select-option :value="product.id" v-for="product in productsReservation">{{product.name}}  {{getAmountWithCurrency(product)}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                :label="t('labels.quantity-people')"
                name="quantity"
                :rules="[{required:true,message:t('validations.required',{field:t('labels.quantity-people')})}]"
            >
                <a-input type="number" @focus="handleFocusQuantityPeople" v-model:value="formState.quantity"/>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="onConfirm" :disabled="!activeConfirm">Confirmar</a-button>
            </a-form-item>
        </a-form>
    </a-row>
</template>