<template>
    <a-page-header 
        title="Edit Agency"
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
                name="active_for_reservations_online"
            >
                <a-checkbox v-model:checked="formState.active_for_reservations_online">Activo Para Reservaciones</a-checkbox>
            </a-form-item>
            <a-form-item
                name="active"
            >
                <a-checkbox v-model:checked="formState.active">Activo</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button :loading="isSubmitting" type="primary" html-type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
import {reactive, ref, watch, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import apiUsers from '@/services/apiUsers'
import { useAuthUserStore } from '@/stores/users/authUser';
import { message } from 'ant-design-vue';
const router = useRouter()
const route = useRoute()
const onBack = () => {
    router.back()
}
const getAgency = async () => {
    const {data} = await apiUsers.get(`agencies/${route.params.id}`,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    })
    return data.data
}
const {data} = useQuery({
    queryFn:getAgency,
    queryKey:['agencies',route.params.id]
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
const authUserStore = useAuthUserStore()
const onSubmitForm = () => {
    isSubmitting.value = true
    apiUsers.put(`agencies/${route.params.id}`,formState,{
        headers:{
            'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
        }
    }).then(() => {
        message.success("Se ha modificado correctamente la sucursal")
        router.push("/guards/users/agencies")
    }).catch(() => {
        message.error("Error al modificar la sucursal")
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