<template>
  <div class="home">
    <img src="../assets/img/logo.png" alt="Coding Fight">
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

.home img {
  width: 18rem;
}

.menu-options {
  margin: 0 auto;
  text-align: center;
}

.button {
  margin: 2rem;
}
</style>
