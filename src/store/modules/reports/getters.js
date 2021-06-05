export default {
     getReports(state) {
          return state.reports;
     },
     getIncomes(state) {
          return state.reports.filter(report => report.type === 'income');
     },
     getExpenses(state) {
          return state.reports.filter(report => report.type === 'expense');
     },
     getTotalIncome(state) {
          const incomes = state.reports.filter(report => report.type === 'income');
          let total = 0;
          for(let i = 0; i < incomes.length; i++) {
               total += incomes[i].amount;
          }
          return total;
     },
     getTotalExpense(state) {
          const expenses = state.reports.filter(report => report.type === 'expense');
          let total = 0;
          for(let i = 0; i < expenses.length; i++) {
               total += expenses[i].amount;
          }
          return total;
     }
};