<template>
    <div>
        <a-page-header
            title="Estado de Cuenta"
            @back="onBackHeader"
        />
        <a-tabs v-model:activeKey="activeTab">
            <a-tab-pane key="general" tab="Descripcion General">
                <div class="flex gap-5">
                    <h1 class="text-2xl" v-if="totalAmount > 0">
                        Total a Pagar: 
                        <span v-if="!!billingData">Gs. {{ currencyFormat(totalAmount) }}</span>
                    </h1>
                    <a-result
                        style="width:100%;"
                        v-else
                        status="success"
                        title="La reservacion esta pagada completamente"
                    >
                    <template #extra>
                        <a-button @click="goToPayments" type="primary">Ver Pagos</a-button>
                    </template>
                    </a-result>
                    <a-button v-if="totalAmount > 0" @click="onTogglePayAmount" type="primary">Realizar Pago</a-button>
                </div>
            </a-tab-pane>
            <a-tab-pane key="details" tab="Descripcion detallada de pagos">
                <a-table :data-source="billingData.data" :columns="columnsTableDetailsPayments" />
            </a-tab-pane>
        </a-tabs>
        <a-modal okText="Pagar" :okButtonProps="okPaymentModalProps" cancelText="Cancelar" :confirm-loading="loadingModalPayment" v-model:visible="modalShowPayAmount" @ok="onOkModalPayAmount">
            <a-form layout="vertical">
                <a-form-item
                    label="Monto"
                    name="amount"
                >
                    <a-input-number
                        style="width:100%;"
                        v-model:value="paymentForm.amount"
                        :formatter="value => `Gs ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\Gs\s?|(,*)/g, '')"
                    />
                    <br>
                    <p class="text-green-700 font-semibold">Gs. {{ currencyFormat(billingData.amount_pending_paid - paymentForm.amount) }}</p>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref,watch,reactive,computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useQuery } from '@tanstack/vue-query';
    import apiClients from "@/services/apiClients";
    import {useAuthClientStore} from '@/stores/clients/authClient'
    const authClient = useAuthClientStore()
    const router = useRouter()
    const route = useRoute()
    const activeTab = ref('general')
    const paymentForm = reactive({
        amount:0
    })
    const goToPayments = () => {
        activeTab.value = "details"
    }
    const okPaymentModalProps = reactive({
        disabled: true
    })
    const makePaymentReservation = () => {
        apiClients.post(`reservations/${route.params.id}/make-payment`,paymentForm,{
            headers:{
                'Authorization':`Bearer ${authClient.auth.credentials.plainTextToken}`
            }
        }).then((response) => {
            window.location = response.data.data
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            loadingModalPayment.value = false
        })
    }
    const onBackHeader = () => {
        router.back()
    }
    const modalShowPayAmount = ref(false)
    const loadingModalPayment = ref(false)
    const totalAmount = ref(0)
    const onTogglePayAmount = () => {
        modalShowPayAmount.value = !modalShowPayAmount.value
    }
    const onOkModalPayAmount = () => {
        loadingModalPayment.value = true
        makePaymentReservation()
    }
    const currencyFormat = (price) => new Intl.NumberFormat('de-DE').format(price)
    const getAllBillingOfReservation = async() => {
        const {data} = await apiClients.get(`reservations/${route.params.id}/billing`,{
            headers:{
                'Authorization':`Bearer ${authClient.auth.credentials.plainTextToken}`
            }    
        })
        return data;
    }
    const {isLoading, data:billingData, refetch} = useQuery({queryKey:["reservationBilling",route.params.id],queryFn:getAllBillingOfReservation})
    watch(billingData,(value) => {
        if(!!value?.amount_pending_paid){
            totalAmount.value = value?.amount_pending_paid
        }
    })
    watch(
        () => paymentForm.amount,
        (value, prev) =>{
            okPaymentModalProps.disabled = value == 0
            if((totalAmount.value - value) < 0){
                paymentForm.amount = prev
            }
        },
        {
            deep:true
        }
    )
    const columnsTableDetailsPayments = [
        {
            title:'Id',
            key:'id',
            dataIndex:'id'
        },
        {
            title:'Fecha',
            key:'created_at',
            dataIndex:'created_at'
        },
        {
            title:'Monto',
            key:'total_amount_paid',
            dataIndex:'total_amount_paid'
        }
    ]
</script>