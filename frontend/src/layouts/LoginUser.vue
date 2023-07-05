<template>
  <div class="q-pa-md absolute-center" style="max-width: 400px">
    <q-input filled v-model="email" label="E-mail" hint="Insira um e-mail válido" lazy-rules type="email" />
    <q-input filled type="password" v-model="password" label="Senha" lazy-rules />

    <div>
      <p>Ainda não tem um login? <a href="#/register">Cadastre-se já!</a></p>
      <q-btn label="Login" v-on:click="login()" type="submit" color="primary" />
      <q-btn label="Limpar" v-on:click="reset()" color="primary" flat class="q-ml-sm" />
    </div>
    <q-dialog v-model="errorDialogVisible" persistent>
      <q-card>
        <q-card-section>
          <q-card class="text-h6">Erro de Login</q-card>
          <q-card>
            <p>{{ errorMessage }}</p>
          </q-card>
          <q-card-actions align="right">
            <q-btn label="Fechar" color="primary" flat v-close-popup />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      email: '',
      password: '',
      acceptRememberUser: false,
      errorDialogVisible: false,
      errorMessage: '',
    }
  },
  methods:{
    reset(){
      this.email =''
      this.password=''
    },
    login() {
      const userData = {
        email: this.email,
        senha: this.password
      };

      axios
        .post(process.env.APP_VUE_API + '/users/login', userData)
        .then((response) => {
          if(response.data){
            localStorage.setItem('TOKEN', response.data);
            this.$emit("contentDataUser", response.data)
            this.$router.push('/UserArea')
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 400) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'Ocorreu um erro ao fazer o login.';
          }
          this.errorDialogVisible = true;
        });
    }
  }
}
</script>