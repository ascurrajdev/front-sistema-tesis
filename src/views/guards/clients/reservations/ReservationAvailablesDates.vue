<script setup>
    import {ref} from 'vue'
    const rangeDates = ref([
        '2022-10-10','2022-10-11'
    ])
    const disableDate = (current) => {
        console.log(current.$d.toISOString().slice(0,10))
        return rangeDates.value.includes(current.$d.toISOString().slice(0,10))
    }
</script>
<template>
    <a-row type="flex" class="items-center mt-10 justify-center">
        <a-col>
            <a-range-picker format="YYYY-MM-DD" :disabled-date="disableDate" :ranges="rangeDates"></a-range-picker>
        </a-col>
    </a-row>
</template>