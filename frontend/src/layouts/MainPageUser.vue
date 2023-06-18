<template>
  <div>
    <q-card class="absolute-center">
      <q-card-section>
        <q-input outlined v-model="infoUser.fullName" label="Nome completo" />
        <q-input outlined v-model="infoUser.dataNascimento" label="Data de nascimento" />

      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoUser: {
        fullName: '',
        dataNascimento: ''
      }
    }
  }
}
</script>
<style></style>