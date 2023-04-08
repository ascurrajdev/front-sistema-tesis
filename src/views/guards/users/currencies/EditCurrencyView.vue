<template>
    <a-page-header 
        title="Edit Currency"
        @back="onBack"
    />
    <a-card>
        <a-form 
            @finish="onFinish"
            :model="formState"
            layout="vertical"
        >
            <a-form-item
                label="Nombre"
                name="name"
                :rules="[{required:true, message:'Introduzca el nombre de la moneda'}]"
            >
                <a-input v-model:value="formState.name"/>
            </a-form-item>
            <a-form-item
                label="Codigo de Moneda"
                :rules="[{required:true, message:'Por favor seleccione el codigo de la moneda'}]"
            >
                <a-select v-model:value="formState.currency_format" :options="currencyCodes" />
            </a-form-item>
            <a-form-item
                label="Decimales"
            >
                <a-input-number v-model:value="formState.decimals"/>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.default">Moneda por Defecto</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button :loading="isSubmitting" html-type="submit" type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { useAuthUserStore } from '@/stores/users/authUser';
import { message } from 'ant-design-vue';
import api from '@/services/api'
import apiUsers from '@/services/apiUsers'
const router = useRouter()
const route = useRoute()
const authUserStore = useAuthUserStore()
const getAllCurrencyCodes = async () => {
    const {data} = await api.get('currency-codes')
    return data.data
}
const getCurrency = async () => {
    const {data} = await apiUsers.get(`currencies/${route.params.id}`,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data.data
}
const {data} = useQuery({
    queryKey:['currencies',route.params.id],
    queryFn: getCurrency
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
const onBack = () => {
    router.back()
}
const formState = reactive({
    name:"",
    currency_format:"",
    decimals:0,
    default:false
})
const isSubmitting = ref(false)
const onFinish = () => {
    isSubmitting.value = true
    apiUsers.put(`currencies/${route.params.id}`,formState,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    }).then(() => {
        message.success("Se ha modificado la moneda correctamente")
        router.push("/guards/users/currencies")
    }).catch(() => {
        message.error("Error al modificar la moneda")
    }).finally(() => {
        isSubmitting.value = false
    })
}
const {data: currencyCodes} = useQuery({
    queryKey:['currencies-codes'],
    queryFn:getAllCurrencyCodes
})
</script>