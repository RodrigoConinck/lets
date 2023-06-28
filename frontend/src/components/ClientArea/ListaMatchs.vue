<template>
    <div class="q-pa-md">
        <q-page>
            <q-card class="q-mb-md">
                <q-card-section>
                    <h2 class="text-h6">Matchs Existentes</h2>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section v-if="matchList.length > 0">
                    <ul>
                        <li v-for="(matchItem, index) in matchList" :key="index">
                            <img style="max-width: 150px; max-height: 150px" alt="foto_perfil" v-if="matchItem.otherUser.foto_perfil"
                                size="150px" :src="matchItem.otherUser.foto_perfil" />
                            <q-avatar v-else size="150px" text-color="white" color="primary" icon="person"></q-avatar>
                            <p></p>
                            {{ matchItem.otherUser.nome }}, {{ matchItem.idade }}
                            <p></p>
                            {{ matchItem.otherUser.cidade }}, {{ matchItem.otherUser.bairro }}
                            <p></p>
                            <a :href="getWhatsAppUrl(matchItem.otherUser.whatsapp)"
                                @click="openWhatsApp(matchItem.otherUser.whatsapp)" target="_blank"
                                rel="noopener noreferrer">
                                {{ matchItem.otherUser.whatsapp }}
                            </a>
                            <p></p>
                        </li>
                    </ul>
                </q-card-section>
                <q-card-section v-else>
                    <p>Não há matchs existentes.</p>
                </q-card-section>
            </q-card>
        </q-page>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
    data() {
        return {
            matchList: []
        }
    },
    mounted() {
        this.getMatchList()
    },
    methods: {
        getMatchList() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: process.env.APP_VUE_API + '/matchs/retrieve',
                headers: {
                    'token': localStorage.getItem('TOKEN'),
                }
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify("Exibindo lista de Matchs"));
                    this.matchList = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        openWhatsApp(whatsappNumber) {
            const url = this.getWhatsAppUrl(whatsappNumber);
            window.open(url, '_blank');
        },
        getWhatsAppUrl(whatsappNumber) {
            const formattedPhoneNumber = whatsappNumber
            return `https://wa.me/55${formattedPhoneNumber}`;
        }
    }
}
</script>
  
<style scoped>
/* Estilos personalizados */
</style>
  