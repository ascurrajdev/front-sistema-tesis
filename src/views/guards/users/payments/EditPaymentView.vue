<template>
    <a-page-header 
        title="Edit Payment"
        @back="onBack"
    />
    <a-card>
        <a-form
            :model="formState"
            layout="vertical"
            @finish="onSubmitForm"
        >
            <a-form-item
                label="Nombre"
                name="name"
                :rules="[{required:true,message:'El nombre es requerido'}]"
            >
                <a-input v-model:value="formState.name"/>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.is_card">Es Tarjeta</a-checkbox>
            </a-form-item>
            <a-form-item
                v-show="formState.is_card"
                label="Tipo de Tarjeta"
                name="type_card"
            >
                <a-select v-model:value="formState.type_card" :options="typeCards" />
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.is_cash">Es Efectivo</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.is_transfer_bank">Es Transferencia Bancaria</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.required_vaucher">Requiere Nro. de Comprobante de Pago</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.is_online_transaction">Es Pago Online</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button :loading="isSubmitting" type="primary" html-type="submit">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiUsers from '@/services/apiUsers'
import { useQuery } from '@tanstack/vue-query';
import {message} from 'ant-design-vue'
import {useAuthUserStore} from '@/stores/users/authUser'
const router = useRouter()
const route = useRoute()
const onBack = () => {
    router.back()
}
const authUserStore = useAuthUserStore()
const getPayment = async () => {
    const {data} = await apiUsers.get(`payments/${route.params.id}`,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data.data
}
const {data} = useQuery({
    queryKey:['payments',route.params.id],
    queryFn:getPayment
})
watch(data, (value) => {
    if(!!value){
        Object.keys(formState).forEach((key) => {
            formState[key] = value[key]
        })
    }
})
onMounted(() => {
    if(!!data.value){
        Object.keys(formState).forEach((key) => {
            formState[key] = data.value[key]
        }) 
    }
})
const formState = reactive({
    name:"",
    is_card:false,
    type_card:null,
    is_cash:false,
    is_transfer_bank:false,
    required_vaucher:false,
    is_online_transaction:false
})
const typeCards = [
    {
        label:"Ninguno",
        value:null
    },
    {
        label:"Credito",
        value:"credit"
    },
    {
        label:"Debito",
        value:"debit"
    }
]
const isSubmitting = ref(false)
const onSubmitForm = () => {
    isSubmitting.value = true
    apiUsers.put(`payments/${route.params.id}`,formState,{
        headers:{
            'Authorization': `Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    }).then(() => {
        message.success("Se ha modificado el metodo de pago correctamente")
        router.push("/guards/users/payments")
    }).catch(() => {
        message.error("Hubo un error al modificar el metodo de pago")
    }).finally(() => {
        isSubmitting.value = false
    })
}
</script>