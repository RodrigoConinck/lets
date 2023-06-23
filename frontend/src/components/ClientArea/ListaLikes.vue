<template>
  <div class="q-pa-md">
    <q-carousel swipeable animated v-model="slide" thumbnails infinite>
      <q-carousel-slide v-for="(person, index) in allPersons" :name="index" :key="index">
        <div class="custom-carousel-slide">
          <q-card class="my-card">
            
            <q-img :src="person.imgSrc">
              <div class="absolute-bottom">
                <div class="text-h6">{{ person.nome }}</div>
              </div>
            </q-img>
            <q-card-actions>
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
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
  data(){
    return{
      allPersons:[]
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
        url: 'http://localhost:3000/users/retrieve',
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