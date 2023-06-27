<template>
    <div class="q-pa-md absolute-center" style="max-width: 400px">
      <q-input
        filled
        v-model="name"
        label="Nome"
        lazy-rules
        :rules="nameRules"
      />
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
        :rules="passwordRules"
      />
      <q-input
        filled
        type="password"
        v-model="confirmPassword"
        label="Confirmar Senha"
        lazy-rules
        :rules="confirmPasswordRules"
      />
  
      <div>
        <p>Retornar a tela de <a :href="process.env.APP_VUE_API_URL + '/login'">login</a>.</p>
        <q-btn label="Criar Usuário" v-on:click="createUser" type="submit" color="primary" />
        <q-btn label="Limpar" v-on:click="reset" color="primary" flat class="q-ml-sm" />
      </div>
  
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nameRules: [
          (value) => !!value || 'O nome é obrigatório'
        ],
        passwordRules: [
          (value) => !!value || 'A senha é obrigatória'
        ],
        confirmPasswordRules: [
          (value) => !!value || 'Confirme a senha',
          (value) => value === this.password || 'As senhas não coincidem'
        ],
        errorMessage: ''
      };
    },
    methods: {
      reset() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.errorMessage = '';
      },
      createUser() {
        const userData = {
          nome: this.name,
          email: this.email,
          senha: this.password
        };
  
        // Fazer a requisição para criar o usuário
        axios
          .post(process.env.APP_VUE_API_URL + '/users/create', userData)
          .then((response) => {
            console.log(response.data);  
            this.$router.push('/login')
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.message === "SequelizeUniqueConstraintError: Validation error") {
              this.errorMessage = "O e-mail já está sendo utilizado.";
            }
            console.log('=================================')
          });
      }
    }
  };
  </script>
  
  <style>
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  