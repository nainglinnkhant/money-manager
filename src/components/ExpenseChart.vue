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

          const expenses = computed(() => {
               return store.getters.getExpenses;
          });

          function calculateTotal(description) {
               const arr = expenses.value.filter(expense => expense.description === description);
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

          watch(expenses, () => {
               key.value++;
               calcChartData();
          });
          
          function calcChartData() {
               const backgroundColors = ["#42A5F5", "#66BB6A", "#FFA726", "#ff6384", "#616774", "#f7f705", "#c265c2", "#ffe582", "#61cf3c", "#fc4c4c", "#2a3e5e", "#6adaf7", "#949FB1"];

               const hoverBackgroundColors = ["#64B5F6", "#81C784", "#FFB74D", "#fa7591", "#6f7278", "#fafa41", "#c97dc9", "#fce99f", "#78f74d", "#fa6666", "#435778", "#86e4fc", "#a6adba"];

               const descriptions = [];
               expenses.value.forEach(expense => {
                    if(descriptions.some(des => des === expense.description)) return;
                    descriptions.push(expense.description);
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
          };
     }
}
</script>