<template>
    <a-page-header title="Create Product" @back="onBackHeader"/>
    <a-card>
        <a-form layout="vertical">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item
                        label="Nombre"
                        name="name"
                        :rules="[{required:true,message:'Por favor introduzca el nombre'}]"
                    >
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item
                        label="Precio Venta"
                        name="amount"
                        :rules="[{required:true, message:'Por favor introduzca el monto'}]"
                    >
                        <a-input-number prefix="PYG" style="width:100%;"/>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item
                        label="Impuesto"
                        name="tax_id"
                        :rules="[{required:true, message:'Por favor seleccione el impuesto'}]"
                    >
                        <a-select>
                            <a-select-option value="">Ninguno</a-select-option>
                            <a-select-option value="10">IVA 10</a-select-option>
                            <a-select-option value="5">IVA 5</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item>
                <a-checkbox>Activar para Reservaciones</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox>Activar Stock de Este Producto</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-checkbox>Es Hospedaje</a-checkbox>
            </a-form-item>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item
                        label="Capacidad Minima"
                    >
                        <a-input-number style="width:100%;"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item
                        label="Capacidad Maxima"
                    >
                        <a-input-number style="width:100%;"/>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item>
                <a-button type="primary">Guardar</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const onBackHeader = () => {
        router.back()
    }
</script>