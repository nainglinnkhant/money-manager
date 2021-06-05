export default {
     getUserId(state) {
          return state.userId;
     },
     isAuthenticated(state) {
          return !!state.userId;
     }
};