<template>
  <div class="q-pa-md absolute-center" style="max-width: 400px">
      <q-input
        filled
        v-model="email"
        label="E-mail"
        hint="Insira um e-mail válido"
        lazy-rules
        type="email"
      />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Senha"
        lazy-rules
      />

      <q-toggle v-model="acceptRememberUser" label="Lembrar Usuário" />

      <div>
        <q-btn label="Login" v-on:click="login()" type="submit" color="primary"/>
        <q-btn label="Limpar" v-on:click="reset()" color="primary" flat class="q-ml-sm" />
      </div>

  </div>
</template>

<script>
// import { resetTracking } from '@vue/reactivity'
// import { useQuasar } from 'quasar'
// import { ref } from 'vue'
// import { logicalExpression } from '@babel/types';
import axios from "axios"
import { Vue, router } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: '',
      acceptRememberUser: false,
    }
  },
  methods:{
    reset(){
      this.email ='',
      this.password=''
    },
    login() {

      const userData = {
        email: this.email,
        password: this.password
      };

      axios
        .post('http://localhost:3000/login', userData)
        .then((response) => {
          console.log(response.data.token);
          if(response.data.token){
            localStorage.setItem('TOKEN', response.data.token);
            this.$emit("contentDataUser", response.data.token)
            this.$router.push('/MainPageUser')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>
