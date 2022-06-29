<template>
    <div class="desafio-information">
        <div class="desafio-info">{{ this.desafios }}</div>
    </div>
</template>

<script>
import { orderBy } from 'lodash-es';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Desafio',
    data(){
        return{
            perguntaDesafio: '',
            opcao1: '',
            opcao2: '',
            opcao3: '',
            opcao4: '',
            dica: '',
        };
    },
    mounted(){
        this.setDesafio();
        //this.
    },
}
</script>

<style scoped>

</style>
