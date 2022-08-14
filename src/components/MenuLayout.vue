<script setup>
    import {MessageOutlined, HomeOutlined,CustomerServiceOutlined,UserOutlined,TeamOutlined} from '@ant-design/icons-vue'
    import {ref, watch} from 'vue'
    import { useI18n } from 'vue-i18n';
    import {useRoute, useRouter} from 'vue-router'
    import Breadcrumb from './Breadcrumb.vue'
    import {useAuthClientStore} from "@/stores/clients/authClient"
    const useAuthClient = useAuthClientStore()
    const {t} = useI18n({useScope:"global"})
    const route = useRoute()
    const router = useRouter()
    const selectedKeys = ref([route.fullPath])
    watch(selectedKeys, (newPath) => router.push(newPath[0]))
</script>
<template>
    <a-layout class="flex h-screen">
        <a-layout-header>
            <a-menu theme="dark" v-model:selectedKeys="selectedKeys"  mode="horizontal">
                <a-menu-item key="/">
                    <template #icon>
                        <HomeOutlined />
                    </template>
                    {{t("home")}}
                </a-menu-item>
                <a-menu-item key="/about">
                    <template #icon>
                        <TeamOutlined />
                    </template>
                    {{t("about")}}
                </a-menu-item>
                <a-menu-item key="/frequently-questions">
                    <template #icon>
                        <customer-service-outlined/>
                    </template>
                    {{t('frequently questions')}}
                </a-menu-item>
                <a-menu-item key="/suggestions">
                    <template #icon>
                        <message-outlined />
                    </template>
                    {{t('suggestions')}}
                </a-menu-item>
                <a-menu-item key="/guards/clients/auth/login" v-if="!useAuthClient.auth.isLogged">
                    <template #icon>
                        <user-outlined></user-outlined>
                    </template>
                    {{t('login')}}
                </a-menu-item>
                <a-menu-item key="/guards/clients/home" v-if="useAuthClient.auth.isLogged">
                    <template #icon>
                        <user-outlined></user-outlined>
                    </template>
                    {{useAuthClient.auth.client.name}}
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content class="p-5 grow">
            <Breadcrumb />
            <router-view class="h-full overflow-auto bg-white"></router-view>
        </a-layout-content>
        <a-layout-footer class="text-center">
            Sistema Tesis ©2022
        </a-layout-footer>
    </a-layout>
</template>