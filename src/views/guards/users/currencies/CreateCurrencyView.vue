<template>
    <a-page-header 
        title="Create Currency"
        @back="onBack"
    />
    <a-card>
        <a-form 
            layout="vertical"
        >
            <a-form-item
                label="Nombre"
                name="name"
                :rules="[{required:true, message:'Introduzca el nombre de la moneda'}]"
            >
                <a-input />
            </a-form-item>
            <a-form-item
                label="Codigo de Moneda"
            >
                <a-select :options="currencyCodes" />
            </a-form-item>
            <a-form-item
                label="Decimales"
            >
                <a-input-number />
            </a-form-item>
            <a-form-item>
                <a-checkbox >Moneda por Defecto</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import api from '@/services/api'
const router = useRouter()
const getAllCurrencyCodes = async () => {
    const {data} = await api.get('currency-codes')
    return data.data
}
const onBack = () => {
    router.back()
}
const {data: currencyCodes} = useQuery({
    queryKey:['currencies-codes'],
    queryFn:getAllCurrencyCodes
})
</script>