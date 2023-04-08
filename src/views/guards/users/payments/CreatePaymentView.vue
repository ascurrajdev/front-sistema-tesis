<template>
    <a-page-header 
        title="Create Payment"
        @back="onBack"
    />
    <a-card>
        <a-form
            :model="formState"
            layout="vertical"
        >
            <a-form-item
                label="Nombre"
                name="name"
            >
                <a-input v-model:value="formState.name"/>
            </a-form-item>
            <a-form-item>
                <a-checkbox>Es Tarjeta</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-select :options="typeCards" />
            </a-form-item>
            <a-form-item>
                <a-checkbox>Es Efectivo</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox>Es Transferencia Bancaria</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox>Es Transferencia Online</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const onBack = () => {
    router.back()
}
const formState = reactive({
    name:""
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
</script>