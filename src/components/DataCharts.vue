<template>
     <div class="data-charts">
          <div class="chart-options ml-1 ml-sm-3">
               <button
                    @click="selectChartCategory('Balance')" 
                    :class="{ active: isBalanceChartActive }">
                    Balance
               </button>
               
               <button
                    @click="selectChartCategory('Income')"
                    :class="{ active: isIncomeChartActive }">
                    Income
               </button>

               <button
                    @click="selectChartCategory('Expense')"
                    :class="{ active: isExpenseChartActive }">
                    Expense
               </button>
          </div>

          <div class="row">
               <div class="col-md-8 offset-md-2">
                    <balance-chart v-if="isBalanceChartActive"></balance-chart>
                    <income-chart  v-else-if="isIncomeChartActive"></income-chart>
                    <expense-chart v-else></expense-chart>
               </div>
          </div>
     </div>
</template>

<script>
import { ref, computed } from 'vue';

import BalanceChart from './BalanceChart.vue';
import IncomeChart from './IncomeChart.vue';
import ExpenseChart from './ExpenseChart.vue';

export default {
     components: {
          BalanceChart,
          IncomeChart,
          ExpenseChart
     },
     setup() {
          const selectedChartCategory = ref('Balance');

          const isBalanceChartActive = computed(() => {
               return selectedChartCategory.value === 'Balance';
          });

          const isIncomeChartActive = computed(() => {
               return selectedChartCategory.value === 'Income';
          });

          const isExpenseChartActive = computed(() => {
               return selectedChartCategory.value === 'Expense';
          });

          function selectChartCategory(category) {
               selectedChartCategory.value = category;
          }

          return {
               selectedChartCategory,
               selectChartCategory,
               isBalanceChartActive,
               isIncomeChartActive,
               isExpenseChartActive
          }
     }
}
</script>

<style scoped>
.chart-options {
     margin-bottom: 30px;
}
button {
     font-size: 14px;
     color: #3ec3d5;
     background: #ffffff;
     border-radius: 50px;
     border: 1px solid #3ec3d5;
     padding: 3px 9px;
     margin-right: 8px;
}
button:hover {
     color: #ffffff;
     background: #3ec3d5;
}
button:focus {
     outline: none;
}
.active {
     color: #ffffff;
     background: #3ec3d5;
}
</style>