<template>
    <div class="q-pa-md">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        
        infinite
      >
        <q-carousel-slide :name="1" img-src="https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_corrida38.jpg?quality=70&strip=info&w=960" />
        <q-carousel-slide :name="2" img-src="https://agenciabrasil.ebc.com.br/sites/default/files/atoms/image/futebol_2.jpg" />
        <q-carousel-slide :name="3" img-src="https://i0.wp.com/hospitalsantamonica.com.br/wp-content/uploads/2019/02/beneficios-de-andar-de-bicicleta.jpg?resize=1536%2C1024&ssl=1" />
        <q-carousel-slide :name="4" img-src="https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/esportes/WhatsApp%20Image%202020-01-20%20at%2014_41_23%20(2).jpeg" />
      </q-carousel>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      return {
        slide: ref(1)
      }
    }
  }
  </script>
  