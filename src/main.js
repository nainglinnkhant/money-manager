import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const BaseDialog = defineAsyncComponent(() => import('./components/BaseDialog.vue'));
const BaseSpinner = defineAsyncComponent(() => import('./components/BaseSpinner.vue'));

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);

app.mount('#app');

