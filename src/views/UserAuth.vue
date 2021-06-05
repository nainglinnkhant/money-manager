<template>
     <base-dialog v-if="isLoading" errorMessage="Authenticating.." fixed>
          <base-spinner></base-spinner>
     </base-dialog>

     <base-dialog v-if="!!errorMessage && !isLoading" :errorMessage="errorMessage" @close="confirmError"></base-dialog>

     <div class="container">
          <div class="col-md-6 offset-md-3">
               <h2>Welcome!</h2>

               <form @submit.prevent="submitForm">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" v-model.trim="email">

                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model.trim="password">

                    <p class="error-message" v-show="invalid">
                         *Please enter the valid email and password (at least six characters).
                    </p>

                    <div class="action">
                         <button class="submit-button">{{ authMode }}</button>
                    </div>

                    <div class="auth-switch">
                         <p v-if="authMode === 'Signup'">Already have an account? <a @click="switchAuthMode">Login</a></p>
                         <p v-else>Don't have an account? <a @click="switchAuthMode">Signup</a></p>
                    </div>
               </form>
          </div>
     </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
     setup() {
          const email = ref('');
          const password = ref('');
          const authMode = ref('Login');
          const invalid = ref(false);
          const errorMessage = ref(null);
          const isLoading = ref(false);

          const store = useStore();
          const router = useRouter();

          async function submitForm() {
               if(email.value === '' || password.value.length < 6) {
                    invalid.value = true;
                    return;
               }
               isLoading.value = true;
               try {
                    await store.dispatch('auth', {
                         email: email.value,
                         password: password.value,
                         authMode: authMode.value
                    });

                    router.replace('/');
               }
               catch(error) {
                    if(authMode.value === 'Signup') {
                         errorMessage.value = 'Your email is already used!';
                    }
                    else {
                         errorMessage.value = 'Invalid email or password!';
                    }
               }
               isLoading.value = false;
          }

          function switchAuthMode() {
               if(authMode.value === 'Signup') {
                    authMode.value = 'Login';
               }
               else {
                    authMode.value = 'Signup';
               }
          }

          function confirmError() {
               errorMessage.value = '';
          }
     
          return {
               email,
               password,
               submitForm,
               authMode,
               switchAuthMode,
               invalid,
               errorMessage,
               confirmError,
               isLoading
          };
     }
}
</script>

<style scoped>
h2 {
     text-align: center;
     padding-top: 70px;
     padding-bottom: 30px;
}
label {
     font-size: 14px;
}
.form-control {
     font-size: 14px;
     padding: 4px 6px;
     margin-bottom: 10px;
}
.error-message {
     margin-bottom: 0;
     font-size: 13px;
     color: red;
}
.action {
     text-align: center;
     padding: 15px 0;
}
button {
     color: #3ec3d5;
     font-size: 15px;
     padding: 5px 15px;
     background: #ffffff;
     border: 1px solid #3ec3d5;
     border-radius: 50px;
     margin: 0 10px;
}
button:focus {
     outline: none;
}
.submit-button {
     color: #ffffff;
     background: #3ec3d5;
}
.auth-switch p {
     font-size: 13px;
     text-align: center;
}
.auth-switch a {
     cursor: pointer;
}
.auth-switch a:hover {
     color: #3ec3d5;
     text-decoration: underline;
}
</style>