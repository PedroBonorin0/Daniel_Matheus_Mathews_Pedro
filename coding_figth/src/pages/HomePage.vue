<template>
  <div class="home">
    <h1>CODING FIGTH</h1>
    <BaseCard class="menu-options">
      <div class="button">
        <BaseButton :link="true" to="/game">Jogar</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/instruction">Instruções</BaseButton>
      </div>
    </BaseCard>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home {
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home h1 {
  margin-bottom: 4rem;
}

.menu-options {
  margin: 0 auto;
  text-align: center;
}

.button {
  margin: 2rem;
}
</style>
