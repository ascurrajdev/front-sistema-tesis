<template>
    <a-row class="items-center justify-center mt-10">
        <a-col :span="12">
            <a-form 
                :model="formState"
                layout="vertical"
            >   
                <a-row :gutter="24">
                    <a-col :span="8">
                        <a-form-item
                            label="Razon Social"
                            name="business_name"
                        >
                            <a-input type="text" v-model="formState.business_name"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Tipo de Documento"
                            name="document_type"
                        >
                            <a-select
                                v-model:value="formState.document_type"
                            >
                                <a-select-option value="ruc">RUC</a-select-option>
                                <a-select-option value="ci">Cedula</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Valor del Documento"
                            name="business_name"
                        >
                            <a-input type="text" v-model="formState.document_id"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Pais"
                            name="country"
                        >
                            <a-input type="text" v-model="formState.country"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Provincia/Estado/Departamento"
                            name="state"
                        >
                            <a-input type="text" v-model="formState.city"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Ciudad"
                            name="city"
                        >
                            <a-input type="text" v-model="formState.city"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Direccion"
                            name="address"
                        >
                            <a-input type="text" v-model="formState.address"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Codigo Postal"
                            name="zip_code"
                        >
                            <a-input type="text" v-model="formState.zip_code"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-form-item>
                    <a-button type="primary" @click="onConfirm">Realizar el Pago</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>
<script setup>
    import {reactive} from 'vue'
    const formState = reactive({
        country:"",
        state:"",
        city:"",
        address:"",
        zip_code:"",
        document_type:"ruc",
        document_id:"",
        businnes_name:"",
    })
    const onConfirm = () => {
        window.location.replace("https://www.tpago.com.py/links?alias=PKNIX29541")
    }
</script>