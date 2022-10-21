<template>
    <div class="w-full h-full p-5">
        <a-descriptions title="Perfil">
            <a-descriptions-item label="Nombre">{{auth.client.name}}</a-descriptions-item>
            <a-descriptions-item label="Correo">{{auth.client.email}}</a-descriptions-item>
            <a-descriptions-item label="Celular">{{auth.client.phone_number}}</a-descriptions-item>
        </a-descriptions>
        <!-- <a-descriptions title="Datos de Facturacion">
            <a-descriptions-item label="Direccion">Jose Ascurra</a-descriptions-item>
            <a-descriptions-item label="Ciudad">joseascurra123@gmail.com</a-descriptions-item>
            <a-descriptions-item label="Pais">joseascurra123@gmail.com</a-descriptions-item>
            <a-descriptions-item label="Codigo Postal">joseascurra123@gmail.com</a-descriptions-item>
        </a-descriptions> -->
    </div>
</template>
<script setup>
import {useAuthClientStore} from '@/stores/clients/authClient'
import { storeToRefs } from 'pinia';
const authClient = useAuthClientStore()
const {auth} = storeToRefs(authClient)
</script>