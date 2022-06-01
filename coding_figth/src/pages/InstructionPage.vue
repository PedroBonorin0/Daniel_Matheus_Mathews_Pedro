<template>
  <div class="instruction">
    <BaseCard class="container-info">
      <div class="texto-instrucoes">
        <h2>Bem vindo ao Coding Figth!</h2>
        <p>O jogo é bem simples, ao iniciar um jogo, um desafio irá aparecer na tela
          e você tem que acertar a respota.<br>
          Caso a resposta seja correta, o inimigo perde vida, caso contrário, você é quem
          perde vida.
        </p>
      </div>
      <BaseButton link="true" to="/">Voltar</BaseButton>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: 'InstructionPage',
  components: {
  },
};
</script>

<style>
.instruction {
  margin-top: 6rem;
}

.container-info {
  text-align: center;
}

.texto-instrucoes p{
  text-align: left;
  margin: 0.5rem 0;
  padding: 1rem 3rem;
}
</style>
