import { createStore } from 'vuex';
import reportsModule from './modules/reports/index.js';
import authModule from './modules/auth/index.js';

export default createStore({
     modules: {
          reports: reportsModule,
          auth: authModule
     }
});

