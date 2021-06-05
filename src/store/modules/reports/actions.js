import db from '../../../firebase.js';

export default {
     async addReport(context, payload) {
          const income = {
               date: payload.date,
               type: payload.type,
               amount: payload.amount,
               description: payload.description,
          };

          const userId = payload.userId;

          const response = await fetch(`https://money-manager-c52a1.firebaseio.com/${userId}.json`, {
               method: 'POST',
               body: JSON.stringify(income)
          });

          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.error.message);
               throw error;
          }

          context.commit('addReport', {
               id: responseData.name,
               date: payload.date,
               type: payload.type,
               amount: payload.amount,
               description: payload.description
          });
     },
     async fetchReports(context, payload) {
          const userId = payload.userId;

          const response = await fetch(`https://money-manager-c52a1.firebaseio.com/${userId}.json`);
          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.message);
               throw error;
          }

          const reports = [];

          for(const key in responseData) {
               const report = {
                    id: key,
                    date: responseData[key].date,
                    type: responseData[key].type,
                    amount: responseData[key].amount,
                    description: responseData[key].description
               }
               reports.unshift(report);
          }

          context.commit('fetchReports', {
               reports: reports
          });
     },
     deleteReport(context, payload) {
          const userId = context.rootGetters.getUserId;
          db.ref(userId).child(payload.reportId).remove();
          context.commit('deleteReport', payload);
     }
};