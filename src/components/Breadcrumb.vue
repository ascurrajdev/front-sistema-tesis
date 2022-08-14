<script setup>
    import { computed } from 'vue';
    import {useRoute} from 'vue-router'
    import { useI18n } from 'vue-i18n';
    const {t} = useI18n()
    const route = useRoute();
    const routeMapped = computed(() => {
        return route.fullPath.split("/").filter((value,key) => key != 0 ? !!value : true).map((value,key) => {
            if(key == 0){
                value = "home"
            }
            return {
                breadcrumbName: value
            }
        })
    })
</script>
<template>
    <a-breadcrumb style="margin: 16px 0;" :routes="routeMapped">
        <template #itemRender="{ route, routes, paths }">
            <span v-if="routes.indexOf(route) === routes.length - 1">{{t(route.breadcrumbName)}}</span>
            <router-link v-else :to="paths.join('/')">{{t(route.breadcrumbName)}}</router-link>
        </template>
    </a-breadcrumb>
</template>