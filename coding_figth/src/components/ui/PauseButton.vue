<template>
  <div>
    <img src="@/assets/img/play.png" v-if="gameOn">
    <img src="@/assets/img/pause.png" v-else>
  </div>
</template>

<script>
export default {
  props: {
    gameOn: { type: Boolean, required: true },
  }
}
</script>

<style scoped>
div {
  background: #248b8b;
  width: 50px;
  height: 50px;
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5.5rem;
  right: 6.5rem;
}

img {
  display: block;
  width: 40px;
}
</style>
