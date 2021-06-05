export default {
     auth(state, payload) {
          state.userId = payload.userId;
     },
     logout(state) {
          state.userId = '';
     }
};