<template>
    <a-page-header 
        title="Create Agency"
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
            <a-form-item
                label="Ciudad"
                name="city"
                :rules="[{required:true,message:'La ciudad es requerido'}]"
            >
                <a-input v-model:value="formState.city"/>
            </a-form-item>
            <a-form-item
                label="Barrio"
                name="neighborhood"
                :rules="[{required:true,message:'El barrio es requerido'}]"
            >
                <a-input v-model:value="formState.neighborhood"/>
            </a-form-item>
            <a-form-item
                label="Direccion"
                name="address"
                :rules="[{required:true,message:'La direccion es requerido'}]"
            >
                <a-input v-model:value="formState.address"/>
            </a-form-item>
            <a-form-item
                label="Activo Para Reservaciones"
                name="active_for_reservations_online"
            >
                <a-switch v-model:checked="formState.active_for_reservations_online"/>
            </a-form-item>
            <a-form-item
                label="Activo"
                name="active"
            >
                <a-switch v-model:checked="formState.active"/>
            </a-form-item>
            <a-form-item>
                <a-button :loading="isSubmitting" type="primary" html-type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router';
import apiUsers from '@/services/apiUsers'
import { useAuthUserStore } from '@/stores/users/authUser';
import { message } from 'ant-design-vue';
const router = useRouter()
const onBack = () => {
    router.back()
}
const authUserStore = useAuthUserStore()
const onSubmitForm = () => {
    isSubmitting.value = true
    apiUsers.post('agencies',formState,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    }).then(() => {
        message.success("Se ha registrado correctamente la sucursal")
        router.push("/guards/users/agencies")
    }).catch(() => {
        message.error("Error al registrar la sucursal")
    }).finally(() => {
        isSubmitting.value = false
    })
}
const isSubmitting = ref(false)
const formState = reactive({
    name:"",
    address:"",
    city:"",
    neighborhood:"",
    active_for_reservations_online:false,
    active:false
})
</script>