export default {
     addReport(state, payload) {
          state.reports.unshift(payload);
     },
     fetchReports(state, payload) {
          state.reports = payload.reports;
     },
     deleteReport(state, payload) {
          const id = payload.reportId;
          const index = state.reports.findIndex(report => report.id === id);
          state.reports.splice(index, 1);
     }
}