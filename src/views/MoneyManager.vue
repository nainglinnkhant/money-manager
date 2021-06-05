<template>
     <base-dialog v-if="!!errorMessage" :errorMessage="errorMessage" @close="confirmError"></base-dialog>

     <add-dialog v-if="isDialogOpen" @close="closeDialog" :type="type"></add-dialog>

     <div class="container">
          <div class="col-12 col-lg-10 offset-lg-1">
               <div class="balance-data">
                    <h4>Balance</h4>

                    <i class="pi pi-sign-out" title="logout" @click="logout"></i>

                    <h3>{{ formatter(totalBalance) }}</h3>
                    
                    <p>
                         <span class="income-data">income: {{ formatter(totalIncome) }}</span>
                         <span class="expense-data">expense: {{ formatter(totalExpense) }}</span>
                    </p>
               </div>

               <base-spinner v-if="isLoading"></base-spinner>

               <data-chart v-if="totalIncome > 0 || totalExpense > 0"></data-chart>

               <div class="control-section">
                    <button @click="addIncome('income')" class="shadow-sm">Add Income</button>
                    <button @click="addExpense('expense')" class="shadow-sm">Add Expense</button>
               </div>

               <ul class="daily-reports">
                    <daily-report-list 
                         v-for="dailyReport in dailyReports" 
                         :key="dailyReport.id" 
                         :daily-report="dailyReport">
                    </daily-report-list>
               </ul>
          </div>
     </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import DataChart from '../components/DataCharts.vue';
import DailyReportList from '../components/DailyReportList.vue';
import AddDialog from '../components/AddDialog.vue';

export default {
     components: {
          DataChart,
          DailyReportList,
          AddDialog
     },
     setup() {
          const errorMessage = ref(null);
          const store = useStore();
          const isLoading = ref(false);

          onBeforeMount(async() => {
               const userId = store.getters.getUserId;
               isLoading.value = true;
               try {
                    await store.dispatch('fetchReports', {
                         userId: userId
                    });
               }
               catch(error) {
                    errorMessage.value = 'Failed to load data';
               }
               isLoading.value = false;
          });

          function formatter(num) {
               num = num.toString();
               if(num.length > 3 && num.length < 7) {
                    num = num.substr(0, num.length - 3) + ',' + num.substr(num.length - 3, 3);
               }
               else if(num.length > 6) {
                    num = num.substr(0, num.length - 6) + ',' + num.substr(num.length - 6, 3) + ',' + num.substr(3, 3);
               }
               return num;
          }

          const totalIncome = computed(() => {
               return store.getters.getTotalIncome;
          });

          const totalExpense = computed(() => {
               return store.getters.getTotalExpense;
          });

          const totalBalance = computed(() => {
               return totalIncome.value - totalExpense.value;
          });

          function addIncome(para) {
               isDialogOpen.value = true;
               type.value = para;
          }

          function addExpense(para) {
               isDialogOpen.value = true;
               type.value = para;
          }

          const isDialogOpen = ref(false);

          function closeDialog() {
               isDialogOpen.value = false;
          }
          
          const type = ref('');

          const dailyReports = computed(() => {
               return store.getters.getReports;
          });

          function confirmError() {
               errorMessage.value = '';
          }

          const router = useRouter();

          function logout() {
               store.dispatch('logout');
               router.replace('/auth');
          }

          return {
               isDialogOpen,
               closeDialog,
               addIncome,
               addExpense,
               type,
               dailyReports,
               totalIncome,
               totalExpense,
               totalBalance,
               formatter,
               errorMessage,
               confirmError,
               logout,
               isLoading
          };
     }
}
</script>

<style scoped>
.balance-data {
     margin: 30px 0;
     padding: 20px;
     background: #3ec3d5;
     color: #ffffff;
     border-radius: 10px;
}
.balance-data h4 {
     font-size: 17px;
     display: inline-block;
}
i {
     margin-left: 15px;
     cursor: pointer;
}
i[title]:hover:after {
     content: attr(title);
     background: #ffffff;
     color: #3ec3d5;
     border-radius: 5px;
     padding: 2px 6px 7px 6px;
     margin-left: 5px;
}
.balance-data h3 {
     font-size: 17px;
     padding-left: 10px;
     margin: 10px 0;
}
p {
     font-size: 15px;
     margin-top: 10px;
     margin-bottom: 0;
}
.income-data {
     padding-right: 20px;
}
.control-section {
     text-align: center;
     margin-top: 40px;
}
button {
     font-size: 14px;
     color: #3ec3d5;
     background: #ffffff;
     border-radius: 50px;
     padding: 5px 12px;
     margin-left: 10px;
     margin-right: 10px;
     border: none;
}
button:hover {
     color: #ffffff;
     background: #3ec3d5;
}
button:focus {
     outline: none;
}
.daily-reports {
     padding: 0;
     margin: 0;
     padding: 50px 0;
}
@media (max-width: 768px) {
     button {
          padding: 4px 10px;
     }
}
</style>