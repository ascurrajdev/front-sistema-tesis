<template>
    <a-page-header 
        title="Create Currency"
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { useAuthUserStore } from '@/stores/users/authUser';
import { message } from 'ant-design-vue';
import api from '@/services/api'
import apiUsers from '@/services/apiUsers'
const router = useRouter()
const authUserStore = useAuthUserStore()
const getAllCurrencyCodes = async () => {
    const {data} = await api.get('currency-codes')
    return data.data
}
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
    apiUsers.post('currencies',formState,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    }).then(() => {
        message.success("Se ha creado la moneda correctamente")
        router.push("/guards/users/currencies")
    }).catch(() => {
        message.error("Error al crear la moneda")
    }).finally(() => {
        isSubmitting.value = false
    })
}
const {data: currencyCodes} = useQuery({
    queryKey:['currencies-codes'],
    queryFn:getAllCurrencyCodes
})
</script>