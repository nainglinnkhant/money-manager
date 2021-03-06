export default {
     async auth(context, payload) {
          let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
          AIzaSyBONBW-IZM0yQB948THk8rMZ-9CVnE620Q`;

          if(payload.authMode === 'Login') {
               url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
               AIzaSyBONBW-IZM0yQB948THk8rMZ-9CVnE620Q`;
          }

          const response = await fetch(url, {
               method: 'POST',
               body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
               })
          });

          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.error.message);
               throw error;
          }

          localStorage.setItem('userId', responseData.localId);

          context.commit('auth', {
               userId: responseData.localId
          });
     },
     logout(context) {
          localStorage.removeItem('userId');
          context.commit('logout');
     },
     tryLogin(context) {
          const userId = localStorage.getItem('userId');

          if(userId) {
               context.commit('auth', {
                    userId: userId
               });
          }
     }
};