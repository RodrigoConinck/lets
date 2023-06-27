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

          <q-btn flat round dense icon="whatshot" @click="logout" />
        </q-toolbar>

        <q-tabs v-model="tab" class="justify-center">
          <q-tab name="perfil" label="Perfil" icon="person" />
          <q-tab name="likes" label="LETS" icon="thumb_up" />
          <q-tab name="matchs" label="Matchs" icon="favorite" />
        </q-tabs>
      </q-header>

      <q-page-container>
        <q-scroll-area style="height: 80vh; width: 100%;">
          <q-page class="q-pa-md" v-if="tab === 'perfil'">
            <EditPerfil />
          </q-page>
          <q-page class="q-pa-md" v-if="tab === 'likes'">
            <ListaLikes />
          </q-page>
          <q-page class="q-pa-md" v-if="tab === 'matchs'">
            <ListaMatchs/>
          </q-page>
        </q-scroll-area>
      </q-page-container>
    </q-layout>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import EditPerfil from '../components/ClientArea/EditPerfil.vue'
import ListaLikes from '../components/ClientArea/ListaLikes.vue'
import ListaMatchs from '../components/ClientArea/ListaMatchs.vue'
export default {
  data() {
    return {
      timeoutId: null
    };
  },
  methods: {
    resetLogoutTimer() {
      this.clearLogoutTimer();
      this.timeoutId = setTimeout(this.logout, 300000);
    },
    clearLogoutTimer() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    },
    logout() {
      localStorage.removeItem('TOKEN');

      this.$router.push('/login');
    },
  },
  mounted() {
    this.resetLogoutTimer();
    window.addEventListener('mousemove', this.resetLogoutTimer);
    window.addEventListener('keydown', this.resetLogoutTimer);
    window.addEventListener('scroll', this.resetLogoutTimer);
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      this.$router.push('/login');
      return;
    }
  },
  beforeUnmount() {
    this.clearLogoutTimer();
    window.removeEventListener('mousemove', this.resetLogoutTimer);
    window.removeEventListener('keydown', this.resetLogoutTimer);
    window.removeEventListener('scroll', this.resetLogoutTimer);
  },
  setup() {
    return {
      tab: ref('likes')
    };
  },
  components: {
    EditPerfil,
    ListaLikes,
    ListaMatchs
  },
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
  