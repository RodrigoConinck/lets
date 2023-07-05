<template>
  <div class="q-pa-md absolute-center" style="max-width: 400px">
    <q-input filled v-model="name" label="Nome" lazy-rules :rules="nameRules" />
    <q-input filled v-model="email" label="E-mail" hint="Insira um e-mail válido" lazy-rules type="email" />
    <q-input filled type="password" v-model="password" label="Senha" lazy-rules :rules="passwordRules" />
    <q-input filled type="password" v-model="confirmPassword" label="Confirmar Senha" lazy-rules
      :rules="confirmPasswordRules" />

    <q-checkbox v-model="acceptTerms">
      <label class="terms-link" @click="openTermsDialog">Aceito os termos de uso</label>
    </q-checkbox>

    <div>
      <p>
        Retornar à tela de
        <a href="#/login">Login</a>.
      </p>
      <q-btn label="Criar Usuário" v-on:click="createUser" type="submit" color="primary" :disable="!acceptTerms" />
      <q-btn label="Limpar" v-on:click="reset" color="primary" flat class="q-ml-sm" />
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <q-dialog v-model="dialogVisible" @hide="onDialogHidden">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="check_circle" size="100px" color="green-6" />
          <h4 class="q-mt-md">Usuário criado com sucesso!</h4>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="termsDialogVisible" @hide="onTermsDialogHidden">
      <q-card>
        <q-card-section>
          <h4 class="text-h6 text-center">Termos de Uso</h4>
          <p> Este é um trabalho de portifólio de conclusão de curso.</p>
          <p>Concordo que todos os dados aqui inseridos sejam divulgados.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" color="primary" flat @click="termsDialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      nameRules: [(value) => !!value || "O nome é obrigatório"],
      passwordRules: [(value) => !!value || "A senha é obrigatória"],
      confirmPasswordRules: [
        (value) => !!value || "Confirme a senha",
        (value) => value === this.password || "As senhas não coincidem",
      ],
      errorMessage: "",
      dialogVisible: false,
      termsDialogVisible: false,
    };
  },
  methods: {
    reset() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.errorMessage = "";
    },
    createUser() {
      if (!this.acceptTerms) {
        this.errorMessage = "Você deve aceitar os termos de uso para criar uma conta.";
        return;
      }
      if (!this.name || !this.email || !this.password) {
        this.errorMessage = "Por favor, preencha todos os campos obrigatórios.";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "As senhas não coincidem.";
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = "Insira um e-mail válido.";
        return;
      }
      const userData = {
        nome: this.name,
        email: this.email,
        senha: this.password,
      };
      axios
        .post(process.env.APP_VUE_API + "/users/create", userData)
        .then(() => {
          this.dialogVisible = true;
        })
        .catch((error) => {
          if (
            error.response.data.message ===
            "SequelizeUniqueConstraintError: Validation error"
          ) {
            this.errorMessage = "O e-mail já está sendo utilizado.";
          }
        });
    },
    onDialogHidden() {
      this.$router.push("/login");
    },
    onTermsDialogHidden() {
      this.acceptTerms = true;
    },
    openTermsDialog() {
      this.termsDialogVisible = true;
    },
  },
};
</script>


<style>
.error-message {
  color: red;
  margin-top: 10px;
}

.terms-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
