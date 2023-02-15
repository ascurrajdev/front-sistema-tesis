<template>
    <div>
        <a-page-header
            title="Estado de Cuenta"
            @back="onBackHeader"
        />
        <a-tabs v-model:activeKey="activeTab">
            <a-tab-pane key="general" tab="Descripcion General">
                General
            </a-tab-pane>
            <a-tab-pane key="details" tab="Descripcion detallada de pagos">
                <a-table :columns="columnsTableDetailsPayments">

                </a-table>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const activeTab = ref('general')
    const onBackHeader = () => {
        router.back()
    }
    const columnsTableDetailsPayments = [
        {
            title:'Fecha',
            key:'date'
        },
        {
            title:'Monto',
            key:'amount'
        }
    ]
</script>