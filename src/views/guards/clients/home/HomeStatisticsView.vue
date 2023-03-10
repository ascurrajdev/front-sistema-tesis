<script setup>
import {ref, reactive, watch} from 'vue'
import apiClients from "@/services/apiClients";
import {useAuthClientStore} from '@/stores/clients/authClient'
const authClient = useAuthClientStore()
const statistics = ref([]);
const getAllStatistics = () => {
  apiClients.get('statistics',{
    headers:{
      'Authorization':`Bearer ${authClient.auth.credentials.plainTextToken}`
    }
  }).then((response) => {
    statistics.value = response.data.data
  }).catch(() => {

  })
}
getAllStatistics()
</script>
<template>
    <a-row :gutter="16">
      <a-col :span="12" v-for="statistic in statistics">
        <a-card>
          <a-statistic
            :title="statistic.type"
            :value="statistic.quantity"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
</template>