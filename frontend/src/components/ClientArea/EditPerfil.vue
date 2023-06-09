<template>
  <div class="user-profile">
    <div class="user-profile__avatar">
      <input type="file" accept="image/*" @change="handleFileChange" ref="fileInput" style="display: none">
      <img style="max-width: 200px; max-height: 200px" alt="foto_perfil" v-if="foto_perfil" size="150px"
        :src="foto_perfil" @click="openFileInput" />
      <q-avatar v-else size="150px" text-color="white" color="primary" icon="person" @click="openFileInput"></q-avatar>
    </div>
    <div class="user-profile__form">
      <q-input outlined class="q-mb-sm" v-model="nome" label="Nome"></q-input>
      <q-input filled v-model="data_nascimento" label="Data de nascimento" type="date" class="q-my-md" outlined
        dense></q-input>
      <q-select v-model="sexo" label="Sexo" :options="['Masculino', 'Feminino']"></q-select>
      <q-input outlined class="q-mb-sm" v-model="altura" label="Altura"></q-input>
      <q-input outlined class="q-mb-sm" v-model="peso" label="Peso"></q-input>
      <q-input outlined class="q-mb-sm" v-model="estado" label="Estado"></q-input>
      <q-input outlined class="q-mb-sm" v-model="cidade" label="Cidade"></q-input>
      <q-input outlined class="q-mb-sm" v-model="bairro" label="Bairro"></q-input>
      <div>
        <p>Lista de Atividades Preferenciais</p>
        <ul>
          <li v-for="(atividade, index) in atividades_preferenciais" :key="index">
            {{ atividade }}
            <button @click="removerAtividade(index)" class="remover-btn">&#128465;</button>
          </li>
        </ul>
        <div>
          <input type="text" v-model="novaAtividade" placeholder="Digite uma atividade">
          <button @click="adicionarAtividade">Adicionar</button>
        </div>
        <p></p>
      </div>
      <q-input outlined class="q-mb-sm" v-model="frequencia" label="Frequência"></q-input>
      <q-toggle v-model="ativo_fisicamente" label="Ativo Fisicamente"></q-toggle>
      <q-input type="number" outlined class="q-mb-sm" v-model="whatsapp" label="WhatsApp"
        placeholder="(99) 99999-9999"></q-input>
      <q-btn color="primary" label="Salvar" @click="editProfile"></q-btn>
    </div>
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="done" color="primary" size="2em" />
          <h4 class="q-mt-md">Perfil Atualizado</h4>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogDataNascimentoInvalida">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="error" color="negative" size="2em" />
          <h4 class="q-mt-md">Data de Nascimento Inválida</h4>
          <p>A data de nascimento precisa ser no passado.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="OK" @click="dialogDataNascimentoInvalida = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
  </div>
</template>

<script>
import { QSelect, QToggle, QInput, QDialog, QCard, QCardSection, QIcon } from 'quasar';

import axios from 'axios'
export default {
  components: {
    QSelect,
    QToggle,
    QInput,
    QDialog,
    QCard,
    QCardSection,
    QIcon
  },
  data() {
    return {
      id: null,
      nome: null,
      data_nascimento: null,
      sexo: null,
      altura: null,
      peso: null,
      estado: null,
      cidade: null,
      bairro: null,
      atividades_preferenciais: [],
      frequencia: null,
      ativo_fisicamente: null,
      foto_perfil: null,
      createdAt: null,
      updatedAt: null,
      whatsapp: null,
      novaAtividade: '',
      dialogVisible: false,
      dialogDataNascimentoInvalida: false
    };
  },
  mounted() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.APP_VUE_API + '/users/getUserToken',
      headers: {
        'token': localStorage.getItem('TOKEN')
      }
    };

    axios
      .request(config)
      .then((response) => {
        const data = response.data;
        this.id = data.id;
        this.nome = data.nome;
        this.data_nascimento = data.data_nascimento;
        this.sexo = data.sexo;
        this.altura = data.altura;
        this.peso = data.peso;
        this.estado = data.estado;
        this.cidade = data.cidade;
        this.bairro = data.bairro;
        this.atividades_preferenciais = data.atividades_preferenciais || [];
        this.frequencia = data.frequencia;
        this.ativo_fisicamente = data.ativo_fisicamente;
        this.foto_perfil = data.foto_perfil;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.whatsapp = data.whatsapp;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    adicionarAtividade() {
      if (this.novaAtividade.trim() !== '') {
        this.atividades_preferenciais.push(this.novaAtividade);
        this.novaAtividade = '';
      }
    },
    removerAtividade(index) {
      this.atividades_preferenciais.splice(index, 1);
    },
    editProfile() {
      const dataNascimento = new Date(this.data_nascimento);
      const dataAtual = new Date();

      if (dataNascimento >= dataAtual) {
        this.dialogDataNascimentoInvalida = true;
        return;
      }

      const payload = {
        nome: this.nome,
        data_nascimento: this.data_nascimento,
        sexo: this.sexo,
        altura: this.altura,
        peso: this.peso,
        estado: this.estado,
        cidade: this.cidade,
        bairro: this.bairro,
        atividades_preferenciais: this.atividades_preferenciais,
        frequencia: this.frequencia,
        ativo_fisicamente: this.ativo_fisicamente,
        whatsapp: this.whatsapp,
        foto_perfil: this.foto_perfil
      };

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: process.env.APP_VUE_API + '/users/update?id=' + this.id,
        headers: {
          'token': localStorage.getItem('TOKEN'),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(payload)
      };

      axios.request(config)
        .then(() => {
          this.dialogVisible = true;
        })
        .catch((error) => {
          console.log(error);
        });

    },
    openFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.uploadImage(file);
    },
    uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.APP_VUE_API + '/users/upload',
        headers: {
          'token': localStorage.getItem('TOKEN'),
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      };

      axios.request(config)
        .then(() => {
          console.log(JSON.stringify("Foto Atualizada"));
        })
        .catch((error) => {
          console.log(error);
        });
    }

  },
}
</script>

<style scoped>
.user-profile__avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.user-profile__header {
  text-align: center;
  margin-bottom: 20px;
}

.user-profile__form {
  width: 100%;
  max-width: 400px;
}

.q-form {
  margin-bottom: 20px;
}

.q-btn {
  margin-top: 20px;
  width: 100%;
}

.remover-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: red;
  margin-left: 8px;
  font-size: 20px;
}
</style>
