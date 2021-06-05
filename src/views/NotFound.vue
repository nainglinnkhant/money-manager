<template>
     <section>
          <div>
               <h2>Page not found</h2>
               
               <p>
                    This page could not be found - maybe check out 
                    <router-link to="/auth">this</router-link>.
               </p>
          </div>
     </section>
</template>

<style scoped>
div {
     border-radius: 12px;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
     padding: 2rem;
     margin: 2rem auto;
     max-width: 40rem;
}
h2 {
     color: #35b6ed;
     padding-bottom: 20px;
     font-size: 19px;
}
p {
     font-size: 15px;
     margin-bottom: 0;
}
</style>