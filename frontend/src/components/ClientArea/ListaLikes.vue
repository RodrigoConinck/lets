<template>
  <div class="q-pa-md">
    <q-carousel swipeable animated v-model="slide" thumbnails infinite>
      <q-carousel-slide v-for="(person, index) in allPersons" :name="index" :key="index">
        <div class="custom-carousel-slide">
          <q-card class="my-card">
            <q-img :src="person.imgSrc" :default-src="defaultAvatar" alt="Avatar">
              <div class="absolute-bottom">
                <div class="text-h6">{{ person.nome }}</div>
                <div class="text-h7">{{ person.cidade }} , {{ person.bairro }}</div>
                <div class="text-h7">Atividades preferenciais:</div>
                <div class="text-h7">{{ person.atividades_preferenciais }}</div>
                <div class="text-h7">Idade: {{ person.idade }}</div>
              </div>
            </q-img>
            <q-card-actions>
              <q-btn flat @click="nextSlide">Não Likei</q-btn>
              <q-btn flat @click="createLike(person)">Like</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from 'axios'


export default {
  setup() {
    return {
      slide: ref(1)
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
    console.log('oi');
    this.getAllUsers()
  },
  methods: {
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
          console.log(JSON.stringify(response.data));
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
          console.log(JSON.stringify(response.data));
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
  align-items: center;
}

.custom-carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>