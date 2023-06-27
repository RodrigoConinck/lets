<template>
  <div class="q-pa-md">
    <q-carousel v-if="slide < allPersons.length" swipeable animated v-model="slide" thumbnails infinite>
      <q-carousel-slide v-for="(person, index) in allPersons" :name="index" :key="index">
        <div class="custom-carousel-slide">
          <q-card class="my-card">
            <img style="max-width: 200px; max-height: 200px" alt="foto_perfil" v-if="person.foto_perfil" size="150px"
              :src="person.foto_perfil" />
            <q-avatar v-else size="150px" text-color="white" color="primary" icon="person"></q-avatar>
            <div class="absolute-bottom">
              <div class="text-h6">{{ person.nome }}</div>
              <div class="text-h7">{{ person.cidade }}, {{ person.bairro }}</div>
              <div class="text-h7">Atividades preferenciais:</div>
              <div class="text-h7">{{ person.atividades_preferenciais }}</div>
              <div class="text-h7">Idade: {{ person.idade }}</div>
            </div>
            <div class="my-card-actions">
              <q-btn flat class="no-like-btn" @click="nextSlide">Não</q-btn>
              <a>|</a>
              <q-btn flat class="like-btn" @click="createLike(person)">Lets!</q-btn>
            </div>
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div v-if="slide === allPersons.length">
      <div class="text-h6">Não há pessoas próximas a você, verifique sua localização na edição de perfil ou aguarde.</div>
      <q-btn flat @click="reloadPage">Recarregar</q-btn>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from 'axios'


export default {
  setup() {
    return {
      slide: ref(0)
    }
  },
  data() {
    return {
      allPersons: [],
      defaultAvatar: 'caminho/para/o/seu/icone-de-avatar-padrao.png',
      person: {
        imgSrc: 'caminho/para/a/imagem-da-pessoa.png'
      }
    }

  },

  mounted() {
    this.getAllUsers()
  },
  methods: {
    reloadPage() {
      location.reload();
    },
    getAllUsers() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/users/getNearPersons',
        headers: {
          'token': localStorage.getItem('TOKEN'),
        }
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify("Exibindo pessoas próximas"));
          this.allPersons = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createLike(person) {
      let data = JSON.stringify({
        "curtidor": '',
        "curtido": person.id
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/likes/create',
        headers: {
          'token': localStorage.getItem('TOKEN'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify("Curtida enviada"));
        })
        .catch((error) => {
          console.log(error);
        });


      console.log('Like criado para:', person)
      this.slide++
    },
    nextSlide() {
      this.slide++
    }
  }
}
</script>
<style>
.custom-carousel-slide {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100%;
}

.custom-carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>