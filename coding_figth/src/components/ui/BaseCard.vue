<template>
  <div class="card" :class="noUnderWidth? 'noUnderWidth' : ''">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    noUnderWidth: { type: Boolean, required: false, default: false },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 60vw;
}

.noUnderWidth {
  margin: 0 auto;
}
</style>
