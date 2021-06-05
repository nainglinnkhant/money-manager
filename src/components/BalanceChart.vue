<template>
     <Chart type="doughnut" :data="chartData" :key="key"/>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Chart from 'primevue/chart';

export default {
     components: {
          Chart
     },
     setup() {
          const store = useStore();

          const totalIncome = computed(() => {
               return store.getters.getTotalIncome;
          });

          const totalExpense = computed(() => {
               return store.getters.getTotalExpense;
          });

          const key = ref(0);

          function reRender() {
               key.value++;
               const newArr = [
                    totalIncome.value,
                    totalExpense.value
               ];
               chartData.value.datasets[0].data = newArr;
          }

          watch(totalIncome, () => {
               reRender();
          });

          watch(totalExpense, () => {
               reRender();
          });

          const chartData = ref({
               labels: ['Income', 'Expense'],
               datasets: [
                    {
                         data: [totalIncome.value, totalExpense.value],
                         backgroundColor: [
                              "#3ec3d5",
                              "#ff6384"
                         ],
                         hoverBackgroundColor: [
                              "#55c5d4",
                              "#fa7591"
                         ]
                    }
               ]
          });

          return {
               chartData,
               key
          }
     }
}
</script>