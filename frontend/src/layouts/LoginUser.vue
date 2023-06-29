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

      <div>
        <p>Ainda não tem um login? <a href="#/register">Cadastre-se já!</a></p>
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
      console.log(process.env.APP_VUE_API_URL + '/users/login')
      const userData = {
        email: this.email,
        senha: this.password
      };

      axios
        .post((process.env.APP_VUE_API + '/users/login'), userData)
        .then((response) => {
          console.log(process.env.APP_VUE_API, userData)
          if(response.data){
            localStorage.setItem('TOKEN', response.data);
            this.$emit("contentDataUser", response.data)
            this.$router.push('/UserArea')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>
