<template>
  <button v-if="!link">
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: { type: Boolean, required: false, default: false },
    to: { type: String, required: false, default: '/' },
  },
};
</script>

<style scoped>
a, button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #248b8b;
  border: 1px solid #248b8b;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
  min-width: 160px;
  max-width: 200px;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #227575;
  border-color: #227575;
}

.flat {
  background-color: transparent;
  color: #248b8b;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #227575;
  color: #227575;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #84d6d6;
}
</style>
