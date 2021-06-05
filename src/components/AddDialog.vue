<template>
     <teleport to="body">
          <div class="backdrop"></div>

          <dialog open>
               <form @submit.prevent="submitForm">
                    <input class="form-control mb-4" type="text" v-model.number="amount" placeholder="Amount">

                    <select name="income" id="income" v-if="type === 'income'" class="form-control" v-model="description">
                         <option value="">Choose an option</option>
                         <option value="salary">salary</option>
                         <option value="refunds">refunds</option>
                         <option value="rental">rental</option>
                         <option value="sale">sale</option>
                         <option value="other">other</option>
                    </select>

                    <select name="expense" id="expense" v-else class="form-control" v-model="description">
                         <option value="">Choose an option</option>
                         <option value="food">food</option>
                         <option value="clothing">clothing</option>
                         <option value="groceries">groceries</option>
                         <option value="transportation">transportation</option>
                         <option value="travel">travel</option>
                         <option value="bills">bills</option>
                         <option value="education">education</option>
                         <option value="tax">tax</option>
                         <option value="health">health</option>
                         <option value="entertainment">entertainment</option>
                         <option value="drinks">drinks</option>
                         <option value="cigarette">cigarette</option>
                         <option value="other">other</option>
                    </select>

                    <p class="error-message" v-if="invalid">*please fill valid inputs</p>

                    <button>Submit</button>
                    <button type="button" @click="close">Cancel</button>
               </form>
          </dialog>
     </teleport>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
     props: ['type'],
     emits: ['close'],
     setup(props, context) {
          const amount = ref(null);
          const description = ref('');
          const invalid = ref(false);

          const store = useStore();

          async function submitForm() {
               if(amount.value < 0 || amount.value === '' || description.value === '') {
                    invalid.value = true;
                    return;
               }
               context.emit('close');

               const userId = store.getters.getUserId;

               await store.dispatch('addReport', {
                    userId: userId,
                    date: createDate(),
                    type: props.type,
                    amount: amount.value,
                    description: description.value  
               });
          }

          function createDate() {
               const date = new Date();
               const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

               return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
          }

          function close() {
               context.emit('close');
          }

          return {
               amount,
               description,
               submitForm,
               invalid,
               close
          };
     }
}
</script>

<style scoped>
dialog {
     position: fixed;
     top: 20vh;
     left: 30%;
     width: 40%;
     z-index: 100;
     border-radius: 12px;
     border: none;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
     padding: 30px 50px;
     margin: 0;
     overflow: hidden;
     background-color: white;
     text-align: center;
}
.backdrop {
     position: fixed;
     top: 0;
     left: 0;
     height: 100vh;
     width: 100%;
     background-color: rgba(0, 0, 0, 0.75);
     z-index: 10;
}
.form-control {
     font-size: 14px;
}
.error-message {
     color: red;
     margin-bottom: 0;
     padding-top: 15px;
     text-align: left;
     font-size: 14px;
}
button {
     color: #3ec3d5;
     font-size: 14px;
     background: #ffffff;
     border: 1px solid #3ec3d5;
     border-radius: 50px;
     padding: 4px 11px;
     margin-left: 10px;
     margin-right: 10px;
     margin-top: 20px;
}
button:focus {
     outline: none;
}
@media (max-width: 1200px) {
     dialog {
          left: 20%;
          width: 60%;
     }
}
@media (max-width: 768px) {
     dialog {
          left: 10%;
          width: 80%;
     }
}
@media (max-width: 576px) {
     dialog {
          padding: 20px 20px 15px 20px;
     }
}
</style>