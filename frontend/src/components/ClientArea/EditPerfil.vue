<template>
  <div class="user-profile">
    <div class="user-profile__header">
      <h2>Perfil do Usuário</h2>
    </div>
    <div class="user-profile__avatar">
      <input type="file" accept="image/*" @change="handleFileChange" ref="fileInput" style="display: none">
      <q-avatar v-if="foto_perfil" size="150px" :src="foto_perfil" @click="openFileInput"></q-avatar>
      <q-avatar v-else size="150px" text-color="white" color="primary" icon="person" @click="openFileInput"></q-avatar>
    </div>
    <div class="user-profile__form">
        <q-input outlined class="q-mb-sm" v-model="nome" label="Nome"></q-input>
        <q-date v-model="data_nascimento" label="Data de Nascimento"></q-date>
        <q-select v-model="sexo" label="Sexo" :options="['Masculino', 'Feminino']"></q-select>
        <q-input outlined class="q-mb-sm" v-model="altura" label="Altura"></q-input>
        <q-input outlined class="q-mb-sm" v-model="peso" label="Peso"></q-input>
        <q-input outlined class="q-mb-sm" v-model="estado" label="Estado"></q-input>
        <q-input outlined class="q-mb-sm" v-model="cidade" label="Cidade"></q-input>
        <q-input outlined class="q-mb-sm" v-model="bairro" label="Bairro"></q-input>
        <div>
          <p>Lista de Atividades Preferenciais</p>
          <ul>
            <li v-for="(atividade, index) in atividades" :key="index">
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
        <q-input outlined class="q-mb-sm" v-model="foto_perfil" label="Foto de Perfil"></q-input>
        <q-input outlined class="q-mb-sm" v-model="whatsapp" label="WhatsApp" :before="+55 " mask="99 99999-9999"></q-input>
        <q-btn color="primary" label="Salvar" @click="editProfile()"></q-btn>
    </div>
  </div>
</template>

<script>
import { QDate } from 'quasar';
import { QSelect } from 'quasar';
import { QToggle } from 'quasar';
import { QInput } from 'quasar';

import axios from 'axios'
export default {
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
      atividades_preferenciais:[],
      frequencia: null,
      ativo_fisicamente: null,
      foto_perfil: null,
      createdAt: null,
      updatedAt: null,
      whatsapp: null,
      novaAtividade: '',
      atividades: []
    };
  },
  mounted() {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/users/getUser?id=33',
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5vbWUiOiJNYXJpYSBPbGl2ZWlyYSIsImRhdGFfbmFzY2ltZW50byI6IjE5ODUtMDUtMTAiLCJzZXhvIjoiRiIsImFsdHVyYSI6MTY1LCJwZXNvIjo2MCwiZXN0YWRvIjoiUmlvIGRlIEphbmVpcm8iLCJjaWRhZGUiOiJSaW8gZGUgSmFuZWlybyIsImJhaXJybyI6IkNvcGFjYWJhbmEiLCJhdGl2aWRhZGVzX3ByZWZlcmVuY2lhaXMiOlsiWW9nYSIsIlBpbGF0ZXMiLCJDb3JyaWRhIl0sImZyZXF1ZW5jaWEiOiI1IHZlemVzIHBvciBzZW1hbmEiLCJhdGl2b19maXNpY2FtZW50ZSI6dHJ1ZSwiZm90b19wZXJmaWwiOm51bGwsImVtYWlsIjoibWFyaXRhLm9saXZlaXJhQGV4YW1wbGUuY29tIiwic2VuaGEiOiIkMmIkMTAkTU9vZjFtaS5JUGtkcjNHNXMxQTVvZWRhT1dNdjF0LmNFaFBxTzZHbmd0MGh0SFRZU2xKUzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTE4VDEyOjA5OjQ2Ljg0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTE4VDEyOjA5OjQ2Ljg0OVoiLCJpYXQiOjE2ODcwOTE5MTF9.drLDH1bRea57FdrFRRblqYt8INGwA9cgQPn0E7ulpVQ'
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
        this.atividades_preferenciais = data.atividades_preferenciais;
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
        this.atividades.push(this.novaAtividade);
        this.novaAtividade = '';
      }
    },
    removerAtividade(index) {
      this.atividades.splice(index, 1);
    },
    editProfile() {
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
        foto_perfil: this.foto_perfil,
        whatsapp: this.whatsapp
      };

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/users/update?id=10',
        headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5vbWUiOiJNYXJpYSBPbGl2ZWlyYSIsImRhdGFfbmFzY2ltZW50byI6IjE5ODUtMDUtMTAiLCJzZXhvIjoiRiIsImFsdHVyYSI6MTY1LCJwZXNvIjo2MCwiZXN0YWRvIjoiUmlvIGRlIEphbmVpcm8iLCJjaWRhZGUiOiJSaW8gZGUgSmFuZWlybyIsImJhaXJybyI6IkNvcGFjYWJhbmEiLCJhdGl2aWRhZGVzX3ByZWZlcmVuY2lhaXMiOlsiWW9nYSIsIlBpbGF0ZXMiLCJDb3JyaWRhIl0sImZyZXF1ZW5jaWEiOiI1IHZlemVzIHBvciBzZW1hbmEiLCJhdGl2b19maXNpY2FtZW50ZSI6dHJ1ZSwiZm90b19wZXJmaWwiOm51bGwsImVtYWlsIjoibWFyaWEub2xpdmVpcmFAZXhhbXBsZS5jb20iLCJzZW5oYSI6IiQyYiQxMCRsNWFjMkg3YTQ1T01JYjZGVEhraVFPUGN3QVg5bW5LL1RHR2tuSjBmUlplVTd3MUdXSDBLQyIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMThUMTE6NDE6NTUuNDQ5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMThUMTE6NDE6NTUuNDQ5WiIsIndoYXRzYXBwIjpudWxsLCJpYXQiOjE2ODcxMDUzMDh9.MbxXWuJiQrNyMBD5F8EzeZB-VNPIMMQkOzv54dmcyUM',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(payload)
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
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
      // Lógica para lidar com o arquivo selecionado (fazer o upload, exibir pré-visualização, etc.)
      console.log('Arquivo selecionado:', file);
    }
  }
};
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
