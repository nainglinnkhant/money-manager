<template>
     <li>
          <div class="row">
               <div class="col-4">
                    <p class="date">{{ dailyReport.date }}</p>
               </div>

               <div class="col-4 margin-adjust">
                    <p class="pl-sm-4 pl-md-5">{{ dailyReport.description }}</p>
               </div>

               <div class="col-4">
                    <div class="row">
                         <div class="col-8 col-md-10">
                              <p class="amount">{{ amount }}</p>
                         </div>

                         <div class="col-4 col-md-2">
                              <i class="pi pi-trash" @click="deleteReport(dailyReport.id)"></i>
                         </div>
                    </div>
               </div>
          </div>
     </li>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
     props: ['dailyReport'],
     setup(props) {
          const store = useStore();

          const amountPrefix = computed(() => {
               return props.dailyReport.type === 'income'? '+' : '-';
          });

          function deleteReport(id) {
               // props.dailyReport.id === id
               store.dispatch('deleteReport', { reportId: id });
          }

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

          const amount = computed(() => {
               return amountPrefix.value +''+ formatter(props.dailyReport.amount);
          });

          return {
               deleteReport,
               amount
          };
     }
}
</script>

<style scoped>
li {
     list-style: none;
     font-size: 14px;
     padding: 0 20px;
     margin-bottom: 5px;
     color: #374151;
}
p {
     margin-bottom: 0;
     padding: 10px 0;
}
i {
     padding-top: 12px;
     cursor: pointer;
}
.amount {
     text-align: right;
}
@media (max-width: 576px) {
     li {
          padding: 0;
     }
     .date {
          font-size: 13px;
     }
     .margin-adjust {
          margin-left: -4px;
     }
}
</style>