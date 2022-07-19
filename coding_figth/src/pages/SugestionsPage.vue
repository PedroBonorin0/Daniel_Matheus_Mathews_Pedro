<template>
  <div class="sugest-container">
    <BaseCard class="sugestion-options">
      <div>
          <label for="tipo">
            Tipo: <br>
            <select id="tipo" v-model="tipo">
              <option value="sugestao">Sugestão</option>
              <option value="reclamacao">Reclamação</option>
            </select>
          </label>
      </div>
      <div class="campo">
        <label for="campoo">
            Insira sua sugestão ou reclamação <br>
            <textarea id="sugestText" rows="4" cols="50" v-model="sugestao">
            </textarea>
        </label>
      </div>
      <div class="submit-sugestion">
        <BaseButton type="submit" @click="criarSugestao">Enviar</BaseButton>
      </div>
      <div class="agradecimento" :style="{ visibility: visible ? 'visible' : 'hidden'}">
        {{mensagem}}
      </div>
    </BaseCard>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sugestions',
  data() {
    return {
      loading: false,
      sugestao: '',
      tipo: '',
      visible: false,
      mensagem: '',

      tipos: ['Reclamação', 'Sugestão'],
    };
  },
  methods: {
    criarSugestao() {
      if (this.sugestao.length > 0 && this.tipo.length > 0) {
        this.loading = true;
        this.visible = true;
        this.mensagem = `Agradecemos sua ${this.tipo}!`;
        this.sugestao = '';
        this.tipo = '';
      } else {
        this.visible = true;
        this.mensagem = 'Preencha todos os campos!';
      }
    },
  },
  computed: {
    ...mapGetters(['userLogado']),
  },
};
</script>

<style>
.sugest-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

}

.campo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.submit-sugestion {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.tipo {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 7em;
  justify-content: center;
  margin-top: 10px;
}

.agradecimento {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

</style>
