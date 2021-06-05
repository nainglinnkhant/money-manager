<template>
     <Chart type="doughnut" :data="chartData" :key="key" />
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

          const incomes = computed(() => {
               return store.getters.getIncomes;
          });

          function calculateTotal(description) {
               const arr = incomes.value.filter(income => income.description === description);
               let total = 0;
               for(let i = 0; i < arr.length; i++) {
                    total += arr[i].amount;
               }
               return total;
          }

          const key = ref(0);

          const chartLabels = ref([]);
          const data = ref([]);
          const bgColors = ref([]);
          const hoverBgColors = ref([]);
          const chartData = ref(null);

          (function() {
               calcChartData();
          })();

          watch(incomes, () => {
               key.value++;
               calcChartData();
          });
          
          function calcChartData() {
               const backgroundColors = ["#42A5F5", "#66BB6A", "#FFA726", "#ff6384", "#616774"];

               const hoverBackgroundColors = ["#64B5F6", "#81C784", "#FFB74D", "#fa7591", "#6f7278"];

               const descriptions = [];
               incomes.value.forEach(income => {
                    if(descriptions.some(des => des === income.description)) return;
                    descriptions.push(income.description);
               });
               chartLabels.value = descriptions;

               data.value = descriptions.map(des => calculateTotal(des));

               bgColors.value = backgroundColors.slice(0, descriptions.length);
               hoverBgColors.value = hoverBackgroundColors.slice(0, descriptions.length);

               chartData.value = {
                    labels: chartLabels.value,
                    datasets: [
                         {
                              data: data.value,
                              backgroundColor: bgColors.value,
                              hoverBackgroundColor: hoverBgColors.value
                         }
                    ]
               };
          }

          return {
               chartData,
               key
          }
     }
}
</script>