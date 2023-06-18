<template>
    <div class="q-pa-md d-flex justify-center">
      <q-layout class="shadow-2 fullscreen rounded-borders">
        <q-header elevated class="q-pa-sm" style="align-items: center">
          <q-toolbar class="justify-center">
            <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
  
            <q-toolbar-title>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="Logo">
              </q-avatar>
              LETS
            </q-toolbar-title>
  
            <q-btn flat round dense icon="whatshot" />
          </q-toolbar>
  
          <q-tabs v-model="tab" class="justify-center">
            <q-tab name="perfil" label="Perfil" icon="person" />
            <q-tab name="likes" label="Likes" icon="thumb_up" />
            <q-tab name="matchs" label="Matchs" icon="favorite" />
          </q-tabs>
        </q-header>

        <q-page-container>
            <q-scroll-area style="height: 80vh; width: 100%;">
            <q-page class="q-pa-md" v-if="tab === 'perfil'">
              <EditPerfil/>
            </q-page>
            <q-page class="q-pa-md" v-if="tab === 'likes'">
                <p v-for="n in 15" :key="n">
                  JRKLSAJFKSALJEKLAKÇLFLÇSALÇDKALÇFKJÇSAKLÇDKSALÇJLÇSALÇDKLÇASKJFLÇAJSLÇDKJLÇSAF
                </p>
              </q-page>
              <q-page class="q-pa-md" v-if="tab === 'matchs'">
                <p v-for="n in 15" :key="n">
                  VASCO SEGUNDA DIVISAO
                </p>
              </q-page>
            </q-scroll-area>
          </q-page-container>
      </q-layout>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import EditPerfil from '../components/ClientArea/EditPerfil.vue'
  export default {
    setup() {
      return {
        tab: ref('likes')
      };
    },
     components: {
        EditPerfil
     }
  };
  </script>
  
  <style>
  .d-flex {
    display: flex;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .align-center {
    align-items: center;
  }
  
  .q-tabs-container {
    justify-content: center;
  }
  </style>
  