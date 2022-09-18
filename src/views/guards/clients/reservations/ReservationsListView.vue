<template>
    <a-row>
        <a-col :span="12" :offset="6">
            <a-range-picker size="large" :open="true" v-model:value="rangeDate" :bordered="true" />
        </a-col>
    </a-row>
</template>
<script>
    import {ref, defineComponent} from 'vue'
    export default defineComponent({
        setup(){
            return{
                rangeDate: ref(),
            }
        }
    })
</script>