<template>
  <div>
    <img src="@/assets/img/soundOn.png" v-if="soundOn">
    <img src="@/assets/img/soundOff.png" v-else>
  </div>
</template>

<script>
export default {
  props: {
    soundOn: { type: Boolean, required: true },
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
  position: fixed;
  top: 4.5rem;
  right: 3rem;
}

img {
  display: block;
  width: 40px;
}
</style>
