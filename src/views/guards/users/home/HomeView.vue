<template>
    <div class="w-full px-5">
        <h1 class="text-2xl">Hola, Jose Ascurra</h1>
        <a-row>
            <a-col :span="8">
                <a-statistic title="Reservaciones (Este Mes)" :value="12" />
            </a-col>
            <a-col :span="8">
                <a-statistic title="Ingresos (Este Mes)" :value="120000000" />
            </a-col>
            <a-col :span="8">
                <a-statistic title="Pendientes (Este Mes)" :value="1200000" />
            </a-col>
        </a-row>
        <Responsive class="w-full">
            <template #main="{ width }">
                <Chart
                    :size="{width, height:400}"
                    direction="horizontal"
                    :data="dataChart"
                >
                    <template #layers>
                        <Grid strokeDasharray="2,2" />
                        <Line :dataKeys="['name', 'pl']" />
                        <Line :dataKeys="['name', 'avg']" :lineStyle="{ stroke: 'red' }" type="step" />
                    </template>
                    <template #widgets>
                        <Tooltip
                            borderColor="#48CAE4"
                            :config="{
                            name: { hide: true },
                            pl: { color: '#0077b6' },
                            avg: { label: 'averange', color: 'red' },
                            inc: { hide: true }
                            }"
                        />
                    </template>
                </Chart>
            </template>
        </Responsive>
    </div>
</template>
<script setup>
import {reactive} from 'vue'
import {Responsive, Chart, Grid, Line, Tooltip} from 'vue3-charts'
const dataChart = reactive([
  { name: 'Jan', pl: 1000, avg: 500, inc: 300 },
  { name: 'Feb', pl: 2000, avg: 900, inc: 400 },
  { name: 'Apr', pl: 400, avg: 400, inc: 500 },
  { name: 'Mar', pl: 3100, avg: 1300, inc: 700 },
  { name: 'May', pl: 200, avg: 100, inc: 200 },
  { name: 'Jun', pl: 600, avg: 400, inc: 300 },
  { name: 'Jul', pl: 500, avg: 90, inc: 100 }
])
</script>