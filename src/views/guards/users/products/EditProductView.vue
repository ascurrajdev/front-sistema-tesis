<template>
    <a-page-header title="Update Product" @back="onBackHeader"/>
    <a-card>
        <a-form @finish="onFinishForm" :model="formState" layout="vertical">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item
                        label="Nombre"
                        name="name"
                        :rules="[{required:true,message:'Por favor introduzca el nombre'}]"
                    >
                        <a-input v-model:value="formState.name"/>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item
                        label="Precio Venta"
                        name="amount"
                        :rules="[{required:true, message:'Por favor introduzca el monto'}]"
                    >
                        <a-input-number v-model:value="formState.amount" prefix="PYG" style="width:100%;"/>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item
                        label="Impuesto"
                        name="tax_id"
                    >
                        <a-select v-model:value="formState.tax_id" :options="taxes">
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item>
                <a-checkbox v-model:checked="formState.stockable">Activar Stock de Este Producto</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.active_for_reservation">Activar para Reservaciones</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="formState.is_lodging">Es Hospedaje</a-checkbox>
            </a-form-item>
            <a-row v-show="formState.is_lodging" :gutter="24">
                <a-col :span="12">
                    <a-form-item
                        label="Capacidad Minima"
                    >
                        <a-input-number v-model:value="formState.capacity_for_day_min" style="width:100%;"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item
                        label="Capacidad Maxima"
                    >
                        <a-input-number v-model:value="formState.capacity_for_day_max" style="width:100%;"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item>
                <a-button type="primary" :loading="isSubmitting" html-type="submit" >Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
    import { reactive, watch, ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useQuery } from '@tanstack/vue-query';
    import {message} from 'ant-design-vue'
    import apiUsers from '@/services/apiUsers'
    import { useAuthUserStore } from '@/stores/users/authUser';
    const router = useRouter()
    const route = useRoute()
    const authUserStore = useAuthUserStore()
    const onBackHeader = () => {
        router.back()
    }
    const getDataOfProduct = async () => {
        const {data} = await apiUsers.get(`products/${route.params.id}`,{
            headers:{
                'Authorization':`Bearer ${authUserStore.auth.credentials.plainTextToken}`
            }
        })
        return data.data
    }
    const {data} = useQuery({queryKey:['products', route.params.id], queryFn: getDataOfProduct})
    watch(data, (value) => {
        Object.keys(formState).forEach((key) => {
            formState[key] = value[key]
        })
    })
    const isSubmitting = ref(false)
    const onFinishForm = () => {
        isSubmitting.value = true
        apiUsers.put(`products/${route.params.id}`,formState,{
            headers:{
                'Authorization': `Bearer ${authUserStore.auth.credentials.plainTextToken}`
            }
        }).then(() => {
            message.success("El producto se ha guardado correctamente")
            router.push("/guards/users/products")
        }).catch(() => {
            message.error("Error al actualizar el producto")
        }).finally(() => {
            isSubmitting.value = false
        })
    }
    const taxes = [
        {
            label:"Ninguno",
            value:null,
        },
        {
            label:"IVA 10",
            value:1
        }
    ]
    const formState = reactive({
        name:"",
        amount:"",
        tax_id:"",
        stockable: false,
        active_for_reservation: false,
        is_lodging: false,
        capacity_for_day_max:"",
        capacity_for_day_min:""
    })
    onMounted(() => {
       if(!!data.value){
            Object.keys(formState).forEach((key) => {
                formState[key] = data.value[key]
            })
       }
    })
    watch(
        () => formState.is_lodging,
        (value) => {
            if(value){
                formState.active_for_reservation = true
            }
        }
    )
</script>